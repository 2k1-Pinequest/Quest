import { Request, Response } from "express";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import prisma from "../../utils/prisma";
import cloudinary from "../../utils/cloudinary";
import multer from "multer";
import axios from "axios";
import PQueue from "p-queue";

// types/assignmentAnalysis.ts
export interface AssignmentAnalysis {
  totalTasks: number;
  correctTasks: number;
  score: number;
  summary: string;
  mistakes: string[];
  uncertain: string[];
  suggest: string;
  overall: string;
}

// Multer memoryStorage setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Queue (1 нэгээр нь, эсвэл concurrency:2 болгож болно)
const aiQueue = new PQueue({ concurrency: 1 });

// Cloudinary-оос URL-г Gemini Part болгох
async function urlToGenerativePart(
  url: string,
  mimeType: string
): Promise<Part> {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const base64 = Buffer.from(response.data).toString("base64");
  return { inlineData: { data: base64, mimeType } };
}

// --- Controller ---
export const analyzeAssignment = [
  upload.array("files", 4), // max 4 зураг

  async (req: Request, res: Response) => {
    try {
      const { studentId, assignmentId } = req.params;
      const assignmentIdNum = Number(assignmentId);

      if (isNaN(assignmentIdNum)) {
        return res.status(400).json({ error: "assignmentId буруу байна" });
      }

      if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
        return res.status(400).json({ error: "Зураг upload хийгдээгүй байна" });
      }

      const files = req.files as Express.Multer.File[];

      // --- Cloudinary upload ---
      const uploadedUrls: string[] = [];
      for (const file of files) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { folder: "assignments" }
        );
        uploadedUrls.push(result.secure_url);
      }
      console.log("uploadedUrls", uploadedUrls);

      // --- DB submission хадгалах ---
      const submission = await prisma.studentSubmission.create({
        data: {
          studentId: Number(studentId),
          assignmentId: Number(assignmentId),
          fileUrl: uploadedUrls.join(","),
          status: "PENDING",
        },
      });

      console.log("submission", submission);

      // Frontend рүү шууд OK буцаах
      res.json({ success: true, submission });

      // --- AI analysis queue-д хийх ---
      aiQueue.add(async () => {
        try {
          console.log("AI analyze started for submission:", submission.id);

          const genAI = new GoogleGenerativeAI(
            process.env.GEMINI_API_KEY as string
          );

          const parts = await Promise.all(
            uploadedUrls.map((url) => urlToGenerativePart(url, "image/png"))
          );

          const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: { temperature: 0, topP: 1, topK: 1 },
          });

          const prompt = `
Чи зөвхөн JSON буцаа. Markdown, текст, тайлбар битгий оруул.
Чи зөвхөн сурагчийн бодлого бүрийн үнэн зөв байдлаар дүн гаргана.
Сурагчийн бичсэн оноо, тайлбарыг тоохгүй.

**[ЗОРИЛГО]**
- totalTasks-г зураг дээрх бодит, бие даасан бодлогын тоогоор гаргана.
- mistakes-д зөвхөн үнэхээр буруу бодсон бодлогууд орно.
- uncertain-д зөвхөн будлиантай, ойлгомжгүй тэмдэгт, тоо орно.
- correctTasks, score-г зөвхөн бодлогын үнэн байдал дээр үндэслэнэ.
- overall-г ерөнхий багшийн дүгнэлт маягтай, товч, “энэ сурагч ийм л ажил хийсэн байна” гэсэн ойлголт төрүүлэх маягтай гаргана.
- suggest-г заавал **богино, нэг өгүүлбэрийн зөвлөмж** болгож гаргана.

**[TOTALTASKS]**
- totalTasks = correctTasks + mistakes.length + uncertain.length
- Нэг бодлого = нэг бие даасан асуулт, зураг хэд байсныг үл харгалзан
- Завсрын алхам, үргэлжлэл, нэмэлт тооцоолол, хариу тусдаа бодлого гэж тооцохгүй

**[SUMMARY]**
- summary-д заавал сурагч нийт хэдэн бодлого бодсон, хэдийг нь зөв бодсон, хувь (%)-г тооцоолон гаргах.
- Жишээ: "Сурагч нийт 15 бодлогоос 9-ийг зөв бодож, 60% оноо авсан байна."
- Энэ нь багшид хүүхдийн үр дүнг нэг хараад ойлгоход хялбар байх ёстой.

**[JSON БҮТЭЦ]**
{
  "totalTasks": number,
  "correctTasks": number,
  "score": number,
  "mistakes": [string],
  "uncertain": [string],
  "summary": string,
  "overall": string,
  "suggest": string
}
`;

          const result = await model.generateContent([prompt, ...parts]);
          let cleanOutput = (await result.response.text()).trim();
          cleanOutput = cleanOutput
            .replace(/^```json\s*/, "")
            .replace(/^```\s*/, "")
            .replace(/\s*```$/, "");

          let parsed: AssignmentAnalysis;
          try {
            parsed = JSON.parse(cleanOutput) as AssignmentAnalysis;
            parsed.mistakes = Array.isArray(parsed.mistakes)
              ? parsed.mistakes
              : [parsed.mistakes];
            parsed.uncertain = Array.isArray(parsed.uncertain)
              ? parsed.uncertain
              : [parsed.uncertain];
          } catch (e) {
            console.error("AI JSON parse алдаа:", cleanOutput);
            return;
          }

          // --- DB-д хадгалах (upsert) ---
          const aiStident = await prisma.studentAssignmentAi.upsert({
            where: {
              studentId_assignmentId: {
                studentId: Number(studentId),
                assignmentId: Number(assignmentId),
              },
            },
            update: {
              score: parsed.score,
              summary: parsed.summary,
              mistakes: parsed.mistakes,
              uncertain: parsed.uncertain,
              suggestions: [parsed.suggest],
              overall: parsed.overall,
            },
            create: {
              studentId: Number(studentId),
              assignmentId: Number(assignmentId),
              score: parsed.score,
              summary: parsed.summary,
              mistakes: parsed.mistakes,
              uncertain: parsed.uncertain,
              suggestions: [parsed.suggest],
              overall: parsed.overall,
            },
          });

          console.log("AI finished for submission:", aiStident.id);
        } catch (aiErr) {
          console.error("AI анализ алдаа:", aiErr);
        }
      });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({
        error: "API дуудлага хийхэд алдаа гарлаа: " + err.message,
      });
    }
  },
];

export default analyzeAssignment;

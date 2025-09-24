import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import axios from "axios";

export const analyzeAssignment = async (req: Request, res: Response) => {
  try {
    const { studentId, assignmentId } = req.params;
    const { imageUrls } = req.body as { imageUrls: string[] };

    if (!imageUrls || !imageUrls.length) {
      return res.status(400).json({ error: "No image URLs provided" });
    }

    const teacherAssignment = await prisma.assignment.findUnique({
      where: {
        id: Number(assignmentId),
      },
    });

    console.log("assigment", teacherAssignment?.description);

    // DB-д хадгалах
    const submission = await prisma.studentSubmission.create({
      data: {
        studentId: Number(studentId),
        assignmentId: Number(assignmentId),
        fileUrl: imageUrls.join(","), // Cloudinary URLs
        status: "PENDING",
      },
    });

    res.json({ success: true, submission });

    // AI анализ background
    (async () => {
      try {
        const genAI = new GoogleGenerativeAI(
          process.env.GEMINI_API_KEY as string
        );

        async function urlToGenerativePart(url: string): Promise<Part> {
          const response = await axios.get(url, {
            responseType: "arraybuffer",
          });
          const base64 = Buffer.from(response.data).toString("base64");
          return { inlineData: { data: base64, mimeType: "image/png" } };
        }

        const parts = await Promise.all(imageUrls.map(urlToGenerativePart));

        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash",
          generationConfig: { temperature: 0, topP: 1, topK: 1 },
        });

        const prompt = `
Чи зөвхөн JSON буцаа. Markdown, текст, тайлбар битгий оруул.
Чи зөвхөн сурагчийн бодлого бүрийн үнэн зөв байдлаар дүн гаргана.
Сурагчийн бичсэн оноо, тайлбарыг тоохгүй.

...
**[ASSIGNMENT PROBLEMS]**
${teacherAssignment?.description || "Багшаас бодлого өгөгдөөгүй."}

**[ЗОРИЛГО]**
- Хэрэв assignment.description байгаа бол сурагчийн зурган дээрх бодолтыг зөвхөн тэндх бодлогуудтай тулгаж шалгана.
- Хэрэв assignment.description хоосон бол сурагчийн зурган дээрх бодлогоор нь нийт бодлогын тоо, үнэлгээг гаргана.
- mistakes-д зөвхөн үнэхээр буруу бодсон бодлогууд орно.Хэрвээ алдаа байхгүй бол "Алдаа байхгүй" гэж бич.
- uncertain-д зөвхөн будлиантай, ойлгомжгүй тэмдэгт, тоо орно.
- correctTasks, score-г зөвхөн бодлогын үнэн байдал дээр үндэслэнэ.
- overall-г ерөнхий багшийн дүгнэлт маягтай, товч, “энэ сурагч ийм л ажил хийсэн байна” гэсэн ойлголт төрүүлэх маягтай гаргана.
- suggest-г заавал **богино, нэг өгүүлбэрийн зөвлөмж** болгож гаргана.

**[TOTALTASKS]**
- Хэрэв assignment.description байгаа бол totalTasks = description дээрх бодлогын тоо.
- Хэрэв assignment.description байхгүй бол totalTasks = зураг дээрх бие даасан бодлогын тоо.
- Нэг бодлого = нэг бие даасан асуулт, зураг хэд байсныг үл харгалзан.
- Завсрын алхам, үргэлжлэл, нэмэлт тооцоолол, хариу тусдаа бодлого гэж тооцохгүй.

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

**ЖИШЭЭ overall тайлбар:**
- "Ерөнхийд нь: энэ хүүхэд бодлого хийх чадвартай, зарим алдаа гаргасан байна."
- "Ерөнхийд нь: хүүхэд бодлого ихэнхийг зөв хийсэн."
- "Ерөнхийд нь: зарим бодлого будлиантай, дахин шалгах хэрэгтэй."
Хэрвээ сурагч багшийн өгсөн ${
          teacherAssignment?.description
        } энэ даалгавараас өөр даалгавар явуулсан бол:
- "Ерөнхийд нь: сурагч даалгаврын бодлогуудыг бодоогүй, харин өөр нэг бодлогыг зөв бодсон байна."

**ЖИШЭЭ suggest тайлбар:**
- "Бутархай тоонууд дээр илүү анхаараарай."
- "Үржүүлэлт, хуваалтыг дахин давтаарай."
- "Будлиантай бодлогуудаа багштайгаа хамт нягтлаарай."
`;

        const result = await model.generateContent([prompt, ...parts]);
        let cleanOutput = (await result.response.text()).trim();
        cleanOutput = cleanOutput
          .replace(/^```json\s*/, "")
          .replace(/^```\s*/, "")
          .replace(/\s*```$/, "");

        const parsed = JSON.parse(cleanOutput);

        await prisma.studentAssignmentAi.upsert({
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
      } catch (err) {
        console.error("AI analysis error:", err);
      }
    })();
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

import { Request, Response } from "express";
import fs from "fs";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import prisma from "../../utils/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

function fileToGenerativePart(filePath: string, mimeType: string): Part {
  return {
    inlineData: {
      data: fs.readFileSync(filePath).toString("base64"),
      mimeType,
    },
  };
}

export const analyzeAssignment = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const { assignmentId } = req.body;

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ error: "Зураг upload хийгдээгүй байна" });
    }

    const files = req.files as Express.Multer.File[];

    // --- DB-d hadagalah suragchiin daalgawar (submission) ---
    const submission = await prisma.studentSubmission.create({
      data: {
        studentId: Number(studentId),
        assignmentId: Number(assignmentId),
        fileUrl: files.map((f) => f.path).join(","), // olon zurag oruulah uchiraasss
        status: "PENDING",
      },
    });

    console.log("Submission created:", submission);


    res.json({
      success: true,
      submission,
    });

    // --- AI nalyze async-r ajiluulan ---
    (async () => {
      try {
        const parts = files.map((f) =>
          fileToGenerativePart(f.path, f.mimetype)
        );

        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash",
          generationConfig: {
            temperature: 0,
            topP: 1,
            topK: 1,
          },
        });

        const prompt = `
Чи зөвхөн JSON буцаа. Markdown, текст, тайлбар битгий оруул.
Чи зөвхөн сурагчийн бодлого бүрийн үнэн зөв байдлаар дүн гаргана.
Сурагчийн бичсэн дүн/оноо огт анхаарах хэрэггүй.

JSON бүтэц:
{
  "totalTasks": number,
  "correctTasks": number,
  "score": number,  // 100-аас бодлого бүрийн үнэн байдлаар тооцсон бүхэл тоо
  "summary": string,
  "mistakes": [string],
  "suggestions": [string],
  "overall": string
}

Зөвлөмж:
1. "score" = (correctTasks / totalTasks) * 100, бүхэл тоогоор округлэнэ.
2. "mistakes" зөвхөн үнэндээ алдаатай бодлогын дугаар, нэрийг агуулна.
3. "suggestions" нь сурагчийг хөгжүүлэх бодит зөвлөмж байх.
4. Бүх дүн математик болон бодлогын үнэн байдлаас шууд гарах.
`;

        const result = await model.generateContent([prompt, ...parts]);

        let cleanOutput = (await result.response.text()).trim();
        cleanOutput = cleanOutput
          .replace(/^```json\s*/, "")
          .replace(/^```\s*/, "")
          .replace(/\s*```$/, "");

        let parsed: any;
        try {
          parsed = JSON.parse(cleanOutput);
        } catch (e) {
          console.error("AI JSON parse алдаа:", cleanOutput);
          return;
        }

        const aiStident =  await prisma.studentAssignmentAi.upsert({
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
            suggestions: parsed.suggestions,
            overall: parsed.overall,
          },
          create: {
            studentId: Number(studentId),
            assignmentId: Number(assignmentId),
            score: parsed.score,
            summary: parsed.summary,
            mistakes: parsed.mistakes,
            suggestions: parsed.suggestions,
            overall: parsed.overall,
          },
        });

        console.log("AI analysis saved for:", aiStident);

        // --- Temporary files устгах ---
        files.forEach((f) => {
          fs.unlink(f.path, (err) => {
            if (err) console.error("File delete error:", err);
          });
        });
      } catch (aiErr) {
        console.error("AI анализ алдаа:", aiErr);
      }
    })();
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: "API дуудлага хийхэд алдаа гарлаа: " + err.message,
    });
  }
};

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

    console.log("studentId:", studentId);
    console.log("assignmentId:", assignmentId);
    console.log("uploaded files:", req.files);

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ error: "Зураг upload хийгдээгүй байна" });
    }

    const files = req.files as Express.Multer.File[];

    // res.json({
    //   success: true,
    //   req: req.files,
    // });

    // Gemini руу илгээх Part[] болгон хувиргана
    const parts = files.map((f) => fileToGenerativePart(f.path, f.mimetype));

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // эсвэл gemini-1.5-flash / gemini-2.5-flash
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
1. "score" = (correctTasks / totalTasks) * 100, **бүхэл тоогоор округлэнэ**.
2. "mistakes" зөвхөн үнэндээ алдаатай бодлогын дугаар, нэрийг агуулна.
3. "suggestions" нь сурагчийг хөгжүүлэх бодит зөвлөмж байх.
4. Хүссэн бүх дүн **математик болон бодлогын үнэн байдлаас шууд гарах**.
`;

    // Олон зураг + prompt хамтад нь явуулна
    const result = await model.generateContent([prompt, ...parts]);

    let cleanOutput = (await result.response.text()).trim();

    // Code fence арилгах
    cleanOutput = cleanOutput
      .replace(/^```json\s*/, "")
      .replace(/^```\s*/, "")
      .replace(/\s*```$/, "");

    let parsed: any;
    try {
      parsed = JSON.parse(cleanOutput);
    } catch (e) {
      return res.status(500).json({
        error: "JSON parse алдаа. Prompt эсвэл output шалга.",
        raw: cleanOutput,
      });
    }

    console.log("parsed", parsed);

    // --- DB-д хадгалах ---
    // Оюутны submission хадгална
    const submission = await prisma.studentSubmission.create({
      data: {
        studentId: Number(studentId),
        assignmentId: Number(assignmentId),
        fileUrl: files.map((f) => f.path).join(","), // олон зураг path хадгалах
      },
    });

    // const submission = await prisma.studentSubmission.upsert({
    //   where: {
    //     studentId_assignmentId: {
    //       studentId: Number(studentId),
    //       assignmentId: Number(assignmentId),
    //     },
    //   },
    //   update: {
    //     fileUrl: files.map((f) => f.path).join(","),
    //   },
    //   create: {
    //     studentId: Number(studentId),
    //     assignmentId: Number(assignmentId),
    //     fileUrl: files.map((f) => f.path).join(","),
    //   },
    // });

    // AI анализ хадгална
    const aiStudentAssignment = await prisma.studentAssignmentAi.upsert({
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

    // --- Temporary files устгах ---
    files.forEach((f) => {
      fs.unlink(f.path, (err) => {
        if (err) console.error("File delete error:", err);
      });
    });

    res.json({
      success: true,
      analysis: aiStudentAssignment,
      submission,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: "API дуудлага хийхэд алдаа гарлаа: " + err.message,
    });
  }
};

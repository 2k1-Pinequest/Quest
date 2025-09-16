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
  const { studentId } = req.params;
  const { assignmentId } = req.body;

  console.log("studentId:", studentId);
  console.log("assignmentId:", typeof assignmentId);
  console.log("uploaded file:", req.file);

  try {
    if (!req.file) {
      return res.status(400).json({ error: "Зураг upload хийгдээгүй байна" });
    }

    console.log("assignment", req.file);
    console.log("req.assignment id:", assignmentId);

    // return res.json({
    //   success: true,
    //   studentId,
    //   assignmentId,
    //   file: req.file,
    // });

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0,
        topP: 1,
        topK: 1,
      },
    });

    const imagePath = req.file.path;
    const mimeType = req.file.mimetype;

    const prompt = `
    Чи зөвхөн JSON буцаа. Markdown болон текст оруулахгүй.

    JSON нь дараах бүтэцтэй байна:
    {
      "score": number,
      "summary": string,
      "mistakes": [string],
      "suggestions": [string],
      "overall": string
    }

    Оноо (score)-г 100-аас өг. Дутуу болон алдаатай бодлого бүрт 5-10 оноо хас.
    `;

    const imagePart = fileToGenerativePart(imagePath, mimeType);
    const result = await model.generateContent([prompt, imagePart]);

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

    fs.unlink(imagePath, (err) => {
      if (err) console.error(err);
    });

    //STUDENT SUBMISSION
    const submission = await prisma.studentSubmission.create({
      data: {
        studentId: Number(studentId),
        assignmentId: Number(assignmentId),
        // assignmentId:1,
        fileUrl: req.file ? req.file.path : null,
      },
    });

    //STUDENT ASSIGNMENT AI ANALZYE
    const aiStudentAssignment = await prisma.studentAssignmentAi.upsert({
      where: {
        studentId_assignmentId: {
          studentId: Number(studentId),
          assignmentId: Number(assignmentId),
          // assignmentId:1,
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
        // assignmentId:1,
        score: parsed.score,
        summary: parsed.summary,
        mistakes: parsed.mistakes,
        suggestions: parsed.suggestions,
        overall: parsed.overall,
      },
    });

    res.json({
      success: true,
      analysis: aiStudentAssignment,
      submission: submission,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: "API дуудлага хийхэд алдаа гарлаа: " + err.message,
    });
  }
};

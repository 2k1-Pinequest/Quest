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
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Зураг upload хийгдээгүй байна" });
    }

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

    const aiStudentAssignment = await prisma.studentAssignmentAi.create({
      data: {
        studentId: Number(studentId),
        score: parsed.score,
        summary: parsed.summary,
        mistakes: parsed.mistakes,
        suggestions: parsed.suggestions,
        overall: parsed.overall,
      },
    });

    res.json({ success: true, analysis: aiStudentAssignment });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: "API дуудлага хийхэд алдаа гарлаа: " + err.message,
    });
  }
};

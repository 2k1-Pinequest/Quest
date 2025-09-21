import { Request, Response } from "express";
import prisma from "../../utils/prisma";

export const getAllStudentsSubmissionsWithAI = async (
  req: Request,
  res: Response
) => {
  try {
    const { assignmentId } = req.params;

    const assignment = await prisma.assignment.findUnique({
      where: { id: Number(assignmentId) },
      include: {
        submissions: true,
        aiAnalyses: true,
      },
    });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Submissions + AI анализыг studentId дээр тулгаж нэгтгэж байна
    const merged = assignment.submissions.map((sub) => {
      const ai = assignment.aiAnalyses.find(
        (a) => a.studentId === sub.studentId
      );
      return {
        ...sub,
        aiAnalysis: ai || null,
      };
    });

    // Assignment-ийг буцаахдаа submissions-ийг merged болгож байна
    const result = {
      ...assignment,
      submissions: merged,
      aiAnalyses: undefined, // хэрэггүй бол авч хаяж болно
    };

    res.json(result);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

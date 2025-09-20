import { Request, Response } from "express";
import prisma from "../../utils/prisma";

export const getAllStudentsSubmissionsWithAI = async (
  req: Request,
  res: Response
) => {
  try {
    const submissions = await prisma.studentSubmission.findMany({
      include: {
        student: { select: { id: true, studentName: true, email: true } },
        assignment: { select: { id: true, title: true } },
      },
    });

    // AI analysis-г merge хийх
    const submissionsWithAI = await Promise.all(
      submissions.map(async (s) => {
        const ai = await prisma.studentAssignmentAi.findUnique({
          where: {
            studentId_assignmentId: {
              studentId: s.studentId,
              assignmentId: s.assignmentId,
            },
          },
        });
        return {
          ...s,
          fileUrl: s.fileUrl ? s.fileUrl.split(",") : [],
          aiAnalysis: ai || null,
        };
      })
    );

    res.json({ success: true, submissions: submissionsWithAI });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

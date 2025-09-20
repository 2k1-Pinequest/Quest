import { Request, Response } from "express";
import prisma from "../../utils/prisma";

export const approveByTeacher = async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params;
    const {teacherFeedback, teacherScore} = req.body

   const approvedSubmissionByTeacher =  await prisma.studentSubmission.update({
      where: { id: Number(submissionId) },
      data: {
        status: "APPROVED",
        feedback: teacherFeedback,
        score: teacherScore,
      },
    });

    res.json(approvedSubmissionByTeacher);
  } catch (err) {
    console.error("Error fetching assignments by roomId:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

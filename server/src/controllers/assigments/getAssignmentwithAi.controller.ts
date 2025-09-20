import { Request, Response } from "express";
import prisma from "../../utils/prisma";

export const getStudentsSubmissionById = async (
  req: Request,
  res: Response
) => {
  try {
    const { assignmentId, studentId } = req.params;

    const submission = await prisma.studentSubmission.findFirst({
      where: {
        assignmentId: Number(assignmentId),
        studentId: Number(studentId),
      },
      orderBy: { submittedAt: "desc" },
    });

    console.log("submisiion by id", submission);

    if (!submission) {
      return res.json({ submission: null });
    }

    res.json({ submission });
  } catch (error) {
    console.error(
      "Error fetching StudentSubmission by assignmentId and studentId:",
      error
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

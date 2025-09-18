import { Request, Response } from "express";
import prisma from "../../utils/prisma";

export const createSubmission = async (req: Request, res: Response) => {
  try {
    const { studentId, assignmentId, title, description, fileUrl,score } = req.body;

    const assignment = await prisma.studentSubmission.create({
      data: {
        assignmentId,
        studentId,
        fileUrl,
      },
    });

    res.json(assignment);
  } catch (err) {
    console.error("Assignment create error:", err);
    res.status(500).json({ error: "Failed to create assignment" });
  }
};

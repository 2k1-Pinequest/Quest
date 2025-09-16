import { Request, Response } from "express";
import prisma from "../../utils/prisma";

export const createAssignment = async (req: Request, res: Response) => {
  try {
    const { roomId, title, description, fileUrl } = req.body;

    const assignment = await prisma.assignment.create({
      data: {
        roomId,
        title,
        description,
        fileUrl,
      },
    });

    res.json(assignment);
  } catch (err) {
    console.error("Assignment create error:", err);
    res.status(500).json({ error: "Failed to create assignment" });
  }
};

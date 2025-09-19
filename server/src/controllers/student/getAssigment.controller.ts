import { Request, Response } from "express";
import prisma from "../../utils/prisma";

export const GetAssignment = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    if (!roomId) {
      return res.status(400).json({ error: "roomId шаардлагатай" });
    }

    const assignments = await prisma.assignment.findMany({
      where: { roomId: Number(roomId) },
      orderBy: { createdAt: "desc" },
    });

    res.json(assignments);
  } catch (err) {
    console.error("GetAssignment error:", err);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
};

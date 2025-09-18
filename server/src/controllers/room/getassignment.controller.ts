
import { Request, Response } from "express";
import prisma from "../../utils/prisma";



export const getAssignmentsByRoom = async (req: Request, res: Response) => {
  try {
    const roomId = Number(req.params.roomId);

    if (isNaN(roomId)) {
      return res.status(400).json({ message: "roomId must be a number" });
    }

    const assignments = await prisma.assignment.findMany({
      where: { roomId },
      orderBy: { createdAt: "desc" }, 
    });

    res.json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch assignments" });
  }
};

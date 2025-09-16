import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRooms = async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params;

    if (!teacherId) {
      return res.status(400).json({ message: "Teacher ID is required" });
    }

    const classrooms = await prisma.room.findMany({
      where: { teacherId: Number(teacherId) },
      orderBy: { id: "asc" },
    });

    res.status(200).json(classrooms);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

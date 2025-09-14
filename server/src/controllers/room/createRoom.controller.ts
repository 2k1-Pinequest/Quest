import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateRoomCode = (): string => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { roomName } = req.body;
    const { teacherId } = req.params;

    if (!roomName) {
      return res.status(400).json({ message: "roomName is required" });
    }

    const teacher = await prisma.teacher.findUnique({
      where: { id: Number(teacherId) },
    });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    let code = generateRoomCode();
    let existingRoom = await prisma.room.findUnique({ where: { code } });

    while (existingRoom) {
      code = generateRoomCode();
      existingRoom = await prisma.room.findUnique({ where: { code } });
    }

    const room = await prisma.room.create({
      data: {
        roomName,
        code,
        teacherId: Number(teacherId),
      },
    });

    res.status(201).json({ message: "Room created successfully", room });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

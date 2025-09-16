import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    const room = await prisma.room.findUnique({
      where: { id: Number(roomId) },
    });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    await prisma.room.delete({
      where: { id: Number(roomId) },
    });

    res.json({ message: "Room deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
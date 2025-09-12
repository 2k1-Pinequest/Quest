import { Request, Response } from "express";
import prisma from "../utils/prisma";

// 5 оронтой код үүсгэх функц
async function generateUniqueRoomCode(): Promise<string> {
  let code = "";
  let isUnique = false;

  while (!isUnique) {
    code = Math.floor(10000 + Math.random() * 90000).toString();

    const existingRoom = await prisma.room.findUnique({
      where: { code },
    });

    if (!existingRoom) {
      isUnique = true;
    }
  }
  return code;
}

// Өрөө үүсгэх
export const createRoom = async (req: Request, res: Response) => {
  try {
    const { roomName } = req.body;

    if (!roomName || typeof roomName !== "string" || roomName.trim() === "") {
      return res.status(400).json({ message: "Өрөөний нэрийг оруулна уу." });
    }

    const uniqueCode = await generateUniqueRoomCode();

    const newRoom = await prisma.room.create({
      data: {
        roomName: roomName.trim(),
        code: uniqueCode,
      },
      select: {
        id: true,
        code: true,
        roomName: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      success: true,
      room: newRoom,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Өрөө үүсгэхэд алдаа:", err.message);
      return res
        .status(500)
        .json({ message: "Серверийн алдаа", error: err.message });
    }
    console.error("Өрөө үүсгэхэд тодорхойгүй алдаа:", err);
    return res.status(500).json({
      message: "Серверийн тодорхойгүй алдаа",
      error: String(err),
    });
  }
};

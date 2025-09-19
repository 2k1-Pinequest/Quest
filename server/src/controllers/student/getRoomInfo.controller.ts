import { Request, Response } from "express";
import prisma from "../../utils/prisma";

export const getRoomInfo = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ error: "studentId шаардлагатай" });
    }

    const student = await prisma.student.findUnique({
      where: { id: Number(studentId) },
      include: { room: true }, // room info-г include хийж авна
    });

    if (!student) {
      return res.status(404).json({ error: "Сурагч олдсонгүй" });
    }

    res.json({
      studentName: student.studentName,
      room: student.room
        ? {
            id: student.room.id,
            code: student.room.code,
            title: student.room.roomName,
          }
        : null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Серверийн алдаа гарлаа" });
  }
};

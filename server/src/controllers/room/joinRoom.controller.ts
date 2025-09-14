import { Request, Response } from "express";
import prisma from "../../utils/prisma";

export const joinRoom = async (req: Request, res: Response) => {
  try {
    const { studentName, roomCode } = req.body;
    const { studentId } = req.params;

    if (!studentId || !studentName || !roomCode) {
      return res.status(400).json({
        message: "studentId (params), studentName болон roomCode шаардлагатай",
      });
    }

    // Room олох
    const room = await prisma.room.findUnique({
      where: { code: roomCode },
    });

    if (!room) {
      return res.status(404).json({ message: "Room олдсонгүй" });
    }

    // Сурагч байгаа эсэхийг шалгах
    const student = await prisma.student.findUnique({
      where: { id: Number(studentId) },
    });

    if (!student || student.studentName !== studentName) {
      return res
        .status(404)
        .json({ message: "Сурагчийн мэдээлэл таарахгүй байна" });
    }

    // Room-д join хийж өгнө
    const updatedStudent = await prisma.student.update({
      where: { id: student.id },
      data: { roomId: room.id },
    });

    return res.status(200).json({
      message: `Сурагч '${studentName}' '${room.roomName}' room-д амжилттай нэгдлээ`,
      student: updatedStudent,
      room,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Серверийн алдаа гарлаа" });
  }
};

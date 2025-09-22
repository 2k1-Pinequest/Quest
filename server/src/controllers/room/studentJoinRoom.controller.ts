import { Request, Response } from "express";
import prisma from "../../utils/prisma";

export const studentJoinRoom = async (req: Request, res: Response) => {
  try {
    const { studentName, roomCode } = req.body;

    if (!studentName || !roomCode) {
      return res.status(400).json({
        message: "'Сурагчийн нэр' болон 'Ангийн код' шаардлагатай",
      });
    }

    const room = await prisma.room.findUnique({
      where: { code: roomCode },
    });

    if (!room) {
      return res.status(404).json({ message: "Анги олдсонгүй" });
    }

    // Сурагчийг хайна
    let student = await prisma.student.findFirst({
      where: { studentName },
    });

    if (!student) {
      
      student = await prisma.student.create({
        data: {
          studentName,
          email: `${studentName}@eduSnap.com`, // түр зуурын утга
          password: "0000",                  // түр зуурын утга
          roomId: room.id,
        },
      });
    } else {
      student = await prisma.student.update({
        where: { id: student.id },
        data: { roomId: room.id },
      });
    }

    return res.status(200).json({
      message: `Сурагч '${studentName}' '${room.roomName}' Ангид амжилттай нэгдлээ`,
      student,
      room,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Серверийн алдаа гарлаа" });
  }
};

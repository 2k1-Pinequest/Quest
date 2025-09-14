import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import { Prisma } from "@prisma/client";

export const joinRoom = async (req: Request, res: Response) => {
  try {
    const { roomCode, studentName, email, password } = req.body;

    if (!roomCode || roomCode.trim().length !== 5) {
      return res
        .status(400)
        .json({ message: "Зөв өрөөний код оруулна уу (5 орон)" });
    }

    if (!studentName || studentName.trim() === "") {
      return res.status(400).json({ message: "Сурагчийн нэр оруулна уу." });
    }

    if (!email || email.trim() === "") {
      return res.status(400).json({ message: "Email оруулна уу." });
    }

    if (!password || password.trim() === "") {
      return res.status(400).json({ message: "Password оруулна уу." });
    }

    // Room хайх
    const room = await prisma.room.findUnique({
      where: { code: roomCode.trim() },
      include: { students: true },
    });

    if (!room) {
      return res.status(404).json({ message: "Room олдсонгүй" });
    }

    // Аль хэдийн орсон сурагч байгаа эсэх шалгах
    let student = await prisma.student.findFirst({
      where: {
        studentName: studentName.trim(),
        roomId: room.id,
      },
    });

    if (student) {
      return res.status(200).json({
        message: "Сайн байна уу, таны мэдээлэл олдлоо!",
        student,
        room,
      });
    }

    // Шинэ сурагч үүсгэх
    student = await prisma.student.create({
      data: {
        studentName: studentName.trim(),
        email: email.trim(),
        password, // TODO: hash хийх
        roomId: room.id,
      } as Prisma.StudentUncheckedCreateInput,
    });

    return res.status(201).json({
      message: "Сурагч амжилттай өрөөнд нэвтэрлээ",
      student,
      room,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("joinRoom алдаа:", err.message);
      return res
        .status(500)
        .json({ message: "Серверийн алдаа гарлаа", error: err.message });
    }
    console.error("Тодорхойгүй алдаа:", err);
    return res
      .status(500)
      .json({ message: "Тодорхойгүй алдаа гарлаа", error: String(err) });
  }
};

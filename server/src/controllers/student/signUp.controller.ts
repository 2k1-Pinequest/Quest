import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

export const createStudent = async (req: Request, res: Response) => {
  try {
    const { studentName, email, password } = req.body;

    if (!studentName || !email || !password) {
      return res.status(400).json({ message: "Бүх мэдээллийг оруулна уу" });
    }

    const hashedPassword = await bcrypt.hash(password, 6);

    const student = await prisma.student.create({
      data: {
        studentName: studentName.trim(),
        email: email.trim(),
        password: hashedPassword,
      } as Prisma.StudentUncheckedCreateInput,
    });

    return res.status(201).json({
      message: "Сурагч амжилттай бүртгэгдлээ",
      studentId: student.id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Серверийн алдаа гарлаа" });
  }
};

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../utils/prisma";

// ================== TEACHER LOGIN ==================
export const loginTeacher = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Имэйл болон нууц үг оруулах шаардлагатай" });
    }

    // Teacher байгаа эсэх
    const teacher = await prisma.teacher.findUnique({ where: { email } });
    if (!teacher) {
      return res.status(404).json({ message: "Багш олдсонгүй" });
    }

    // Password шалгах
    const isValid = await bcrypt.compare(password, teacher.password);
    if (!isValid) {
      return res.status(401).json({ message: "Нууц үг буруу байна" });
    }

    // JWT үүсгэх
    const token = jwt.sign(
      { id: teacher.id, email: teacher.email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Амжилттай нэвтэрлээ",
      token,
      teacher: { id: teacher.id, name: teacher.name, email: teacher.email },
    });
  } catch (err: any) {
    res.status(500).json({ message: "Серверийн алдаа", error: err.message });
  }
};

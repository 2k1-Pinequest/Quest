import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createTeacher = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existing = await prisma.teacher.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const teacher = await prisma.teacher.create({
      data: {
        name,
        email,
        password: hashed,
      },
    });

    // ✅ JWT token үүсгэх
    const token = jwt.sign(
      { id: teacher.id, email: teacher.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // ✅ Cookie-д хадгалах (optional)
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      // secure: process.env.NODE_ENV === "production", // HTTPS-д true
    });

    // ✅ Response-д багш info + token буцаах
    res.status(201).json({
      message: "Teacher created successfully",
      teacher,
      token,
      hasRoom: false, // dashboard руу ороход хэрэгтэй бол нэмнэ
    });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

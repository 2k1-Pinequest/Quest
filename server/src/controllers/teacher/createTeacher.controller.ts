import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import bcrypt from "bcrypt";

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

    res.status(201).json({ message: "Teacher created successfully", teacher });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

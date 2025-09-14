import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginStudent = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email болон нууц үг шаардлагатай" });
    }

    const student = await prisma.student.findUnique({ where: { email } });
    if (!student) return res.status(404).json({ message: "Student олдсонгүй" });

    const isValid = await bcrypt.compare(password, student.password);
    if (!isValid) return res.status(401).json({ message: "Нууц үг буруу" });

    const token = jwt.sign(
      { id: student.id, studentName: student.studentName },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Амжилттай нэвтэрлээ", token });
  } catch (err: any) {
    res.status(500).json({ message: "Серверийн алдаа", error: err.message });
  }
};

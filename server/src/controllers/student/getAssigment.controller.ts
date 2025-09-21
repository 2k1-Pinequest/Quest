// src/controllers/student/getAssignments.controller.ts

import { Request, Response } from "express";
import prisma from "../../utils/prisma";

export const getAssignmentsForStudent = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const studentId = req.query.studentId;

    const assignments = await prisma.assignment.findMany({
      where: { roomId: Number(roomId) },
      include: {
        // Энэ мөр нь хамгийн чухал өөрчлөлт юм.
        submissions: {
          where: { studentId: Number(studentId) },
        },
      },
    });

    // Фронтендад илүү хялбар байлгахын тулд мэдээллийг хэлбэржүүлж байна.
    const formattedAssignments = assignments.map((a) => ({
      ...a,
      studentSubmission: a.submissions[0] || null,
      submissions: undefined,
    }));

    res.json(formattedAssignments);
  } catch (err: any) {
    console.error("Error fetching student assignments:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

import { Request, Response } from "express";
import prisma from "../../utils/prisma";

export const createAssignmentForRoom = async (req: Request, res: Response) => {
  try {
    const { teacherId, roomId, title, description, textContent, dueDate } = req.body;

    const roomIdNumber = Number(roomId);
    const teacherIdNumber = Number(teacherId);
    if (isNaN(roomIdNumber) || isNaN(teacherIdNumber)) {
      return res.status(400).json({ message: "roomId эсвэл teacherId буруу байна" });
    }

    const room = await prisma.room.findUnique({
      where: { id: roomIdNumber },
      include: { Teacher: true, students: true },
    });

    if (!room) return res.status(404).json({ message: "Room олдсонгүй" });
    if (!room.teacherId || room.teacherId !== teacherIdNumber) {
      return res.status(403).json({ message: "Та энэ room-д даалгавар үүсгэх эрхгүй" });
    }

    let dueDateObj: Date | undefined = undefined;
    if (dueDate) {
      const parsedDate = new Date(dueDate);
      if (!isNaN(parsedDate.getTime())) dueDateObj = parsedDate;
    }

    const assignment = await prisma.assignment.create({
      data: {
        roomId: roomIdNumber,
        title,
        description,
        textContent,   // энд текст дамжуулж байна
        dueDate: dueDateObj,
      },
    });

    const studentSubmissions = room.students.map((student) => ({
      assignmentId: assignment.id,
      studentId: student.id,
    }));

    if (studentSubmissions.length > 0) {
      await prisma.studentSubmission.createMany({ data: studentSubmissions });
    }

    res.status(201).json({ assignment });
  } catch (error: any) {
    console.error("Даалгавар үүсгэхэд алдаа:", error);
    res.status(500).json({ message: error.message || "Даалгавар үүсгэхэд алдаа гарлаа" });
  }
};

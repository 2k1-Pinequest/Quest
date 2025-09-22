import { Request, Response } from "express";
import prisma from "../../utils/prisma";

export const getAllStudentsSubmissionsWithAI = async (
  req: Request,
  res: Response
) => {
  try {
    const { assignmentId } = req.params;

    const assignment = await prisma.assignment.findUnique({
      where: { id: Number(assignmentId) },
      include: {
        submissions: {
          include: {
            student: true,
          },
        },
        aiAnalyses: true,
         room: true, 
      },
    });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Хамгийн сүүлийн submission-г сурагч бүрээр сонгох
    const latestSubmissionsMap: Record<number, any> = {};
    assignment.submissions.forEach(sub => {
      const existing = latestSubmissionsMap[sub.studentId];
      if (!existing || new Date(sub.submittedAt) > new Date(existing.submittedAt)) {
        latestSubmissionsMap[sub.studentId] = sub;
      }
    });

    // AI анализыг холбох
    const merged = Object.values(latestSubmissionsMap).map(sub => {
      const ai = assignment.aiAnalyses.find(a => a.studentId === sub.studentId);
      return {
        ...sub,
        aiAnalysis: ai || null,
      };
    });

    // Эцсийн JSON-д assignment object-ийг submissions-аас гадна оруулах
    const result = {
      submissions: merged,
      assignment: {
        id: assignment.id,
        roomId: assignment.roomId,
        roomName: assignment.room?.roomName || null,
        title: assignment.title,
        description: assignment.description,
        textContent: assignment.textContent,
        dueDate: assignment.dueDate,
        createdAt: assignment.createdAt,
        updatedAt: assignment.updatedAt,
      },
    };

    res.json(result);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


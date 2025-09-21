import { Request, Response } from "express";
import prisma from "../../utils/prisma";

export const getAssignmentsWithStatus = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const roomIdNumber = Number(roomId);

    if (isNaN(roomIdNumber)) {
      return res.status(400).json({ message: "Invalid roomId" });
    }

    const assignments = await prisma.assignment.findMany({
      where: { roomId: roomIdNumber },
      include: {
        submissions: true, 
      },
      orderBy: { createdAt: "desc" },
    });

    const data = assignments.map((a) => {
      const totalSubmissions = a.submissions.length;
      const approvedSubmissions = a.submissions.filter(
        (s) => s.status === "APPROVED"
      ).length;

      const isChecked =
        totalSubmissions > 0 && totalSubmissions === approvedSubmissions;

      return {
        id: a.id,
        title: a.title,
        description: a.description,
        createdAt: a.createdAt,
        updatedAt:a.updatedAt,
        textContent:a.textContent,
        dueDate: a.dueDate,
        totalSubmissions,
        approvedSubmissions,
        isChecked,
        roomId:a.roomId
      };
    });

    res.json(data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


import { Request, Response } from "express";
import prisma from "../../utils/prisma";

export const getAssignmentsByRoomId = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const roomIdNumber = Number(roomId);

    if (isNaN(roomIdNumber)) {
      return res.status(400).json({ message: "Invalid roomId" });
    }

    const assignments = await prisma.assignment.findMany({
  where: { roomId: roomIdNumber },
  include: {
    _count: {
      select: { submissions: true },
    },
  },
  orderBy: {
    createdAt: "desc",
  },
});


    res.json(assignments);
  } catch (err) {
    console.error("Error fetching assignments by roomId:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

import { Request, Response } from "express";
import prisma from "../../utils/prisma";
 
export const getStudentAssignmentsByAssignmentId = async (req: Request, res: Response) => {
  try {
    const { assignmentId } = req.params;
 
    const studentAssignments = await prisma.studentAssignmentAi.findMany({
      where: {
        assignmentId: Number(assignmentId),
      },
      include: {
        student: true,   
        assignment: true
      },
    });
 
    if (!studentAssignments || studentAssignments.length === 0) {
      return res.status(404).json({ message: "No AI analysis found for this assignment" });
    }
 
    res.json(studentAssignments);
  } catch (error) {
    console.error("Error fetching StudentAssignmentAi by assignmentId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
 
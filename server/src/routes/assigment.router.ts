import { Router } from "express";
import { getAssignmentsByRoomId } from "../controllers/assigments/assignment.controller";
import { getStudentsSubmissionById } from "../controllers/assigments/getAssignmentwithAi.controller";


const router = Router();

// GET /room/:roomId/assignments
router.get("/room/:roomId/assignments", getAssignmentsByRoomId);

router.get(
  "/submissions/:assignmentId/:studentId",
  getStudentsSubmissionById
);

export default router;
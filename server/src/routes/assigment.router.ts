import { Router } from "express";
import { getAssignmentsByRoomId } from "../controllers/assigments/assignment.controller";


const router = Router();

// GET /room/:roomId/assignments
router.get("/room/:roomId/assignments", getAssignmentsByRoomId);

export default router;

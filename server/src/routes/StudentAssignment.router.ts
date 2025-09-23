// assignmentRouter.ts
import express from "express";
import { analyzeAssignment } from "../controllers/GeminiStudent/studentSubmitAnalyze.controller";

const assignmentRouter = express.Router();

// POST endpoint – олон зураг upload хийж анализ хийх
assignmentRouter.post("/:assignmentId/:studentId", analyzeAssignment);

export default assignmentRouter;


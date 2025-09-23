import express from "express";
import multer from "multer";
import { analyzeAssignment } from "../controllers/GeminiStudent/studentSubmitAnalyze.controller";

const assignmentRouter = express.Router();

// ✅ Multer memoryStorage ашиглана (serverless-д тохиромжтой)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST endpoint – олон зураг upload хийж анализ хийх
assignmentRouter.post(
  "/:assignmentId/:studentId",
  upload.array("files", 4),
  analyzeAssignment
);

export default assignmentRouter;

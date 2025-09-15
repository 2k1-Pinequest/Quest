import express from "express";
import multer from "multer";
import { analyzeAssignment } from "../controllers/GeminiStudent/studentSubmitAnalyze.controller";


const assignmentRouter = express.Router();

// Multer setup (upload зургуудыг хадгалах)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// POST endpoint – зураг upload хийж анализ хийх
assignmentRouter.post("/analyzeAssignment/:studentId", upload.single("file"), analyzeAssignment);

export default assignmentRouter;
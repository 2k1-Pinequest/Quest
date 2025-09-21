import { Router } from "express";
import { getStudentsSubmissionById } from "../controllers/assigments/getStudentSubmissionByAssignId.controller";


const router = Router();

router.get(
  "/submissions/:assignmentId/:studentId",
  getStudentsSubmissionById
);

export default router;
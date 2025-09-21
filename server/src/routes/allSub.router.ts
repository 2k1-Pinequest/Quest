import { Router } from "express";
import { getAllStudentsSubmissionsWithAI } from "../controllers/allSubmissions/getAllSubmissions.controller";
// import { getSubmissionsByAssignmentId } from "../controllers/allSubmissions/getAllSubByAssignmentId.controller";

const getAssignmentRouter = Router();

getAssignmentRouter.get("/subs/:assignmentId", getAllStudentsSubmissionsWithAI);

// getAssignmentRouter.get("", getSubmissionsByAssignmentId)

export default getAssignmentRouter;

import { Router } from "express";
import { getAllStudentsSubmissionsWithAI } from "../controllers/allSubmissions/getAllSubByAssignmentId.controller";

const getAssignmentRouter = Router();

getAssignmentRouter.get("/subs/:assignmentId", getAllStudentsSubmissionsWithAI);

export default getAssignmentRouter;
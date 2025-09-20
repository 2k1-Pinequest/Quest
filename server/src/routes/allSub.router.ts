import { Router } from "express";
import { getAllStudentsSubmissionsWithAI } from "../controllers/allSubmissions/getAllSubmissions.controller";

const getAssignmentRouter = Router();

getAssignmentRouter.get("/submissions", getAllStudentsSubmissionsWithAI);

export default getAssignmentRouter;

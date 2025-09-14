import { Router } from "express";
import { createTeacher } from "../controllers/teacher/createTeacher.controller";

const teacherRouter = Router();

teacherRouter.post("/create", createTeacher);
export default teacherRouter;

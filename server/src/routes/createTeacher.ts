import { Router } from "express";

import { loginTeacher } from "../controllers/teacher/sign-in.controller";
import { createTeacher } from "../controllers/teacher/sign-up.controller";

const teacherRouter = Router();

teacherRouter.post("/sign-up", createTeacher);
teacherRouter.post("/sign-in", loginTeacher);
export default teacherRouter;

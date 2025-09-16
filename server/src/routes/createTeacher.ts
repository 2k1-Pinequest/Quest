import { Router } from "express";

import { loginTeacher } from "../controllers/teacher/sign-in.controller";
import { createTeacher } from "../controllers/teacher/sign-up.controller";
import { createAssignment } from "../controllers/teacher/CreateAssigment.controller";

const teacherRouter = Router();

teacherRouter.post("/sign-up", createTeacher);
teacherRouter.post("/sign-in", loginTeacher);

teacherRouter.post("/createAssignment", createAssignment)



export default teacherRouter;

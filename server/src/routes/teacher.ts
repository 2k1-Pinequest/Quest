import { Router } from "express";

import { loginTeacher } from "../controllers/teacher/sign-in.controller";
import { createTeacher } from "../controllers/teacher/sign-up.controller";
import { createAssignmentForRoom } from "../controllers/teacher/CreateAssigment.controller";
import { getStudentAssignmentsByAssignmentId } from "../controllers/GeminiStudent/getStudentAssignmentsByAssignmentId.controller";
import { approveByTeacher } from "../controllers/teacher/approveAssignment.controller";




const teacherRouter = Router();

teacherRouter.post("/sign-up", createTeacher);
teacherRouter.post("/sign-in", loginTeacher);
teacherRouter.post("/createAssignment", createAssignmentForRoom)

teacherRouter.get("/aiAssigments/:assignmentId", getStudentAssignmentsByAssignmentId)

teacherRouter.put("/approvedSub/:submissionId", approveByTeacher)

export default teacherRouter;

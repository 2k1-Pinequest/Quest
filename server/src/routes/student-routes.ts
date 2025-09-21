import { Router } from "express";
import { joinRoom } from "../controllers/room/joinRoom.controller";
import { createStudent } from "../controllers/student/signUp.controller";
import { loginStudent } from "../controllers/student/signIn.controller";

import { getRoomInfo } from "../controllers/student/getRoomInfo.controller";
import { getAssignmentsForStudent } from "../controllers/student/getAssigment.controller";

const studentRouter = Router();
studentRouter.get("/assignments/:roomId", getAssignmentsForStudent);
studentRouter.post("/joinclass", joinRoom);
studentRouter.post("/register", createStudent);
studentRouter.post("/login", loginStudent);
studentRouter.get("/room/:studentId", getRoomInfo);
export default studentRouter;
//ene hseg deer shalgah

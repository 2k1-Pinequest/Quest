import { Router } from "express";
import { joinRoom } from "../controllers/room/joinRoom.controller";
import { createStudent } from "../controllers/student/signUp.controller";
import { loginStudent } from "../controllers/student/signIn.controller";
import { GetAssignment } from "../controllers/student/getAssigment.controller";
import { getRoomInfo } from "../controllers/student/getRoomInfo.controller";

const studentRouter = Router();
studentRouter.get("/assignments/:roomId", GetAssignment);
studentRouter.post("/joinclass", joinRoom);
studentRouter.post("/register", createStudent);
studentRouter.post("/login", loginStudent);
studentRouter.get("/room/:studentId", getRoomInfo);
export default studentRouter;
//ene hseg deer shalgah

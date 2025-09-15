import { Router } from "express";
import { joinRoom } from "../controllers/room/joinRoom.controller";
import { createStudent } from "../controllers/student/signUp.controller";
import { loginStudent } from "../controllers/student/signIn.controller";

const studentRouter = Router();

studentRouter.post("/joinclass/:studentId", joinRoom);
studentRouter.post("/register", createStudent);
studentRouter.post("/login", loginStudent);
export default studentRouter;
//ene hseg deer shalgah

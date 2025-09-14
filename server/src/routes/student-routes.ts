import { Router } from "express";
import { joinRoom } from "../controllers/room/joinRoom.controller";
import { createStudent } from "../controllers/student/signUp.controller";

const studentRouter = Router();

studentRouter.post("/joinclass/:studentId", joinRoom);
studentRouter.post("/register", createStudent);
export default studentRouter;

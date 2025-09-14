import { Router } from "express";
import { joinRoom } from "../controllers/student/joinRoom.controller";

const studentRouter = Router();

studentRouter.post("/joinclass", joinRoom);
export default studentRouter;

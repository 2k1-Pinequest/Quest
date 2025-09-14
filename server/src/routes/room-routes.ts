import { Router } from "express";
import { createRoom } from "../controllers/room/createRoom.controller";


const roomRouter = Router();

roomRouter.post("/:teacherId", createRoom);
export default roomRouter;

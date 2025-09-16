import { Router } from "express";
import { createRoom } from "../controllers/room/createRoom.controller";
import { getRooms } from "../controllers/room/getRoom.controller";
import { deleteRoom } from "../controllers/room/deleteRoom.controller";


const roomRouter = Router();

roomRouter.post("/:teacherId", createRoom);
roomRouter.get("/:teacherId", getRooms)
roomRouter.delete("/:roomId", deleteRoom);
export default roomRouter;

import express from "express";
import { createRoom } from "../controllers/CreateRoom";

const roomRouter = express.Router();

//* Create room
roomRouter.post("/", createRoom);

export default roomRouter;

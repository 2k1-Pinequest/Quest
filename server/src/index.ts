import express from "express";
import cors from "cors";
import roomRouter from "./routes/room-routes";
import teacherRouter from "./routes/createTeacher";

const app = express();

const PORT = 4200;

app.use(cors());

app.use(express.json());

app.use("/room", roomRouter);
app.use("/teacher", teacherRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

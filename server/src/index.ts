import express from "express";
import cors from "cors";
import roomRouter from "./routes/room-routes";
import teacherRouter from "./routes/createTeacher";
import studentRouter from "./routes/student-routes";

const app = express();

const PORT = 4200;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.use("/room", roomRouter);
app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

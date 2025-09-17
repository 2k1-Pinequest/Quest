import express from "express";
import cors from "cors";
import roomRouter from "./routes/room-routes";
import teacherRouter from "./routes/createTeacher";
import studentRouter from "./routes/student-routes";
import assignmentRouter from "./routes/StudentAssignment.router";

import { Request, Response } from "express";

const app = express();

const PORT = 4200;

app.use(cors({
  origin: "http://edusnap-iota.vercel.app",
  credentials: true
}));

app.use(express.json());

app.get("/hi", (req:Request, res:Response)=>{
  res.send("hi")
})

app.use("/room", roomRouter);
app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);

app.use("/studentAssign", assignmentRouter)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

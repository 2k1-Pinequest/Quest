import express from "express";
import cors from "cors";
import roomRouter from "./routes/room-routes";
import teacherRouter from "./routes/teacher";
import studentRouter from "./routes/student-routes";
import assignmentRouter from "./routes/StudentAssignment.router";

import { Request, Response } from "express";
import router from "./routes/assigment.router";
import getAssignmentRouter from "./routes/allSub.router";

const app = express();

const PORT = 4200;

const allowedOrigins = [
  "http://localhost:3000",

  "https://edusnap-iota.vercel.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

app.get("/hi", (req: Request, res: Response) => {
  res.send("hi");
});

app.use("/room", roomRouter);

app.use("/teacher", teacherRouter);

app.use("/student", studentRouter);

app.use("/studentAssign", assignmentRouter);

app.use("/assignments", getAssignmentRouter);

app.use("/", router);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

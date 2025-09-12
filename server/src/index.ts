import express from "express";
import cors from "cors";

const app = express();

const PORT = 4200;

app.use(cors());

app.use(express.json());

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
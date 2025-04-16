import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import mongoose from "mongoose";

import sudokuRoutes from "./routes/sudoku";
import recordRoutes from "./routes/records";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/sudoku")
  .then(() => console.log("✅ MongoDB 연결 성공"))
  .catch((err) => {
    console.error("❌ MongoDB 연결 실패:", err);
    process.exit(1); // 연결 실패 시 서버 종료
  });

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/sudoku", sudokuRoutes);
app.use("/api/records", recordRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

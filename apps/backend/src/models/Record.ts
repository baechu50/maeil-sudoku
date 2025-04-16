import mongoose, { Schema, Document } from "mongoose";
import { DifficultyLevel } from "@shared-types/sudoku";

export interface IRecord extends Document {
  userId?: string; // optional for 비회원
  date: string; // ISO 날짜: '2025-04-15'
  difficulty: DifficultyLevel;
  timeInSeconds: number;
  hintsUsed: number;
}

const RecordSchema = new Schema<IRecord>(
  {
    userId: { type: String },
    date: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    timeInSeconds: { type: Number, required: true },
    hintsUsed: { type: Number, required: true },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 관리
  }
);

RecordSchema.index({ userId: 1, date: 1, difficulty: 1 });

export default mongoose.model<IRecord>("Record", RecordSchema);

import mongoose, { Schema, Document } from "mongoose";
import { SudokuBoard } from "@shared-types/sudoku";

export interface ISudoku extends Document {
  date: string;
  difficulty: "easy" | "medium" | "hard";
  puzzle: SudokuBoard;
  solution: SudokuBoard;
}

const SudokuSchema = new Schema<ISudoku>(
  {
    date: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    puzzle: { type: [[Number]], required: true },
    solution: { type: [[Number]], required: true },
  },
  { timestamps: true }
);

SudokuSchema.index({ date: 1, difficulty: 1 }, { unique: true });

export default mongoose.model<ISudoku>("Sudoku", SudokuSchema);

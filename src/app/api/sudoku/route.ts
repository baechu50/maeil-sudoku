import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Sudoku from "@/app/models/Sudoku";
import Record from "@/app/models/Record";
import { generateSudokuPuzzle } from "@/app/lib/sudokuGenerator";
import {
  isValidBoard,
  isValidDate,
  isValidDifficulty,
} from "@/app/lib/validators";
import { PostSudokuRequest } from "@/types/sudoku";

// DB 연결 함수 (중복 연결 방지)
let isConnected = false;
async function connectDB() {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URI!);
    isConnected = true;
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const difficulty = searchParams.get("difficulty");
    if (!date || !difficulty) {
      return NextResponse.json(
        { error: "날짜와 난이도를 입력하세요." },
        { status: 400 }
      );
    }
    let sudoku = await Sudoku.findOne({ date, difficulty });
    if (!sudoku) {
      const { puzzle, solution } = generateSudokuPuzzle(
        difficulty as "easy" | "medium" | "hard"
      );
      sudoku = await Sudoku.create({ date, difficulty, puzzle, solution });
    }
    return NextResponse.json({ board: sudoku.puzzle });
  } catch (err: unknown) {
    console.error("Sudoku API Error:", err);
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = (await req.json()) as PostSudokuRequest;
    const { board, startedAt, difficulty, timeInSeconds, hintsUsed } = body;
    if (
      !isValidBoard(board) ||
      !isValidDate(startedAt) ||
      !isValidDifficulty(difficulty) ||
      typeof timeInSeconds !== "number" ||
      timeInSeconds < 0 ||
      typeof hintsUsed !== "number" ||
      hintsUsed < 0
    ) {
      return NextResponse.json(
        { error: "잘못된 요청 형식입니다." },
        { status: 422 }
      );
    }
    const sudoku = await Sudoku.findOne({ date: startedAt, difficulty });
    if (!sudoku) {
      return NextResponse.json(
        { error: "해당 날짜의 문제를 찾을 수 없습니다." },
        { status: 404 }
      );
    }
    const isCorrect = JSON.stringify(board) === JSON.stringify(sudoku.solution);
    if (!isCorrect) {
      return NextResponse.json({ error: "정답이 아닙니다." }, { status: 400 });
    }
    await Record.create({
      date: startedAt,
      difficulty,
      timeInSeconds,
      hintsUsed,
      userId: null,
    });
    return NextResponse.json({ status: "success" });
  } catch (err: unknown) {
    console.error("Sudoku API Error:", err);
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

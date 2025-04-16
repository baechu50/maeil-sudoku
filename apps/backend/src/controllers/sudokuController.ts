import { Request, Response, NextFunction } from "express";
import { generateSudokuPuzzle } from "../utils/sudokuGenerator";
import Sudoku from "../models/Sudoku";
import Record from "../models/Record";
import { PostSudokuRequest } from "@shared-types/sudoku";
import {
  isValidBoard,
  isValidDate,
  isValidDifficulty,
} from "../utils/validators";

export const getSudoku = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date, difficulty } = req.query;

    if (!date || !difficulty) {
      throw new Error("날짜와 난이도를 입력하세요.");
    }

    // 기존에 생성된 문제 있는지 확인
    let sudoku = await Sudoku.findOne({ date, difficulty });

    // 없으면 새로 생성
    if (!sudoku) {
      const { puzzle, solution } = generateSudokuPuzzle(
        difficulty as "easy" | "medium" | "hard"
      );
      sudoku = await Sudoku.create({ date, difficulty, puzzle, solution });
    }

    res.json({ board: sudoku.puzzle });
  } catch (err) {
    next(err);
  }
};

// POST /api/sudoku
export const submitSudoku = async (
  req: Request<{}, {}, PostSudokuRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { board, startedAt, difficulty, timeInSeconds, hintsUsed } = req.body;

    //유효성 검사
    if (
      !isValidBoard(board) ||
      !isValidDate(startedAt) ||
      !isValidDifficulty(difficulty) ||
      typeof timeInSeconds !== "number" ||
      timeInSeconds < 0 ||
      typeof hintsUsed !== "number" ||
      hintsUsed < 0
    ) {
      res.status(422).json({
        status: "error",
        error: {
          code: 422,
          message: "잘못된 요청 형식입니다.",
        },
      });
      return;
    }

    const sudoku = await Sudoku.findOne({ date: startedAt, difficulty });

    if (!sudoku) {
      throw new Error("해당 날짜의 문제를 찾을 수 없습니다.");
    }

    const isCorrect = JSON.stringify(board) === JSON.stringify(sudoku.solution);

    if (!isCorrect) {
      res.status(400).json({
        status: "error",
        error: {
          code: 400,
          message: "정답이 아닙니다.",
        },
      });
      return;
    }

    // 기록 저장
    await Record.create({
      date: startedAt,
      difficulty,
      timeInSeconds,
      hintsUsed,
      userId: null, // TODO: 인증 후 사용자 ID 저장
    });

    res.json({ status: "success" });
  } catch (err) {
    next(err);
  }
};

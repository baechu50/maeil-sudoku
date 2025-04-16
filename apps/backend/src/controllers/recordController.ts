import { Request, Response, NextFunction } from "express";
import Record from "../models/Record";
import {
  isValidBoard,
  isValidDate,
  isValidDifficulty,
} from "../utils/validators";

// ✅ POST /api/records
export const createRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date, difficulty, timeInSeconds, hintsUsed, userId } = req.body;

    const newRecord = await Record.create({
      date,
      difficulty,
      timeInSeconds,
      hintsUsed,
      userId, // 비회원이면 undefined
    });

    res.status(201).json({ status: "success", record: newRecord });
  } catch (err) {
    next(err);
  }
};

export const getRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { date, difficulty, userId } = req.query;

    if (
      typeof date !== "string" ||
      !isValidDate(date) ||
      !isValidDifficulty(difficulty as string) ||
      typeof userId !== "string"
    ) {
      res.status(422).json({
        status: "error",
        error: { code: 422, message: "잘못된 요청 형식입니다." },
      });
      return;
    }

    const record = await Record.findOne({
      date,
      difficulty,
      userId,
    });

    if (!record) {
      res.status(404).json({
        status: "error",
        error: { code: 404, message: "기록이 존재하지 않습니다." },
      });
      return;
    }

    res.json(record);
  } catch (err) {
    next(err);
  }
};

export const getRecordsInRange = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { dateFrom, dateTo, userId } = req.query;

    if (
      typeof dateFrom !== "string" ||
      typeof dateTo !== "string" ||
      typeof userId !== "string" ||
      !isValidDate(dateFrom) ||
      !isValidDate(dateTo)
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

    const records = await Record.find({
      userId,
      date: { $gte: dateFrom, $lte: dateTo },
    }).sort({ date: 1, difficulty: 1 });

    res.json(records);
  } catch (err) {
    next(err);
  }
};

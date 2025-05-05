import { parseISO, isValid } from "date-fns";
import { SudokuBoard } from "@/types/sudoku";

export const isValidDate = (str: string): boolean => {
  const parsed = parseISO(str); // '2025-04-15'
  return isValid(parsed);
};

export const isValidDifficulty = (val: string): boolean => {
  return ["easy", "medium", "hard"].includes(val);
};

export const isValidBoard = (board: SudokuBoard): boolean => {
  if (!Array.isArray(board) || board.length !== 9) return false;
  return board.every(
    (row) =>
      Array.isArray(row) &&
      row.length === 9 &&
      row.every((cell) => Number.isInteger(cell) && cell >= 0 && cell <= 9)
  );
};

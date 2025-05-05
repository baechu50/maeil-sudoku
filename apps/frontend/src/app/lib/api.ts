import axios from "axios";
import { GetSudokuResponse, PostSudokuRequest } from "@shared-types/sudoku";

export const fetchSudoku = async (date: string, difficulty: string) => {
  const res = await axios.get<GetSudokuResponse>(
    `/api/sudoku?date=${date}&difficulty=${difficulty}`
  );
  return res.data.board;
};

export const submitSudoku = async (data: PostSudokuRequest) => {
  const res = await axios.post("/api/sudoku", data);
  return res.data;
};

import axios from "axios";
import { GetSudokuResponse, PostSudokuRequest } from "@/types/sudoku";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetchSudoku = async (date: string, difficulty: string) => {
  const res = await api.get<GetSudokuResponse>(
    `/api/sudoku?date=${date}&difficulty=${difficulty}`
  );
  return res.data.board;
};

export const submitSudoku = async (data: PostSudokuRequest) => {
  const res = await api.post("/api/sudoku", data);
  return res.data;
};

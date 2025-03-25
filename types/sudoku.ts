export type SudokuBoard = number[][];
export type ISODateString = string;

export interface GetSudokuResponse {
  startedAt: ISODateString;
  board: SudokuBoard;
}

export interface PostSudokuRequest {
  name: string;
  startedAt: ISODateString;
  timeInSeconds: number;
  board: SudokuBoard;
}

export interface PostSudokuResponse {
  name: string;
  timeInSeconds: number;
  rank: number;
  recordId: string;
}

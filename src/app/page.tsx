"use client";
import { useEffect, useState } from "react";
import { fetchSudoku } from "@/app/lib/api";
import { SudokuBoard } from "@/types/sudoku";

export default function HomePage() {
  const [board, setBoard] = useState<SudokuBoard>(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
    null
  );

  const handleNumberInput = (num: number) => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;
    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = num;
    setBoard(newBoard);
  };

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    fetchSudoku(today, "easy").then(setBoard);
  }, []);

  return (
    <div className="p-6 space-y-6 text-center">
      <h1 className="text-l font-bold">오늘의 수도쿠를 풀어봐요!</h1>
      {/* 보드 */}
      <div className="grid grid-cols-9 gap-px bg-black w-fit mx-auto border-2">
        {board.map((row, rowIdx) =>
          row.map((cell, colIdx) => {
            const isSelected =
              selectedCell?.[0] === rowIdx && selectedCell?.[1] === colIdx;
            return (
              <div
                key={`${rowIdx}-${colIdx}`}
                onClick={() => setSelectedCell([rowIdx, colIdx])}
                className={`w-10 h-10 flex items-center justify-center text-sm cursor-pointer select-none ${
                  isSelected ? "bg-blue-100" : "bg-white"
                } ${colIdx % 3 === 2 && colIdx !== 8 ? "border-r-2" : ""} ${
                  rowIdx % 3 === 2 && rowIdx !== 8 ? "border-b-1" : ""
                }
                }`}
              >
                {cell !== 0 ? cell : ""}
              </div>
            );
          })
        )}
      </div>

      {/* 숫자 패드 */}
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button
            key={n}
            onClick={() => handleNumberInput(n)}
            className="w-8 h-8 rounded border text-sm hover:bg-gray-100"
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { fetchSudoku } from "@/app/lib/api";
import { useSudokuBoard } from "@/app/hooks/useSudokuBoard";
import { useSudokuValidation } from "@/app/hooks/useSudokuValidation";
import { getCellClasses, getNumberPadClass } from "@/app/lib/styleUtils";
import { useTimer } from "@/app/hooks/useTimer";

export default function HomePage() {
  const {
    board,
    initialBoard,
    selectedCell,
    handleNumberInput,
    handleCellSelect,
    handleCellClear,
    setNewPuzzle,
    highlightNumber,
    highlightArea,
  } = useSudokuBoard(Array.from({ length: 9 }, () => Array(9).fill(0)));

  const { conflictCells } = useSudokuValidation(board);
  const { time, start, stop } = useTimer();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    fetchSudoku(today, "easy").then((puzzle) => {
      setNewPuzzle(puzzle);
      start();
    });
  }, []);

  return (
    <div className="p-6 space-y-6 text-center">
      <div className="space-y-2">
        <h1 className="text-l font-bold">오늘의 수도쿠를 풀어봐요!</h1>
        <div className="flex items-center justify-center gap-2">
          <div className="text-xl font-mono">{time}</div>
          <button
            onClick={() => {
              start();
              setIsPaused(false);
            }}
            className="px-2 py-1 text-sm rounded border bg-gray-100 hover:bg-gray-200"
          >
            시작
          </button>
          <button
            onClick={() => {
              stop();
              setIsPaused(true);
            }}
            className="px-2 py-1 text-sm rounded border bg-gray-100 hover:bg-gray-200"
          >
            정지
          </button>
        </div>
      </div>

      {/* 보드 */}
      <div className="relative">
        <div className="grid grid-cols-9 gap-px bg-black w-fit mx-auto border-2">
          {board.map((row, rowIdx) =>
            row.map((cell, colIdx) => {
              const cellClasses = getCellClasses(
                rowIdx,
                colIdx,
                cell,
                selectedCell,
                highlightNumber,
                highlightArea,
                initialBoard,
                conflictCells
              ).join(" ");

              return (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  className={cellClasses}
                  onClick={() => handleCellSelect(rowIdx, colIdx)}
                >
                  {cell !== 0 ? cell : ""}
                </div>
              );
            })
          )}
        </div>
        {isPaused && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-xl">일시정지</span>
          </div>
        )}
      </div>

      {/* 숫자 패드 */}
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button
            key={n}
            onClick={() => !isPaused && handleNumberInput(n)}
            className={getNumberPadClass(board, n)}
            disabled={isPaused}
          >
            {n}
          </button>
        ))}
      </div>

      {/* 추가 기능 버튼 */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="px-4 py-2 rounded border text-sm bg-gray-100 hover:bg-gray-200"
          onClick={() => !isPaused && handleCellClear()}
          disabled={isPaused}
        >
          삭제
        </button>
        <button
          className="px-4 py-2 rounded border text-sm bg-gray-100 hover:bg-gray-200"
          disabled={isPaused}
        >
          메모
        </button>
        <button
          className="px-4 py-2 rounded border text-sm bg-gray-100 hover:bg-gray-200"
          disabled={isPaused}
        >
          되돌리기
        </button>
        <button
          className="px-4 py-2 rounded border text-sm bg-yellow-100 hover:bg-yellow-200"
          disabled={isPaused}
        >
          힌트
        </button>
      </div>
    </div>
  );
}

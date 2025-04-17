"use client";

// import DifficultySelector from "@/components/DifficultySelector";
// import Timer from "@/components/Timer";
// import SudokuBoard from "@/components/SudokuBoard";
// import NumberPad from "@/components/NumberPad";

export default function HomePage() {
  return (
    <main className="min-h-screen p-6 bg-gray-50 text-gray-800 flex flex-col items-center gap-4">
      <header className="w-full max-w-2xl flex justify-between items-center">
        <h1 className="text-2xl font-bold">🧩 매일 스도쿠</h1>
        <button className="text-blue-600 underline">로그인</button>
      </header>

      {/* <DifficultySelector />

      <Timer />

      <SudokuBoard />

      <NumberPad /> */}
    </main>
  );
}

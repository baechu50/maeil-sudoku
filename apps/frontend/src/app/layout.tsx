import "./globals.css";

export const metadata = {
  title: "매일 스도쿠",
  description: "매일 3문제, 기록을 남기는 낙서풍 퍼즐 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-800">
        <header className="w-full max-w-4xl mx-auto p-10 flex justify-between items-center border-b">
          <h1 className="text-xl font-bold">MAEIL-DO-KU</h1>
          <button className="underline">로그인</button>
        </header>
        <main className="w-full max-w-4xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}

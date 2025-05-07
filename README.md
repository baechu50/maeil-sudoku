# 🧩 매일 스도쿠

매일 제공되는 3개의 스도쿠 문제를 풀고, 자신의 기록을 확인할 수 있는 감성 퍼즐 서비스입니다.

<br>

## ✨ 주요 기능

- 하루 3문제 (난이도: 상, 중, 하)
- 비회원도 문제 풀이 가능 (기록은 로컬에 저장)
- 회원은 기록을 서버에 저장 & 마이페이지에서 캘린더로 확인
- 주간 리포트를 이메일로 제공

<br>

## 📁 프로젝트 구조

```
maeil-sudoku-next/
    ├── src/
    │   ├── app/           # Next.js App Router (프론트 + API 라우트)
    │   │   ├── api/       # API 라우트 (ex. /api/sudoku)
    │   │   ├── lib/       # 유틸리티, 퍼즐 생성, 검증 등
    │   │   ├── models/    # Mongoose 모델
    │   │   └── page.tsx   # 메인 페이지 (수도쿠 UI)
    │   └── types/         # 타입 정의 (공유 타입)
    ├── public/            # 정적 파일
    ├── .env.local         # 환경변수 (MongoDB 등)
    └── ...
```

<br>

## 🚀 실행 방법

```bash
# 루트에서 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:3000 접속
```

- MongoDB는 로컬에서 도커로 띄우거나, Atlas 등 외부 인스턴스를 사용하세요.
- 환경변수 예시 (`.env.local`):
  ```
  MONGO_URI=mongodb://localhost:27017/sudoku
  ```

<br>

## 🧑‍💻 기술 스택

| 분야          | 기술                                          |
| ------------- | --------------------------------------------- |
| 프론트/백엔드 | Next.js, Tailwind CSS, TypeScript, API Routes |
| DB            | MongoDB, Mongoose                             |
| 인프라        | Docker, Vercel, GitHub Actions                |

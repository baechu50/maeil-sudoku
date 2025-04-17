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
maeil-sudoku/
    ├── apps/
    │ ├── backend/ # Express + MongoDB (API 서버)
    │ └── frontend/ # Next.js (프론트엔드)
    ├── packages/
    │ └── types/ # 백엔드/프론트 공유 타입
```

<br>

## 🚀 실행 방법

```bash
# 루트에서 설치
npm install

# 백엔드 실행
cd apps/backend
npm run dev

# 프론트엔드 실행
cd apps/frontend
npm run dev
```

<br>

## 🧑‍💻 기술 스택

| 분야       | 기술                              |
| ---------- | --------------------------------- |
| 프론트엔드 | Next.js, Tailwind CSS, TypeScript |
| 백엔드     | Express, MongoDB, Mongoose        |
| 인프라     | Docker, Vercel, GitHub Actions    |

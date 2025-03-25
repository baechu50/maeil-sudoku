#!/bin/bash

read -p "Enter frontend folder name (default: frontend): " FRONTEND_NAME
read -p "Enter backend folder name (default: backend): " BACKEND_NAME

FRONTEND_NAME=${FRONTEND_NAME:-frontend}
BACKEND_NAME=${BACKEND_NAME:-backend}

# ======== CREATE MONOREPO STRUCTURE ========
echo "\n📁 Creating monorepo folders in current directory"
mkdir -p $FRONTEND_NAME $BACKEND_NAME

# ======== INIT ROOT PACKAGE.JSON ========
echo "\n📦 Initializing root package.json"
npm init -y > /dev/null

# ======== FRONTEND SETUP ========
echo "\n⚙️  Setting up frontend with Vite + React + TS"
npm create vite@latest $FRONTEND_NAME -- --template react-ts > /dev/null
cd $FRONTEND_NAME
npm install

npm install -D tailwindcss postcss autoprefixer > /dev/null
npx tailwindcss init -p

# Tailwind config patch
cat > tailwind.config.ts <<EOF
import type { Config } from 'tailwindcss'
const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: []
}
export default config
EOF

# Patch index.css
cat > src/index.css <<EOF
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

# Vite config alias 설정
cat > vite.config.ts <<EOF
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
})
EOF

# .env 파일 생성
cat > .env <<EOF
VITE_API_URL=http://localhost:3000
EOF

cd ..

# ======== BACKEND SETUP ========
echo "\n⚙️  Setting up backend with Express + Mongoose"
mkdir -p $BACKEND_NAME
cd $BACKEND_NAME
npm init -y > /dev/null
npm install express mongoose cors > /dev/null
npm install -D nodemon

# Basic server
cat > index.js <<EOF
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/sudoku', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => res.send('Hello Sudoku!'));

app.listen(3000, () => {
  console.log('🚀 Backend running on http://localhost:3000');
});
EOF

# Dockerfile
cat > Dockerfile <<EOF
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npx", "nodemon", "index.js"]
EOF

# .gitignore
cat > .gitignore <<EOF
node_modules
.env
EOF

cd ..

# ======== DOCKER COMPOSE ========
echo "\n🐳 Writing docker-compose.yml"
cat > docker-compose.yml <<EOF
services:
  backend:
    build:
      context: ./backend
    ports:
      - '3000:3000'
    depends_on:
      - mongo
    volumes:
      - ./backend:/app

  mongo:
    image: mongo
    ports:
      - '27017:27017'
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
EOF

# ======== DONE ========
echo "\n✅ Setup complete!"
echo "\n➡️  Next steps:"
echo "docker-compose up --build"
echo "cd $FRONTEND_NAME && npm run dev"
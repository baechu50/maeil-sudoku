#!/bin/bash

PROJECT_NAME="maeil-sudoku"
mkdir -p $PROJECT_NAME/{apps/web,apps/backend,packages/types}
cd $PROJECT_NAME

echo "📦 Initializing frontend with Next.js..."
mkdir -p apps/web && cd apps/web
npx create-next-app@latest . --ts --app --tailwind --src-dir --import-alias "@/*"


echo "🛠️ Initializing backend (Express + TypeScript)..."
cd ../backend
npm init -y
npm install express mongoose cors dotenv
npm install -D typescript @types/node @types/express ts-node nodemon
npx tsc --init
mkdir src
touch src/index.ts

echo '{
  "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}' > package.json

echo "📦 Creating shared types..."
cd ../../packages/types
npm init -y
touch index.ts

cd ../..

echo "🧪 Creating docker-compose.yml"
cat <<EOF > docker-compose.yml
services:
  backend:
    build: ./apps/backend
    ports:
      - "3000:3000"
    volumes:
      - ./apps/backend:/app
    depends_on:
      - mongo
  mongo:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
volumes:
  mongo-data:
EOF

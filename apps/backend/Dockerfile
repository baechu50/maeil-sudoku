# Dockerfile 위치: apps/backend/Dockerfile
FROM node:18

WORKDIR /app

COPY apps/backend/package*.json ./          
RUN npm install

COPY . .                                   
WORKDIR /app/apps/backend

RUN npm run build

CMD ["node", "dist/index.js"]

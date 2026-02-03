FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем favicon файлы, если они не попали в dist
COPY --from=builder /app/public/favicon.ico /usr/share/nginx/html/favicon.ico 2>/dev/null || true
COPY --from=builder /app/public/favicons /usr/share/nginx/html/favicons 2>/dev/null || true
COPY --from=builder /app/public/manifest.json /usr/share/nginx/html/manifest.json 2>/dev/null || true

EXPOSE 80

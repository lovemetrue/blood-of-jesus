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
COPY --from=builder /app/public /tmp/public
RUN ([ -f /tmp/public/favicon.ico ] && cp /tmp/public/favicon.ico /usr/share/nginx/html/favicon.ico) || true && \
    ([ -d /tmp/public/favicons ] && cp -r /tmp/public/favicons /usr/share/nginx/html/favicons) || true && \
    ([ -f /tmp/public/manifest.json ] && cp /tmp/public/manifest.json /usr/share/nginx/html/manifest.json) || true && \
    rm -rf /tmp/public

EXPOSE 80

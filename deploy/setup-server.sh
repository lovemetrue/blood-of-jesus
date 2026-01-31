#!/bin/bash
# Скрипт подготовки VPS для деплоя bloodofjesus.ru
# Запускать на сервере от root: bash setup-server.sh

set -e

echo "=== Обновление системы ==="
apt-get update && apt-get upgrade -y

echo "=== Установка nginx, git, docker ==="
apt-get install -y nginx git curl

# Docker
curl -fsSL https://get.docker.com | sh
systemctl enable docker
systemctl start docker

# Docker Compose
DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep '"tag_name"' | sed -E 's/.*"([^"]+)".*/\1/')
curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Python 3.12
apt-get install -y software-properties-common
add-apt-repository -y ppa:deadsnakes/ppa
apt-get update
apt-get install -y python3.12 python3.12-venv python3.12-dev

echo "=== Настройка nginx для bloodofjesus.ru ==="
# Nginx проксирует на Docker frontend (порт 8080)
cat > /etc/nginx/sites-available/bloodofjesus.ru << 'NGINX'
server {
    listen 80;
    server_name bloodofjesus.ru www.bloodofjesus.ru;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX

rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/bloodofjesus.ru /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

echo "=== Установка Certbot для SSL ==="
apt-get install -y certbot python3-certbot-nginx

echo "=== Готово! ==="
echo ""
echo "Следующие шаги:"
echo "1. Склонируйте проект: git clone <repo> /var/www/bloodofjesus"
echo "2. cd /var/www/bloodofjesus && cp .env.example .env"
echo "3. Отредактируйте .env (SECRET_KEY, POSTGRES_PASSWORD, YOOKASSA_*)"
echo "4. docker-compose up -d --build"
echo "5. docker-compose exec backend python manage.py migrate"
echo "6. docker-compose exec backend python manage.py createsuperuser"
echo "7. certbot --nginx -d bloodofjesus.ru -d www.bloodofjesus.ru"
echo ""
echo "После certbot nginx автоматически настроит HTTPS."

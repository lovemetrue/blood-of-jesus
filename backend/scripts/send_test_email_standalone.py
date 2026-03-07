#!/usr/bin/env python3
"""
Тест отправки письма по SMTP (Yandex, порт 465). Без Django.
Читает .env из корня проекта (blood-of-jesus/.env). Запуск из backend/: python3 scripts/send_test_email_standalone.py
"""
import os
import smtplib
import sys
from email.mime.text import MIMEText
from pathlib import Path

# Корень проекта = родитель backend/
BACKEND_DIR = Path(__file__).resolve().parent.parent
PROJECT_ROOT = BACKEND_DIR.parent
ENV_PATH = PROJECT_ROOT / ".env"


def load_dotenv(path):
    env = {}
    if not path.exists():
        return env
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            env[key] = value
    return env


def main():
    os.chdir(BACKEND_DIR)
    env = load_dotenv(ENV_PATH)

    host = env.get("EMAIL_HOST", "smtp.yandex.ru")
    port = int(env.get("EMAIL_PORT", "465"))
    user = env.get("EMAIL_HOST_USER", "")
    password = env.get("EMAIL_HOST_PASSWORD", "")
    from_email = env.get("DEFAULT_FROM_EMAIL", user)
    to_email = env.get("CONTACT_NOTIFY_EMAIL", env.get("ADMIN_EMAIL", "jesusthehealer@yandex.ru"))

    if not user or not password:
        print("В .env должны быть заданы EMAIL_HOST_USER и EMAIL_HOST_PASSWORD.", file=sys.stderr)
        sys.exit(1)

    subject = "[Тест] bloodofjesus.ru — проверка отправки"
    body = (
        "Это тестовое письмо от скрипта send_test_email_standalone.py.\n\n"
        "Если вы его получили, SMTP (порт 465, Yandex) настроен верно и уведомления о заявках с формы будут приходить на этот ящик."
    )
    msg = MIMEText(body, "plain", "utf-8")
    msg["Subject"] = subject
    msg["From"] = from_email
    msg["To"] = to_email

    print(f"Отправка теста на {to_email} через {host}:{port} (SSL)...")
    try:
        with smtplib.SMTP_SSL(host, port) as server:
            server.login(user, password)
            server.sendmail(from_email, [to_email], msg.as_string())
        print("Письмо отправлено. Проверьте почту (и папку «Спам»).")
    except Exception as e:
        print(f"Ошибка: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()

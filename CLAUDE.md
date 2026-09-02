# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Сайт служения освобождения «Кровь Христа» (bloodofjesus.ru): React SPA на Vite + Django-бэкенд,
PostgreSQL, Valkey, деплой в Docker на VPS через GitHub Actions. Код и комментарии — на русском.

## Главная ловушка: два дерева фронтенда

В репозитории **две копии** фронтенда, и живёт только одна:

| Путь | Статус |
|---|---|
| `frontend/` — `index.html`, `src/`, `package.json`, `vite.config.ts`, `Dockerfile` | **боевой код**, из него собирается прод-образ |
| `/index.html`, `/src/`, `/package.json`, `/vite.config.ts`, `/postcss.config.mjs` | устаревшая копия, ни во что не входит |

Корневой `vite.config.ts` задаёт `root: <repo>/frontend`, поэтому даже `npm run dev` из корня
собирает `frontend/`, а корневой `src/` (~8700 строк) не читается никем. Корневой `package.json`
к тому же не объявляет `three` и `@react-three/fiber`, хотя код их импортирует.

**Правьте только `frontend/`.** Если правка не подействовала — проверьте, не отредактирован ли
случайно корневой дубликат.

## Команды

Фронтенд (всё из `frontend/`):

```bash
npm ci                 # установка (в CI — тоже npm ci)
npm run dev            # dev-сервер :5173, чистит node_modules/.vite перед стартом
npm run dev:no-clear   # то же без очистки кеша
npm run build          # прод-сборка в frontend/dist
```

Бэкенд (из `backend/`, нужны PostgreSQL и Valkey — проще через compose):

```bash
python manage.py check                 # системные проверки, включая проверки почты (main/checks.py)
python manage.py check --deploy        # то же + деплойные проверки; это гоняет CI
python manage.py migrate
python manage.py createsuperuser
python manage.py test --noinput --parallel
python manage.py test main.tests.TestClass.test_method   # один тест
```

Тестов в репозитории пока нет: ни `test*.py` в `backend/`, ни тестового раннера во фронтенде.
`manage.py test` в CI проходит вхолостую. TypeScript нигде не проверяется — `tsconfig.json`
отсутствует, Vite только срезает типы, так что ошибки типов ловятся глазами.

Полный стек локально:

```bash
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker compose build
docker compose up -d          # сайт :8080, API :8000
docker compose exec backend python manage.py migrate
```

Диагностика почты (см. раздел ниже):

```bash
docker compose exec backend python manage.py send_test_contact_email вашemail@example.com
```

## Архитектура фронтенда

Роутер написан руками, без react-router. Вся навигация живёт в `frontend/src/app/App.tsx`:

- `resolveRoute()` разбирает `window.location` в размеченное объединение `Route`. Она же —
  инициализатор `useState`, поэтому нужный раздел рисуется в первом же кадре. Не переносите
  разбор URL в `useEffect`: тогда любая прямая ссылка сперва покажет главную.
- Три входа в роутер: первый рендер, слушатель `popstate` и один делегированный обработчик
  кликов на `document`. Все три вызывают `resolveRoute()`.
- `Header.tsx` навигирует не ссылками, а `history.pushState()` + рукотворным
  `new PopStateEvent('popstate')`. Поэтому слушатель popstate обязан остаться на месте.
- Список страниц из выпадающего меню — `app/routes.ts` (`MENU_CONTENT_ROUTES`). Добавляя раздел,
  правьте и его, и `switch` в `renderContentPage()`, и `app/seo.ts`.
- `SEOHead.tsx` правит `<head>` императивно из `useEffect` (title, og-теги, canonical) и грузит
  Яндекс.Метрику (id 106606875). Серверного рендеринга нет — поисковикам достаётся пустой `#root`.

### Фон и «белое моргание» — не нарушайте инвариант

Сайт тёмный, но краску первого кадра задаёт CSS, а не React. Раньше `--background` был `#ffffff`,
а тёмный градиент рисовал только React-компонент, поэтому между первой отрисовкой и монтированием
весь экран был белым.

Инвариант: **градиент фона объявлен в трёх местах и все три обязаны совпадать**:

1. инлайн `<style>` в `frontend/index.html` — красит кадр до загрузки CSS-бандла;
2. `--site-backdrop` и `--background` в `frontend/src/styles/theme.css` (+ класс `.site-backdrop`);
3. обёртка в `Christian3DBackground.tsx` и фолбэк `Suspense` в `App.tsx` — оба через `.site-backdrop`.

Если поменять оттенок в одном месте — вернётся вспышка на монтировании. Светлый `--background`
вернёт исходный баг целиком.

`Christian3DBackground` (three.js + @react-three/fiber, ~870 КБ) подключён через `React.lazy`:
он весит больше, чем всё остальное приложение, и в критическом пути ему делать нечего. Прямой
импорт вернёт единый бандл ~1.3 МБ и удлинит время до первого контента.

Контент первого экрана (`Hero.tsx`, заголовок, картинка, кнопка) рисуется сразу, без
`initial: opacity 0` и без `whileInView`. `whileInView` уместен только ниже сгиба: выше он делает
контент невидимым до первого срабатывания IntersectionObserver. `AnimatePresence` в `App.tsx`
стоит с `initial={false}` — анимация только на переходах между разделами, не на первой загрузке.

### Стили

Tailwind v4 через `@tailwindcss/vite`, без `tailwind.config`. `styles/tailwind.css` использует
`source(none)` + явный `@source '../**/*.{js,ts,jsx,tsx}'`. `postcss.config.mjs` намеренно пустой.
`styles/fonts.css` — пустой файл, импортируется ради будущих шрифтов.

Семантические токены (`--card`, `--popover`, `--primary`, …) в `theme.css` остались от shadcn и
живым кодом не используются — компоненты пишут цвета явно (`text-white`, `bg-gray-900/50`,
`#DC143C`). Значит, менять `--background`/`--foreground` безопасно для UI, но именно они задают
фон `body`.

### Мёртвый код во фронтенде

Из `frontend/src/main.tsx` достижимы 39 файлов из 93. Не достижимы: почти вся папка
`components/ui/**` (шаблоны shadcn), `DonationSection`, `FloatingCross`, `HeritageSection`,
`LocationPage`, `OrganizationInfo`, `UserAgreement`, `figma/ImageWithFallback`.
Из 60 зависимостей в `frontend/package.json` код импортирует шесть: `react`, `react-dom`,
`motion`, `lucide-react`, `three`, `@react-three/fiber`. Остальные (MUI, recharts, react-dnd,
radix-*, embla, ogl, …) нужны только этим недостижимым файлам. На размер бандла они не влияют
(tree-shaking), но раздувают установку и поток Dependabot-алертов.

Пожертвования (`DonationPage`, ЮKassa) во фронтенде отключены: импорт закомментирован в `App.tsx`,
`/donations` редиректит на главную. Бэкенд-часть при этом рабочая.

## Архитектура бэкенда

Django 4.2–5.x, приложение одно — `main`. `liberation_ministry/` — настройки и точки входа.

- `main/api_urls.py` → `/api/` — JSON-API для SPA: `contact/`, `materials/`, `donations/create/`,
  `yokassa_webhook/`. Роут `/api/health/` из health-check в CI не существует (проверка идёт с
  `|| true`, поэтому молча проходит).
- `main/urls.py` → корень — серверные вьюхи для ЮKassa и выдачи файлов материалов.
- `main/fastapi_routes.py` присутствует в дереве, но никуда не подключён.
- DRF не используется: валидация — на обычных `forms.ModelForm` (`main/forms.py`).
- Кеш и сессии — Valkey через `django_redis` с `IGNORE_EXCEPTIONS: True`, так что падение Valkey
  сайт не роняет. Инвалидация кеша материалов — сигналами в `main/signals.py`.
- `main/checks.py` — проверки конфигурации почты, регистрируются в `MainConfig.ready()`. При
  `DEBUG=True` молчат (иначе ломали бы CI), при `DEBUG=False` предупреждают о нерабочей почте.

### Почта: главный источник тихих отказов

`EMAIL_BACKEND` по умолчанию — `console.EmailBackend`, то есть заглушка: письмо печатается в
stdout контейнера и никуда не уходит. Заявка при этом сохраняется в БД и видна в `/admin/`,
поэтому снаружи всё выглядит рабочим.

Реальная отправка требует блока `EMAIL_*` в `.env` на сервере (образец — `.env.example`).
**GitHub Actions эти переменные не проставляет** — шаг деплоя обновляет в `.env` только
`POSTGRES_*`, `SECRET_KEY` и `YOOKASSA_*`. Поэтому почту настраивают руками на VPS.

Осторожно с `update_env_var()` в `.github/workflows/workflow.yml`: она удаляет строки по
неанкоренному шаблону `/.*$var_name=.*/d`, так что имя-подстрока затирает соседей
(`SECRET_KEY` сносит и `YOOKASSA_SECRET_KEY`, `EMAIL_HOST` снесёт `EMAIL_HOST_USER` и
`EMAIL_HOST_PASSWORD`). Сейчас спасает только порядок вызовов.

Письма о заявке уходят в фоновом потоке (`threading.Thread(daemon=True)`), чтобы ответ SPA не
ждал SMTP. Ошибки в этом потоке больше не глушатся: `send_mail` вызывается с
`fail_silently=False`, каждый провал попадает в лог через `logger.exception`. Не возвращайте сюда
`fail_silently=True` и `except: pass` — именно из-за них «письма не приходят» было невозможно
диагностировать. Поток закрывает своё соединение с БД в `finally` (`connection.close()`).

`LOGGING` в `settings.py` направляет логгеры `main.*` в stdout, уровень настраивается
`APP_LOG_LEVEL`. Смотреть: `docker logs bloodofjesus-backend`.

Провайдер VPS блокирует IPv4 к SMTP Яндекса, поэтому в `docker-compose.prod.yml` у backend стоит
`network_mode: host` — нужен IPv6. Не меняйте это на bridge, не проверив отправку.

## Деплой

Пуш в `main` → CI: проверки и сборка фронтенда → образы backend/frontend в Docker Hub →
SSH на VPS, `git reset --hard`, обновление `.env` из секретов, `docker compose -f
docker-compose.prod.yml pull/down/up`, `migrate`, `collectstatic`.

Сети на проде: хостовой nginx (`deploy/nginx-bloodofjesus.conf`) терминирует TLS и раздаёт
`/api/`, `/admin/`, `/static/`, `/media/` на `127.0.0.1:8000`, остальное — на `127.0.0.1:8080`
(контейнер frontend). Внутренний `frontend/nginx.conf` тоже проксирует `/api/` на `backend:8000`,
но на этом пути не используется.

Подробности и Trivy-сканирование — `deploy/DEPLOY.md` и `README.md`.

## Стиль Python

В `../.cursor/rules/django-python-standards.mdc` (уровень выше репозитория) описан домашний
стандарт: максимум встроенных возможностей Django, бизнес-логика в моделях и формах, вьюхи —
только обработка запроса, `select_related`/`prefetch_related` против N+1, побочные эффекты через
signals, PEP 8.

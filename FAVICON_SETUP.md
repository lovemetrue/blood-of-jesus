# Настройка Favicon и Логотипа

## Созданные файлы

### Favicon файлы (разные размеры):
- `favicon.ico` - основной favicon (32x32)
- `favicons/favicon-16x16.png` - для браузеров
- `favicons/favicon-32x32.png` - для браузеров
- `favicons/favicon-48x48.png` - для браузеров
- `favicons/apple-touch-icon.png` (180x180) - для iOS устройств
- `favicons/android-chrome-192x192.png` - для Android
- `favicons/android-chrome-512x512.png` - для Android

### Логотипы:
- `logo.jpg` - оригинальное изображение (640x640)
- `logo-optimized.png` (256x256) - оптимизированный для использования в Header
- `logo-large.png` (512x512) - большой размер для других целей

## Расположение файлов

### Для разработки (src/):
- Favicons: `src/assets/favicons/`
- Логотипы: `src/assets/`

### Для production (frontend/):
- Favicons: `frontend/public/favicons/` и `frontend/src/assets/favicons/`
- Логотипы: `frontend/src/assets/`
- `favicon.ico`: `frontend/public/favicon.ico`
- `manifest.json`: `frontend/public/manifest.json`

## Интеграция

### HTML файлы
Favicon ссылки добавлены в:
- `index.html` (корневой)
- `frontend/index.html` (production)

### React компоненты
- `SEOHead.tsx` - динамически добавляет favicon ссылки
- `Header.tsx` - использует `logo-optimized.png`

### Manifest.json
Создан PWA manifest с иконками для установки на мобильные устройства.

## Проверка

После деплоя проверьте:
1. Favicon отображается во вкладке браузера
2. Apple Touch Icon работает на iOS устройствах
3. Manifest.json доступен по `/manifest.json`
4. Логотип отображается в Header

## Обновление favicon

Если нужно обновить favicon:
1. Замените `src/assets/logo.jpg` на новое изображение
2. Запустите команды для создания favicon файлов:
```bash
sips -z 16 16 src/assets/logo.jpg --out src/assets/favicons/favicon-16x16.png
sips -z 32 32 src/assets/logo.jpg --out src/assets/favicons/favicon-32x32.png
sips -z 48 48 src/assets/logo.jpg --out src/assets/favicons/favicon-48x48.png
sips -z 180 180 src/assets/logo.jpg --out src/assets/favicons/apple-touch-icon.png
sips -z 192 192 src/assets/logo.jpg --out src/assets/favicons/android-chrome-192x192.png
sips -z 512 512 src/assets/logo.jpg --out src/assets/favicons/android-chrome-512x512.png
sips -z 32 32 src/assets/logo.jpg --out favicon.ico
```
3. Скопируйте файлы в `frontend/public/` и `frontend/src/assets/`

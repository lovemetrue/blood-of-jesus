# Инструкция по затемнению фона изображений

## Установка зависимостей

```bash
pip3 install Pillow
# или
python3 -m pip install Pillow
```

## Запуск скрипта

```bash
cd /Users/madsoft/Desktop/MadSoftProjects/TheBloodOfJesus/blood-of-jesus
python3 scripts/darken_background.py
```

Скрипт автоматически:
- Обработает все изображения в `src/assets/` и `frontend/src/assets/`
- Создаст backup файлы перед изменением
- Затемнит фон на 75% (коэффициент 0.25)
- Усилит контраст для лучшего выделения объекта

## Что будет обработано:

- `logo.jpg` → затемненный фон
- `logo-optimized.png` → затемненный фон  
- `logo-large.png` → затемненный фон
- `87dea475728492b77f108a11cbe676bc39a21a72.png` (hero image) → затемненный фон

Favicon файлы будут пропущены (они уже маленькие и оптимизированы).

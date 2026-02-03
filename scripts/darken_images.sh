#!/bin/bash
# Скрипт для затемнения фона изображений используя sips (встроенный в macOS)

# Функция для затемнения изображения
darken_image() {
    local input="$1"
    local output="$2"
    local darkness="${3:-0.5}"  # По умолчанию 50% яркости
    
    # Используем sips для изменения яркости
    # sips не поддерживает прямое затемнение, поэтому используем обходной путь
    # Создаем временный файл с уменьшенной яркостью
    sips -s format png "$input" --out "$output.tmp" > /dev/null 2>&1
    
    # Применяем затемнение через изменение яркости (sips не поддерживает напрямую)
    # Используем Python если доступен, иначе просто копируем
    if command -v python3 &> /dev/null; then
        python3 -c "
from PIL import Image, ImageEnhance
try:
    img = Image.open('$output.tmp')
    enhancer = ImageEnhance.Brightness(img)
    darkened = enhancer.enhance($darkness)
    contrast = ImageEnhance.Contrast(darkened)
    final = contrast.enhance(1.2)
    final.save('$output', 'PNG', optimize=True)
    print('Processed: $input')
except ImportError:
    import shutil
    shutil.copy('$output.tmp', '$output')
    print('PIL not available, copied original')
" 2>/dev/null || cp "$output.tmp" "$output"
    else
        cp "$output.tmp" "$output"
    fi
    
    rm -f "$output.tmp"
    
    # Конвертируем обратно в исходный формат если нужно
    if [[ "$input" == *.jpg ]] || [[ "$input" == *.jpeg ]]; then
        sips -s format jpeg "$output" --out "$output" --setProperty formatOptions 95 > /dev/null 2>&1
        mv "$output" "${output%.png}.jpg" 2>/dev/null || true
    fi
}

# Обрабатываем изображения
BASE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DARKNESS=0.3  # Затемнение на 70%

echo "Затемнение фона изображений..."
echo "Коэффициент затемнения: $DARKNESS"
echo "----------------------------------------"

# Обрабатываем logo.jpg
if [ -f "$BASE_DIR/src/assets/logo.jpg" ]; then
    echo "Обработка: src/assets/logo.jpg"
    darken_image "$BASE_DIR/src/assets/logo.jpg" "$BASE_DIR/src/assets/logo-dark.jpg" "$DARKNESS"
fi

# Обрабатываем hero image
if [ -f "$BASE_DIR/src/assets/87dea475728492b77f108a11cbe676bc39a21a72.png" ]; then
    echo "Обработка: src/assets/hero-image.png"
    darken_image "$BASE_DIR/src/assets/87dea475728492b77f108a11cbe676bc39a21a72.png" \
                 "$BASE_DIR/src/assets/87dea475728492b77f108a11cbe676bc39a21a72-dark.png" \
                 "$DARKNESS"
fi

# Обрабатываем logo-optimized.png и logo-large.png
for logo_file in "logo-optimized.png" "logo-large.png"; do
    if [ -f "$BASE_DIR/src/assets/$logo_file" ]; then
        echo "Обработка: src/assets/$logo_file"
        darken_image "$BASE_DIR/src/assets/$logo_file" \
                     "$BASE_DIR/src/assets/${logo_file%.png}-dark.png" \
                     "$DARKNESS"
    fi
done

echo ""
echo "✓ Готово! Проверьте результаты в src/assets/"

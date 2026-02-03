#!/usr/bin/env python3
"""
Скрипт для генерации favicon и иконок из logo.png
Создает все необходимые размеры для веб-приложения
"""
import sys
import os
from pathlib import Path

try:
    from PIL import Image
    HAS_PIL = True
except ImportError:
    print("❌ Pillow не установлен!")
    print("Установите: pip3 install Pillow")
    sys.exit(1)


def create_icon(source_path, output_path, size, format='PNG'):
    """
    Создает иконку заданного размера из исходного изображения
    
    Args:
        source_path: путь к исходному изображению
        output_path: путь для сохранения
        size: размер (width, height) или одно число для квадрата
        format: формат сохранения ('PNG' или 'ICO')
    """
    try:
        img = Image.open(source_path)
        
        # Если размер - одно число, делаем квадрат
        if isinstance(size, int):
            size = (size, size)
        
        # Конвертируем в RGBA если нужно
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Resize с высоким качеством (LANCZOS - лучший алгоритм для уменьшения)
        resized = img.resize(size, Image.Resampling.LANCZOS)
        
        # Создаем директорию если нужно
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Сохраняем
        if format == 'ICO':
            # Для ICO конвертируем в RGB
            if resized.mode == 'RGBA':
                # Создаем белый фон для ICO
                background = Image.new('RGB', size, (0, 0, 0))  # Черный фон
                background.paste(resized, mask=resized.split()[3] if resized.mode == 'RGBA' else None)
                resized = background
            resized.save(output_path, 'ICO', sizes=[size])
        else:
            resized.save(output_path, format, optimize=True)
        
        print(f"  ✓ Создано: {os.path.basename(output_path)} ({size[0]}x{size[1]})")
        return True
        
    except Exception as e:
        print(f"  ✗ Ошибка при создании {output_path}: {e}")
        return False


def generate_all_icons(source_path, output_dir):
    """
    Генерирует все необходимые иконки из исходного изображения
    
    Args:
        source_path: путь к исходному logo.png
        output_dir: директория для сохранения иконок
    """
    if not os.path.exists(source_path):
        print(f"❌ Исходный файл не найден: {source_path}")
        return False
    
    print(f"📁 Исходный файл: {source_path}")
    print(f"📁 Выходная директория: {output_dir}")
    print("-" * 60)
    
    # Определяем размеры для favicon
    icon_sizes = {
        'favicon-16x16.png': 16,
        'favicon-32x32.png': 32,
        'favicon-48x48.png': 48,
        'apple-touch-icon.png': 180,  # Apple требует 180x180
        'android-chrome-192x192.png': 192,
        'android-chrome-512x512.png': 512,
    }
    
    created_count = 0
    
    # Создаем PNG иконки
    for filename, size in icon_sizes.items():
        output_path = os.path.join(output_dir, filename)
        if create_icon(source_path, output_path, size, 'PNG'):
            created_count += 1
    
    # Создаем favicon.ico (обычно 32x32)
    ico_path = os.path.join(output_dir, 'favicon.ico')
    if create_icon(source_path, ico_path, 32, 'ICO'):
        created_count += 1
    
    print("-" * 60)
    print(f"✓ Создано иконок: {created_count}")
    return True


if __name__ == '__main__':
    base_dir = Path(__file__).parent.parent
    
    # Путь к исходному logo.png
    source_logo = base_dir / 'src' / 'assets' / 'logo.png'
    
    # Директории для сохранения
    output_dirs = [
        base_dir / 'src' / 'assets' / 'favicons',
        base_dir / 'frontend' / 'public' / 'favicons',
    ]
    
    print("=" * 60)
    print("Генерация favicon и иконок из logo.png")
    print("=" * 60)
    
    if not source_logo.exists():
        print(f"❌ Файл не найден: {source_logo}")
        sys.exit(1)
    
    success = True
    for output_dir in output_dirs:
        print(f"\n📁 Обработка: {output_dir.relative_to(base_dir)}")
        if not generate_all_icons(str(source_logo), str(output_dir)):
            success = False
    
    # Также создаем favicon.ico в корне проекта и frontend/public
    root_dirs = [base_dir, base_dir / 'frontend' / 'public']
    for root_dir in root_dirs:
        favicon_ico = root_dir / 'favicon.ico'
        print(f"\n📁 Создание favicon.ico: {favicon_ico.relative_to(base_dir)}")
        if create_icon(str(source_logo), str(favicon_ico), 32, 'ICO'):
            pass
    
    print("\n" + "=" * 60)
    if success:
        print("✓ Готово! Все иконки созданы")
    else:
        print("⚠ Некоторые иконки не были созданы")
    print("=" * 60)

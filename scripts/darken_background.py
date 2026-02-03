#!/usr/bin/env python3
"""
Скрипт для затемнения фона изображений
Обрабатывает изображения, делая фон более темным и однородным
"""
import sys
import os
from pathlib import Path

try:
    from PIL import Image, ImageEnhance, ImageFilter
    HAS_PIL = True
except ImportError:
    print("❌ Pillow не установлен!")
    print("Установите: pip3 install Pillow")
    print("Или: python3 -m pip install Pillow")
    sys.exit(1)


def darken_background(image_path, output_path=None, darkness_factor=0.25):
    """
    Затемняет фон изображения, сохраняя основной объект ярким
    
    Args:
        image_path: путь к исходному изображению
        output_path: путь для сохранения (если None, создает backup и перезаписывает)
        darkness_factor: коэффициент затемнения (0.0 - полностью черный, 1.0 - без изменений)
    """
    try:
        img = Image.open(image_path)
        original_mode = img.mode
        
        # Конвертируем в RGBA для работы с прозрачностью
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Создаем backup если перезаписываем
        if output_path is None:
            backup_path = str(image_path).replace('.jpg', '_backup.jpg').replace('.png', '_backup.png')
            # Для backup сохраняем в исходном формате
            if image_path.lower().endswith('.jpg') or image_path.lower().endswith('.jpeg'):
                backup_img = img.convert('RGB') if img.mode != 'RGB' else img
                backup_img.save(backup_path, 'JPEG', quality=95)
            else:
                img.save(backup_path)
            output_path = image_path
            print(f"  Backup создан: {os.path.basename(backup_path)}")
        
        # Применяем затемнение ко всему изображению
        enhancer = ImageEnhance.Brightness(img)
        darkened = enhancer.enhance(darkness_factor)
        
        # Усиливаем контраст для лучшего выделения объекта
        contrast_enhancer = ImageEnhance.Contrast(darkened)
        final = contrast_enhancer.enhance(1.3)
        
        # Сохраняем результат
        # Для JPEG нужно конвертировать в RGB (без альфа-канала)
        if image_path.lower().endswith('.jpg') or image_path.lower().endswith('.jpeg'):
            if final.mode == 'RGBA':
                final = final.convert('RGB')
            final.save(output_path, 'JPEG', quality=95)
        elif image_path.lower().endswith('.ico'):
            # Для ICO конвертируем в RGB и сохраняем
            if final.mode == 'RGBA':
                final = final.convert('RGB')
            # Сохраняем ICO (PIL поддерживает ICO формат)
            try:
                final.save(output_path, 'ICO')
            except Exception:
                # Если не получилось сохранить как ICO, сохраняем как PNG
                output_path = str(output_path).replace('.ico', '.png')
                final.save(output_path, 'PNG', optimize=True)
        else:
            # Для PNG сохраняем как есть
            final.save(output_path, 'PNG', optimize=True)
        
        print(f"  ✓ Обработано: {os.path.basename(image_path)}")
        return True
        
    except Exception as e:
        print(f"  ✗ Ошибка при обработке {image_path}: {e}")
        return False


def process_directory(directory, darkness_factor=0.25):
    """Обрабатывает все изображения в директории"""
    image_extensions = {'.jpg', '.jpeg', '.png', '.ico'}
    processed_count = 0
    
    for ext in image_extensions:
        for img_path in Path(directory).rglob(f'*{ext}'):
            # Пропускаем только backup файлы
            img_str = str(img_path)
            if 'backup' in img_str.lower():
                continue
            
            if darken_background(str(img_path), darkness_factor=darkness_factor):
                processed_count += 1
    
    return processed_count


if __name__ == '__main__':
    # Пути к директориям с изображениями
    base_dir = Path(__file__).parent.parent
    assets_dirs = [
        base_dir / 'src' / 'assets',
        base_dir / 'frontend' / 'src' / 'assets',
        base_dir,  # Для favicon.ico в корне
        base_dir / 'frontend' / 'public',  # Для favicon.ico в public
    ]
    
    # Коэффициент затемнения (0.25 = фон будет на 75% темнее)
    darkness = 0.25
    
    print("=" * 60)
    print("Затемнение фона изображений")
    print("=" * 60)
    print(f"Коэффициент затемнения: {darkness} (фон будет на {int((1-darkness)*100)}% темнее)")
    print("-" * 60)
    
    total_processed = 0
    for assets_dir in assets_dirs:
        if assets_dir.exists():
            print(f"\n📁 Обработка: {assets_dir.relative_to(base_dir)}")
            count = process_directory(assets_dir, darkness_factor=darkness)
            total_processed += count
    
    print("\n" + "=" * 60)
    print(f"✓ Готово! Обработано изображений: {total_processed}")
    print("=" * 60)

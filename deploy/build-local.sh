#!/bin/bash
# Локальная сборка образов под linux/amd64 (для Mac → совместимо с VPS)
set -e
cd "$(dirname "$0")/.."
echo "Building for linux/amd64..."
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker compose build "$@"
echo "Done. Run: docker compose up -d"

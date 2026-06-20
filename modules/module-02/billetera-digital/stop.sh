#!/bin/bash

set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "🛑 Deteniendo sistema completo..."

docker compose -f "$ROOT/docker-compose.yml" down

echo "✅ Sistema detenido"
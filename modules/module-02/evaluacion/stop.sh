#!/bin/bash

set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"

COMPOSE_FILE="$ROOT/docker/docker-compose.yml"

echo "🛑 Deteniendo sistema completo..."

docker compose -f "$COMPOSE_FILE" down

echo "✅ Sistema detenido"
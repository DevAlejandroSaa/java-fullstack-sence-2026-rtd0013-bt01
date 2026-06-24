#!/bin/bash

set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"

COMPOSE_FILE="$ROOT/docker/docker-compose.yml"

echo "🚀 Levantando sistema completo..."

docker compose -f "$COMPOSE_FILE" up -d

echo "✅ Sistema levantado"
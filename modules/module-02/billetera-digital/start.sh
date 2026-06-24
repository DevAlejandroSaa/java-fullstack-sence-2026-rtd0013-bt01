#!/bin/bash

set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "🚀 Levantando sistema completo..."

docker compose -f "$ROOT/docker-compose.yml" up -d

echo "✅ Sistema levantado"
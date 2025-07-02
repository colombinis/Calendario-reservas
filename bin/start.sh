#!/bin/bash

# Script to start frontend, backend, or both for Calendario de Reservas
# Usage:
#   ./bin/start.sh            # Start both frontend and backend
#   ./bin/start.sh --backend  # Start only backend
#   ./bin/start.sh --frontend # Start only frontend

set -e

start_backend() {
  echo "[start.sh] Starting backend..."
  cd "$(dirname "$0")/../src/backend"
  npm install
  npm run dev &
  BACKEND_PID=$!
  cd - > /dev/null
}

start_frontend() {
  echo "[start.sh] Starting frontend..."
  cd "$(dirname "$0")/../src/frontend/my-front"
  npm install
  npm run dev &
  FRONTEND_PID=$!
  cd - > /dev/null
}

case "$1" in
  --backend)
    start_backend
    wait $BACKEND_PID
    ;;
  --frontend)
    start_frontend
    wait $FRONTEND_PID
    ;;
  ""|--both)
    start_backend
    start_frontend
    wait $BACKEND_PID $FRONTEND_PID
    ;;
  *)
    echo "Usage: $0 [--backend|--frontend|--both]"
    exit 1
    ;;
esac

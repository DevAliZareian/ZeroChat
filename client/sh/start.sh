#!/bin/bash
set -e

cd /app

echo "Installing dependencies..."
pnpm install --no-frozen-lockfile

echo "Building..."
pnpm run build

echo "Starting server on port ${PORT:-4173}..."
pnpm run preview --host 0.0.0.0 --port 4172
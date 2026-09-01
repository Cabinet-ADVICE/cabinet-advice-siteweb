#!/usr/bin/env bash
# Optional helper — manual steps in README are the primary deploy path.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env ]]; then
  echo "Error: .env not found. Run: cp .env.example .env && nano .env"
  exit 1
fi

# Load .env for validation (simple KEY=VALUE lines)
while IFS= read -r line || [[ -n "$line" ]]; do
  [[ "$line" =~ ^[[:space:]]*# ]] && continue
  [[ -z "${line// }" ]] && continue
  if [[ "$line" =~ ^([A-Za-z_][A-Za-z0-9_]*)=(.*)$ ]]; then
    export "${BASH_REMATCH[1]}=${BASH_REMATCH[2]}"
  fi
done < .env

if [[ -z "${VITE_SITE_URL:-}" ]]; then
  echo "Error: VITE_SITE_URL is not set in .env"
  exit 1
fi

if command -v npm >/dev/null 2>&1; then
  if [[ -f package-lock.json ]]; then
    npm ci
  else
    npm install
  fi
else
  echo "Error: npm not found"
  exit 1
fi

npm run build

echo "Build complete → dist/"
echo "Reload Apache only if apache.conf changed: sudo apache2ctl configtest && sudo systemctl reload apache2"

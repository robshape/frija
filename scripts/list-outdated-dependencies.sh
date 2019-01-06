#!/bin/bash
set -euo pipefail

echo "[*] LISTING OUTDATED DEPENDENCIES IN ./src/client/"
npm outdated --prefix ./src/client/ || true
echo

echo "[*] LISTING OUTDATED DEPENDENCIES IN ./src/server/"
npm outdated --prefix ./src/server/ || true
echo

echo "[*] LISTING OUTDATED DEPENDENCIES IN ./"
npm outdated || true
echo

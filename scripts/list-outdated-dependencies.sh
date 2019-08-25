#!/bin/bash
set -euo pipefail

echo "[*] LISTING OUTDATED CLIENT DEPENDENCIES"
npm outdated --prefix ./src/client/ || true
echo

echo "[*] LISTING OUTDATED SERVER DEPENDENCIES"
npm outdated --prefix ./src/server/ || true
echo

echo "[*] LISTING OUTDATED DEVELOPMENT DEPENDENCIES"
npm outdated || true
echo

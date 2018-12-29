#!/bin/bash
set -euo pipefail

echo "[*] CLEANING ./src/client/"
rm -fr ./src/client/node_modules/
rm -fr ./src/client/package-lock.json
echo

echo "[*] CLEANING ./src/server/"
rm -fr ./src/server/node_modules/
rm -fr ./src/server/package-lock.json
echo

echo "[*] CLEANING ./"
rm -fr ./node_modules/
rm -fr ./package-lock.json
echo

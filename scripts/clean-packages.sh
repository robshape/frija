#!/bin/bash
set -euo pipefail

echo "[*] Clean ./src/client/"
rm -fr ./src/client/node_modules/
rm -fr ./src/client/package-lock.json
echo

echo "[*] Clean ./src/server/"
rm -fr ./src/server/node_modules/
rm -fr ./src/server/package-lock.json
echo

echo "[*] Clean ./"
rm -fr ./node_modules/
rm -fr ./package-lock.json
echo

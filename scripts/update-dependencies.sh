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
rm -fr ./.cache-loader/
rm -fr ./dist/
rm -fr ./node_modules/
rm -fr ./package-lock.json
echo

echo "[*] UPDATING DEPENDENCIES"
npm install --prefix ./src/client/
npm install --prefix ./src/server/
npm install
echo

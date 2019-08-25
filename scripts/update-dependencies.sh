#!/bin/bash
set -euo pipefail

echo "[*] CLEANING CLIENT DEPENDENCIES"
rm -fr ./src/client/node_modules/
rm -fr ./src/client/package-lock.json
echo

echo "[*] CLEANING SERVER DEPENDENCIES"
rm -fr ./src/server/node_modules/
rm -fr ./src/server/package-lock.json
echo

echo "[*] CLEANING DEVELOPMENT DEPENDENCIES"
rm -fr ./.cache-loader/
rm -fr ./dist/
rm -fr ./node_modules/
rm -fr ./package-lock.json
echo

echo "[*] UPDATING CLIENT DEPENDENCIES"
npm install --prefix ./src/client/
echo

echo "[*] UPDATING SERVER DEPENDENCIES"
npm install --prefix ./src/server/
echo

echo "[*] UPDATING DEVELOPMENT DEPENDENCIES"
npm install
echo

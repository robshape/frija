#!/bin/bash
set -euo pipefail

echo "[*] INSTALLING CLIENT DEPENDENCIES"
cd ./src/client/
npm ci
cd ../../
echo

echo "[*] INSTALLING SERVER DEPENDENCIES"
cd ./src/server/
npm ci
cd ../../
echo

echo "[*] INSTALLING DEVELOPMENT DEPENDENCIES"
npm ci
echo

echo "[*] GENERATING CERTIFICATE"
openssl req -keyout server.key -new -nodes -out server.crt -subj '/CN=localhost' -x509
echo

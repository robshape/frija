#!/bin/bash
set -euo pipefail

echo "[*] INSTALLING CLIENT DEPENDENCIES"
npm ci --prefix ./src/client/
echo

echo "[*] INSTALLING SERVER DEPENDENCIES"
npm ci --prefix ./src/server/
echo

echo "[*] INSTALLING DEVELOPMENT DEPENDENCIES"
npm ci
echo

echo "[*] CREATING CERTIFICATE"
openssl req -keyout server.key -new -nodes -out server.crt -subj '/CN=localhost' -x509
echo

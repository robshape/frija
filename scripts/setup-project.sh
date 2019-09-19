#!/bin/bash
set -euo pipefail

echo "[*] INSTALLING DEPENDENCIES"
npm ci
npm run bootstrap
echo

echo "[*] CREATING CERTIFICATE"
openssl req -keyout server.key -new -nodes -out server.crt -subj '/CN=localhost' -x509
echo

echo "[*] BUILDING ETHEREUM PACKAGE"
npx lerna run --scope @frija/ethereum build
echo

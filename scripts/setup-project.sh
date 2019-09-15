#!/bin/bash
set -euo pipefail

echo "[*] INSTALLING DEPENDENCIES"
npm ci
npx lerna bootstrap --hoist
echo

echo "[*] CREATING CERTIFICATE"
openssl req -keyout server.key -new -nodes -out server.crt -subj '/CN=localhost' -x509
echo

echo "[*] BUILDING CONTRACTS"
npx lerna run --scope @frija/ethereum build
echo

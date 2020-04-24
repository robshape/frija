#!/bin/bash
set -euo pipefail

echo "[*] INSTALLING DEPENDENCIES"
npm ci
npm run bootstrap
echo

echo "[*] BUILDING ETHEREUM PACKAGE"
npx lerna run --scope @frija/ethereum build
echo

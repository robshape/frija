#!/bin/bash
set -euo pipefail

echo "[*] REMOVING DEPENDENCIES"
rm -fr ./node_modules/
rm -fr ./packages/client/node_modules/
rm -fr ./packages/ethereum/node_modules/
rm -fr ./packages/server/node_modules/
echo

echo "[*] INSTALLING DEPENDENCIES"
npm ci
npx lerna bootstrap
echo

echo "[*] LISTING OUTDATED DEPENDENCIES"
npx lerna exec --no-bail -- npm outdated || true
npm outdated || true
echo

echo "[*] REMOVING DEPENDENCIES"
rm -fr ./node_modules/
rm -fr ./packages/client/node_modules/
rm -fr ./packages/client/package-lock.json
rm -fr ./packages/ethereum/node_modules/
rm -fr ./packages/ethereum/package-lock.json
rm -fr ./packages/server/node_modules/
rm -fr ./packages/server/package-lock.json
echo

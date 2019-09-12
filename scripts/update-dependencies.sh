#!/bin/bash
set -euo pipefail

echo "[*] REMOVING DEPENDENCIES"
rm -fr ./node_modules/
rm -fr ./packages/client/node_modules/
rm -fr ./packages/ethereum/node_modules/
rm -fr ./packages/server/node_modules/
rm -fr ./package-lock.json
echo

echo "[*] UPDATING DEPENDENCIES"
npm install
npx lerna bootstrap --hoist
echo

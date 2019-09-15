#!/bin/bash
set -euo pipefail

echo "[*] UPDATING DEPENDENCIES"
rm -fr ./package-lock.json
npm install
npx lerna bootstrap --hoist
echo

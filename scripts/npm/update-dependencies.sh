#!/bin/bash
set -euo pipefail

echo "[*] UPDATING DEPENDENCIES"
rm -fr ./package-lock.json
npm install
npm run bootstrap
echo

echo "[*] UPDATING PACKAGE-LOCKS"
npx lerna exec --scope @frija/server -- npm install --only=production --package-lock-only
echo

#!/bin/bash
set -euo pipefail

echo "[*] UPDATING DEPENDENCIES"
rm -fr ./package-lock.json
npm install
npx lerna bootstrap --hoist
echo

echo "[*] UPDATING PACKAGE-LOCKS"
npx lerna exec --scope '{@frija/client,@frija/server}' -- npm install --only=production --package-lock-only
echo

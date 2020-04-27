#!/bin/bash
set -euo pipefail

echo "[*] ANALYZING LIGHTHOUSE"
npx start-server-and-test start:cluster http://localhost:8080/ analyze:lighthouse
echo

echo "[*] ANALYZING BUNDLE"
npx lerna run --scope @frija/client analyze:bundle
echo

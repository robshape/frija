#!/bin/bash
set -euo pipefail

echo "[*] STARTING CLUSTER"
docker-compose up --build
echo

echo "[*] STOPPING CLUSTER"
docker-compose down
echo

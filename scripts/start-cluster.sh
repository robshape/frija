#!/bin/bash
set -euo pipefail

echo "[*] STARTING CLUSTER"
docker-compose --file ./configs/docker-compose.yaml up --build
echo

echo "[*] STOPPING CLUSTER"
docker-compose --file ./configs/docker-compose.yaml down
echo

#!/bin/bash
set -euo pipefail

echo "[*] STARTING CLUSTER"
cp ./configs/.env.dev ./packages/client/configs/.env.prod
docker-compose --file ./configs/docker-compose.yml up
echo

echo "[*] STOPPING CLUSTER"
docker-compose --file ./configs/docker-compose.yml down
rm -fr ./packages/client/configs/.env.prod
echo

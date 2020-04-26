#!/bin/bash
set -euo pipefail

echo "[*] COMPOSING DOCKER"
cp ./configs/.env.dev ./packages/client/configs/.env.prod
docker-compose --file ./configs/docker-compose.yml up
echo

echo "[*] DECOMPOSING DOCKER"
docker-compose --file ./configs/docker-compose.yml down
rm -fr ./packages/client/configs/.env.prod
echo

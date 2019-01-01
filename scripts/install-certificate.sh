#!/bin/bash
set -euo pipefail

echo "[*] INSTALLING CERTIFICATE"
openssl req -keyout server.key -new -nodes -out server.crt -subj "/CN=localhost" -x509
echo

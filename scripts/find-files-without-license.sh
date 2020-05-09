#!/bin/bash
set -euo pipefail

echo "[*] FINDING FILES WITHOUT LICENSE"
FILES_WITHOUT_LICENSE=$(find ./ -type f \( -name "*.js" -or -name "*.jsx" -or -name "*.scss" -or -name "*.sol" \) -not -path "*/node_modules/*" -exec grep --files-without-match "GNU General Public License" {} \;)

if [ -n "$FILES_WITHOUT_LICENSE" ]; then
  echo "$FILES_WITHOUT_LICENSE"
  echo
  exit 1
fi
echo

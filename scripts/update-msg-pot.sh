#!/usr/bin/env bash
set -Eeuo pipefail

MDBOOK_OUTPUT='{"xgettext": {}}' mdbook build -d po
echo "Updated po/messages.pot file"

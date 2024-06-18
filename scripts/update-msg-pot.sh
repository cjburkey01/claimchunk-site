#!/bin/bash

MDBOOK_OUTPUT='{"xgettext": {}}' mdbook build -d po
echo "Updated po/messages.pot file"

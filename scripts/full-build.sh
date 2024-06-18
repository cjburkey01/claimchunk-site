#!/bin/bash

# This script will build the main English website as well as the website for
# other languages inside the `po` directory.

# Build english
echo "Building English"
sh scripts/single-build.sh en book/

# Build the rest
for lang in po/*.po; do
  # Make sure the file exists.
  # `shopt -s nullglob` isn't working with GitHub Actions :/
  if ! test -f $lang; then
    continue
  fi

  # Filename
  b=$(basename -- "$lang")
  # Without extension
  lang_name="${b%.*}"
  echo "Building $lang_name from $lang"
  # Delegate :)
  sh scripts/single-build.sh $lang_name "book/$lang_name/"
done

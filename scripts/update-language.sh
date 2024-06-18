# Usage: update-language.sh <2ish character identifier>

lang=${1:?"Usage: $0 <language identifier>"}

lang_file="po/$lang.po"

if ! test -f $f; then
  echo "Language file does not exist at $lang_file"
  exit 1
fi

sh scripts/update-msg-pot.sh
msgmerge --update $lang_file po/messages.pot
echo "Updated language file at $out_file"

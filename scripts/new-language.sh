# Usage: new-language.sh <2ish character identifier>

lang=${1:?"Usage: $0 <language identifier>"}
lang_file="po/$lang.po"

if test -f $lang_file; then
  echo "Language file already exists at $lang_file"
  exit 1
fi

sh scripts/update-msg-pot.sh
msginit -i po/messages.pot -l $lang -o $lang_file
echo "Created language file at $lang_file"

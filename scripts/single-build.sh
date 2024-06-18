# Usage: single-build.sh <book-lang> <dest-dir>

book_lang=${1:?"Usage: $0 <book-lang> <dest-dir>"}
dest_dir=${2:?"Usage: $0 <book-lang> <dest-dir>"}

if [ "$book_lang" = "en" ]; then
    echo "::group::Building English site"
else
    echo "::group::Building $book_lang site"

    # Set language and adjust site URL. Clear the redirects since they are
    # in sync with the source files, not the translation.
    export MDBOOK_BOOK__LANGUAGE=$book_lang
    export MDBOOK_OUTPUT__HTML__SITE_URL=/$book_lang/
    export MDBOOK_OUTPUT__HTML__REDIRECT='{}'
fi

mdbook build -d "$dest_dir"

echo "::endgroup::"

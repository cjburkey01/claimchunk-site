# claimchunk-site

The [ClaimChunk](https://github.com/cjburkey01/ClaimChunk) website.

### Setup

#### Install

You'll need the [mdbook](https://github.com/rust-lang/mdBook) and [mdbook-i18n-helpers](https://github.com/google/mdbook-i18n-helpers) crates to build this :)

1) Install [Rust language development](https://www.rust-lang.org/tools/install) binaries (I recommend via Rustup, but it's up to you).
2) Install mdbook using `cargo install mdbook`
   - You can download binaries directly from their [GitHub](https://github.com/rust-lang/mdBook/releases) for your operating system, but step 3 requires cargo anyway.
3) Install mdbook-i18n-helpers with `cargo install mdbook-i18n-helpers`
4) Install GNU Gettext utilities for your operating system:
   - Mac: `brew install gettext`
   - Windows: Precompiled binaries available [via this link](https://mlocati.github.io/articles/gettext-iconv-windows.html).
   - Linux: `apt install gettext` (Forget if you need sudo, give it a shot without for single user binaries)

For the following snippets, I'll assume a bash system. If you use Windows, you will have to modify the way you set environment variables. You can't set them same-line (as easily), so replace things like
```bash
MDBOOK_OUTPUT='{"xgettext": {}}' mdbook build -d po
```
with (note the escapes):
```bat
set "MDBOOK_OUTPUT='{\"xgettext\": {}}'" && mdbook build -d po
``` 

#### Generating a PO file for a new language

So those are the dependencies, now to get started. I first recommend reading the [USAGE.md file](https://github.com/google/mdbook-i18n-helpers/blob/main/i18n-helpers/USAGE.md) for the mdbook-i18n-helpers crate.

(Make sure your working directory is the claimchunk-site main directory)

1) Generate manually:
   1) Use the following line to generate the `po/messages.pot` file, containing all the unlocalized strings for translation.
       ```bash
       MDBOOK_OUTPUT='{"xgettext": {}}' mdbook build -d po
       ```
   2) Use this command to copy that template file for your specified language (replace XX with the 2ish character identifier for the language):
       ```bash
       msginit -i po/messages.pot -l XX -o po/XX.po
       ```
2) Or automatically:
   ```bash
   sh scripts/new-language.sh XX
   ```

#### Updating your PO file after new English content

If new content is added to the central English version of the site, you can run this command to merge the new content into your pre-existing translations.
```bash
MDBOOK_OUTPUT='{"xgettext": {}}' mdbook build -d po
msgmerge --update po/XX.po po/messages.pot
```
or
```bash
sh scripts/update-language.sh XX
```

### Translating

I **highly** recommend using a dedicated editor for PO files to prevent syntax errors. [pofile.net](https://pofile.net/) has a free in-browser editor so you don't need to install anything, and [poedit.net](https://poedit.net/) is a good alternative application (Pro plan is unnecessary).

Simply open up the `XX.po` file in the `/po` directory for your specific language using one of those (or a different) editor and translate the source material to your language :) If you need any help getting this set up or translating, feel free to reach out via [our Discord](https://discord.gg/swW8xX665Z) or submit an issue on this repository.

Changes to those file can be submitted via pull request and I'll add them to the language menu! 

### Seeing your translations

To generate the translations and build the book, you can run:
```bash
sh scripts/single-build.sh <FEW_LETTER_LANG_IDENTIFER> <OUTPUT_DIR>
```

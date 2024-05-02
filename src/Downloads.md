# Downloads

There are two channels from which to download ClaimChunk. The release channel is the current stable version of ClaimChunk. This version _should_ be safe to use for larger servers. The snapshot channel, however, provides a new build for the changes to the [ClaimChunk repository](https://github.com/cjburkey01/ClaimChunk) since the latest release. This means they may have less testing, but it may be useful if bugs exist in the latest release or you want some features that have yet to be pushed to a release.

<script src="https://unpkg.com/htmx.org@1.9.12" integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2" crossorigin="anonymous"></script>
<script>
document.body.addEventListener('htmx:configRequest', function(event) {
    event.detail.headers = ''
    event.detail.headers['Content-Type'] = "application/x-www-form-urlencoded; charset=UTF-8"
});
</script>

## Release Downloads

The following downloads are considered stable downloads, or releases.

<div
    hx-get="https://cjburkey.com/claimchunk-api/releases.php"
    hx-trigger="load"
    hx-swap="innerHTML"
>
    <i>Please wait... &verbar; Loading...</i>
</div>

## Snapshot Downloads

These downloads _might_ be less stable than the release downloads, but have more recent features and bug fixes.

To make these downloads available, we use a handy-dandy link service called <a href="https://nightly.link/" target="_blank" title="nightly.link GitHub link service">nightly.link</a> to make getting GitHub artifact download links possible.

After 30 days, GitHub deletes these artifacts; if you want to compile an older, non-release version that isn't listed here, please clone the repository at the preferred commit and build from source.

<div
    hx-get="https://cjburkey.com/claimchunk-api/artifacts.php"
    hx-trigger="load"
    hx-swap="innerHTML"
>
    <i>Please wait... &verbar; Loading...</i>
</div>

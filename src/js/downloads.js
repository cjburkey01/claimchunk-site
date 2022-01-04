window.onload = function() {
    let release_downloads_div = document.getElementById('release_downloads');
    let snapshot_downloads_div = document.getElementById('snapshot_downloads');

    // Populate the releases table
    if (!!release_downloads_div) {
        const releases_endpoint = 'https://api.github.com/repos/cjburkey01/ClaimChunk/releases';

        console.log('Requesting available release downloads from GitHub...');
        fetch(releases_endpoint)
            .then(response => response.json())
            .then(data => populate_release_downloads(data, release_downloads_div));
    }

    // Populate the snapshot table
    if (!!snapshot_downloads_div) {
        const snapshot_artifacts_endpoint = 'https://api.github.com/repos/cjburkey01/ClaimChunk/actions/artifacts';
        const snapshot_download_endpoint =
            (artifact_id) => `https://nightly.link/cjburkey01/ClaimChunk/actions/artifacts/${artifact_id}.zip`;
        const snapshot_commits_endpoint = 'https://api.github.com/repos/cjburkey01/ClaimChunk/commits';

        // Create promises for the data we need
        console.log('Requesting available snapshot downloads and associated data from GitHub...');
        let snapshot_artifacts_promise = fetch(snapshot_artifacts_endpoint).then(response => response.json());
        let snapshot_commits_promise = fetch(snapshot_commits_endpoint)
            .then(response => response.json())
            .then(data
                => data.reduce((commitMap, commit) => commitMap.set(commit.sha, { message: commit.commit.message, date: new Date(commit.commit.author.date) }), new Map()));

        // Use them both
        Promise
            .all([ snapshot_artifacts_promise, snapshot_commits_promise ])
            .then(data => populate_snapshot_downloads(data[0], data[1], snapshot_downloads_div, snapshot_download_endpoint));
    }
};

function populate_release_downloads(data, release_downloads_div, release_download_endpoint) {
    if (!data) {
        release_downloads_div.textContent = 'Failed to request release downloads from GitHub';
        return;
    }

    release_downloads_div.textContent = '';

    // Create the table
    let finalTable = release_downloads_div.appendChild(document.createElement('table'));

    // Create the table head
    let tableHead = finalTable.appendChild(document.createElement('tr'));
    let release_date_th = document.createElement('th');
    let download_link_th = document.createElement('th');

    // Update DOM
    tableHead.appendChild(release_date_th);
    tableHead.appendChild(download_link_th);
    release_date_th.textContent = 'Release Date';
    download_link_th.textContent = 'Release Version';

    // Sort artifacts by date
    data.sort(function (a,b) {
        return new Date(b.created_at) - new Date(a.created_at);
    });

    // Create the table body
    data.forEach(release => {
        // Skip stuff with missing things
        if (!release.published_at || !release.name || !release.html_url) return;

        // Create elements
        let table_row = document.createElement('tr');
        let release_date = document.createElement('td');
        let download_link = document.createElement('td');
        let link_a = document.createElement('a');

        // Update DOM
        download_link.appendChild(link_a);
        table_row.appendChild(release_date);
        table_row.appendChild(download_link);
        finalTable.appendChild(table_row);

        // Update elements
        release_date.textContent = new Date(release.published_at).toLocaleDateString();
        link_a.textContent = release.name;
        link_a.setAttribute('href', release.html_url);
        link_a.setAttribute('title', `Download ClaimChunk release ${release.name}`);
    });

    console.log('Populated release downloads from GitHub');
}

function populate_snapshot_downloads(artifactData, commitData, snapshot_downloads_div, snapshot_download_endpoint) {
    if (!artifactData || !artifactData.artifacts) {
        snapshot_downloads_div.textContent = 'Failed to request snapshot downloads from GitHub';
        return;
    }

    snapshot_downloads_div.textContent = '';

    // Create the table
    let finalTable = snapshot_downloads_div.appendChild(document.createElement('table'));

    // Create the table head
    let tableHead = finalTable.appendChild(document.createElement('tr'));
    let release_date_th = document.createElement('th');
    let download_link_th = document.createElement('th');
    let description_th = document.createElement('th');

    // Update DOM
    tableHead.appendChild(release_date_th);
    tableHead.appendChild(download_link_th);
    tableHead.appendChild(description_th);
    release_date_th.textContent = 'Artifact Build Date';
    download_link_th.textContent = 'Download Links';
    description_th.textContent = 'Description';

    // Sort artifacts by date
    artifactData.artifacts.sort(function (a,b) {
        return new Date(b.created_at) - new Date(a.created_at);
    });

    // Create the table body
    artifactData.artifacts.forEach(artifact => {
        // Skip stuff with missing things
        if (!artifact.created_at || !artifact.id) return;

        // Create elements
        let table_row = document.createElement('tr');
        let release_date = document.createElement('td');
        let download_link = document.createElement('td');
        let link_a = document.createElement('a');
        let description = document.createElement('td');

        // Update DOM
        download_link.appendChild(link_a);
        table_row.appendChild(release_date);
        table_row.appendChild(download_link);
        table_row.appendChild(description);
        finalTable.appendChild(table_row);

        // Find the closest commit to the artifact creation date
        let artifactDate = new Date(artifact.created_at);
        let artifactCommitDateDiff = Number.MAX_SAFE_INTEGER - 10;  // Big num
        let correctDescription = '-';
        commitData.forEach((commit, sha, map) => {
            let dateDiff = Math.abs(artifactDate.getTime() - commit.date.getTime());
            if (dateDiff < artifactCommitDateDiff) {
                artifactCommitDateDiff = dateDiff;
                correctDescription = commit.message;
            }
        });

        // Update elements
        release_date.textContent = artifactDate.toLocaleDateString();
        link_a.textContent = artifact.id;
        link_a.setAttribute('href', snapshot_download_endpoint(artifact.id));
        link_a.setAttribute('title', `Download artifact id ${artifact.id}`);
        description.textContent = correctDescription;
    });

    console.log('Populated snapshot downloads from GitHub');
}

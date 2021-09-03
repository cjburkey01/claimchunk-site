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

        console.log('Requesting available snapshot downloads from GitHub...');
        fetch(snapshot_artifacts_endpoint)
            .then(response => response.json())
            .then(data => populate_snapshot_downloads(data, snapshot_downloads_div, snapshot_download_endpoint));
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

function populate_snapshot_downloads(data, snapshot_downloads_div, snapshot_download_endpoint) {
    if (!data || !data.artifacts) {
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

    // Update DOM
    tableHead.appendChild(release_date_th);
    tableHead.appendChild(download_link_th);
    release_date_th.textContent = 'Artifact Build Date';
    download_link_th.textContent = 'Artifact Unique Build ID';

    // Sort artifacts by date
    data.artifacts.sort(function (a,b) {
        return new Date(b.created_at) - new Date(a.created_at);
    });

    // Create the table body
    data.artifacts.forEach(artifact => {
        // Skip stuff with missing things
        if (!artifact.created_at || !artifact.id) return;

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
        release_date.textContent = new Date(artifact.created_at).toLocaleDateString();
        link_a.textContent = artifact.id;
        link_a.setAttribute('href', snapshot_download_endpoint(artifact.id));
        link_a.setAttribute('title', `Download artifact id ${artifact.id}`);
    });

    console.log('Populated snapshot downloads from GitHub');
}

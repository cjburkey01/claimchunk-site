window.onload = function() {
    let release_downloads_div = document.getElementById('release_downloads');
    let snapshot_downloads_div = document.getElementById('snapshot_downloads');

    // Populate the snapshot table
    if (!!snapshot_downloads_div) {
        const snapshot_downloads_api_url = 'https://api.github.com/repos/cjburkey01/ClaimChunk/actions/artifacts';

        console.log('Requesting available snapshot downloads from GitHub...');
        fetch(snapshot_downloads_api_url)
            .then(response => response.json())
            .then(data => populate_snapshot_downloads(data, snapshot_downloads_div));
    }
};

function populate_snapshot_downloads(data, snapshot_downloads_div) {
    if (!data || !data.artifacts) {
        snapshot_downloads_div.content('Failed to request snapshot downloads from GitHub');
        return;
    }

    snapshot_downloads_div.textContent = '';

    // Create the table
    let finalTable = snapshot_downloads_div.appendChild(document.createElement('table'));

    // Create the table head
    let tableHead = finalTable.appendChild(document.createElement('tr'));
    let release_date_th = document.createElement('th');
    let download_link_th = document.createElement('th');
    tableHead.appendChild(release_date_th);
    tableHead.appendChild(download_link_th);
    release_date_th.textContent = 'Release Date';
    download_link_th.textContent = 'Download Link';

    // Sort artifacts by date
    data.artifacts.sort(function (a,b) {
        return new Date(b.created_at) - new Date(a.created_at);
    });

    // Create the table body
    data.artifacts.forEach(artifact => {
        console.log(data.artifacts);

        // Skip stuff with missing things
        if (!artifact.created_at || !artifact.archive_download_url) return;

        // Create elements
        let table_row = document.createElement('tr');
        let release_date = document.createElement('td');
        let download_link = document.createElement('td');
        let link_a = document.createElement('a');

        // TODO: FINISH GETTING URL

        // Update elements
        release_date.textContent = new Date(artifact.created_at).toLocaleDateString();
        link_a.textContent = artifact.artifact_id;
        link_a.setAttribute('href', artifact.archive_download_url);
        download_link.appendChild(link_a);
        table_row.appendChild(release_date);
        table_row.appendChild(download_link);

        finalTable.appendChild(table_row);
    });

    console.log('Populated snapshot downloads from GitHub');
}

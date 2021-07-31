window.onload = function() {
    let release_downloads_div = document.getElementById('release_downloads');
    let snapshot_downloads_div = document.getElementById('snapshot_downloads');

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

    // Create the table
    let finalTable = snapshot_downloads_div.appendChild(document.createElement('table'));

    let col1 = document.createElement('td');
    col1.textContent = 'Hello!';

    let tableHead = finalTable.appendChild(document.createElement('th'));
    tableHead.appendChild(col1)

    for (artifact in data.artifacts) {

    }

    console.log('Populated snapshot downloads from GitHub');
}

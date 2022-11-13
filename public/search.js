const api_key = 'e4fc8660e1c281125ef85d582f8ff4f3'

const search_input = document.getElementById("serach_input")
const search_form = document.getElementById("search_form")
const search_list_artist = document.getElementById("search_list_artist")
const search_list_album = document.getElementById("search_albums_artist")
const search_albums_track = document.getElementById("search_albums_track")
const empty_image = "images/player_default_album.png"
/** Functions clear the body of lists. */
function clearArtistList() {
    search_list_artist.innerHTML = ''
}
function clearAlbumList() {
    search_list_album.innerHTML = ''
}
function clearTrackList() {
    search_albums_track.innerHTML = ''
}

function handleError(err) {
    console.log("error: ", err)
}

/** Functions for working with the API last.fm */
async function searchArtist() {
    const resp = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${search_input.value}&limit=20&api_key=${api_key}&format=json`)
    try {
        if (resp.status === 200) {
            const data = await resp.json()
            return data;
        }
        else
            throw new Error('response.status for searchArtist != 200 with error', response.Error);
    } catch (err) {
        handleError(err);
    }
}
async function searchAlbum() {
    const resp = await fetch(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${search_input.value}&limit=20&api_key=${api_key}&format=json`)
    try {
        if (resp.status === 200) {
            const data = await resp.json()
            return data;
        }
        else
            throw new Error('response.status for searchAlbum != 200 with error', response.Error);
    } catch (err) {
        handleError(err);
    }
}
async function searchTrcak() {
    const resp = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${search_input.value}&limit=20&api_key=${api_key}&format=json`)
    try {
        if (resp.status === 200) {
            const data = await resp.json()

            return data;
        }
        else
            throw new Error('response.status for searchTrcak != 200 with error', response.Error);
    } catch (err) {
        handleError(err);
    }
}
async function trackInfo(element) {
    const resp = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${api_key}&limit=5&artist=${element.artist}&track=${element.name}&format=json`)
    try {
        if (resp.status === 200) {
            const data = await resp.json()
            return data;
        }
        else
            throw new Error('response.status for trackInfo != 200 with error', response.Error);
    } catch (err) {
        handleError(err);
    }
}
async function artistAlbums(element) {
    try {
        const resp = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=${element.mbid}&limit=5&api_key=${api_key}&format=json`)

        if (resp.status === 200) {
            const data = await resp.json()
            return data;
        }
        else
            throw new Error('response.status for artistAlbums != 200 with error', response.Error);
    } catch (err) {
        handleError(err);
    }
}

/** Functions for adding elements to the page. */
function addArtistItem(item, image) {
    const item_artist_templ = `
    <div class="grid-item">
        <div class="card">
            <div class="card_info">
                <h2>${item.name}</h2>
            </div>
            <div class="pickgradient">
                <img src=${image} alt="user-image">
            </div>
        </div>
    </div>`
    search_list_artist.insertAdjacentHTML('beforeend', item_artist_templ)
}
function addAlbumsItem(item, image) {
    const item_artist_templ = `
    <div class="grid-item">
        <div class="card">
            <div class="card_info">
                <h2>${item.name}</h2>
            </div>
            <div class="pickgradient">
                <img src=${image} alt="user-image">
            </div>
        </div>
    </div>`
    search_list_album.insertAdjacentHTML('beforeend', item_artist_templ)
}
function addTrackItem(item, image) {
    const item_artist_templ = `
    <tr class="table-tracks-row">
        <td class="table-tracks-image">
            <img src=${image} alt="user-image">
        </td>
        <td class="table-tracks-artist">
            ${item.artist.name}
        </td>
        <td class="table-tracks-track">
            ${item.name}
        </td>
    </tr>`
    search_albums_track.insertAdjacentHTML('beforeend', item_artist_templ)
}

/** form callback **/
search_form.addEventListener('submit', (async event => {
    event.preventDefault();
    const artistsList = await searchArtist();
    const albumsList = await searchAlbum();
    const tracksList = await searchTrcak()

    clearArtistList()
    artistsList.results.artistmatches.artist.slice(0, 6).forEach(async element => {
        const artistAlbumsData = await artistAlbums(element)
        image = artistAlbumsData.topalbums?.album[0]?.image[3]['#text'];
        if (image != null)
            addArtistItem(element, artistAlbumsData.topalbums.album[0].image[3]['#text'])
        else
            addArtistItem(element, empty_image)
    });

    clearAlbumList()
    albumsList.results.albummatches.album.slice(0, 6).forEach(async element => {
        addAlbumsItem(element, element.image[3]['#text'])
    });

    clearTrackList()
    tracksList.results.trackmatches.track.slice(0, 6).forEach(async element => {
        const trackInfoData = await trackInfo(element)
        console.log(trackInfoData)
        if (trackInfoData !== undefined && trackInfoData.error === undefined) {
            image = trackInfoData.album?.image[3]['#text'];
            if (image != null)
                addTrackItem(trackInfoData.track, image)
            else
                addTrackItem(trackInfoData.track, empty_image)
        }
    });
}))
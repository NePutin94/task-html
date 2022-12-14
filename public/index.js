const api_key = 'e4fc8660e1c281125ef85d582f8ff4f3'
const mus_list = document.getElementById("list_top_mus")
const artist_list = document.getElementById("list_top_artist")
const empty_image = "images/player_default_album.png"

function handleError(err) {
  alert("error: ", err);
}

function slice_str(str) {
  if (str.length > 72)
    return str.slice(0, 72) + "..."
  else
    return str
}

/** Functions for adding elements to the page. */
function addMusItem(item) {
  var tags = ""
  item.toptags.tag.slice(0, 3).forEach(element => {
    tags += `<div class="tag"><a href="${element.url}">${element.name}<a></div>`
  })
  const item_mus_templ = `<div class="grid-item">
                            <div class="card">
                              <div class="card_img">
                                <img src=${item.album.image[2]['#text']} alt="user-image">
                              </div>
                              <div class="card_info">
                                <h2>${slice_str(item.name)}</h2>
                                <p>${slice_str(item.artist.name)}</p>
                                <p class="grayout">Play count: ${item.playcount}<p>
                                <div class="card_info_tag">
                                ${tags}
                                </div>
                              </div>
                            </div>
                        </div>`
  mus_list.insertAdjacentHTML('beforeend', item_mus_templ)
}
function addArtistItem(item, image) {
  const item_artist_templ = `<div class="grid-item">
                                <div class="card">
                                  <div class="card_img">
                                    <img src=${image} alt="user-image">
                                  </div>
                                  <div class="card_info">
                                    <h2>${slice_str(item.name)}</h2>
                                    <p class="grayout">Listeners: ${item.listeners}<p>
                                  </div>
                                </div>
                            </div>`
  artist_list.insertAdjacentHTML('beforeend', item_artist_templ)
}

function onlyUniqueTopTracks(value, index, self) {
  return self.findIndex(item => item.artist.name == value.artist.name) === index;
}

/** Functions for working with the API last.fm */
async function fetchMusList() {
  const resp = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${api_key}&format=json`)
  try {
    if (resp.status === 200) {
      const data = await resp.json()
      const filtered = data.tracks.track.filter(onlyUniqueTopTracks);
      return filtered
    }
    else
      throw new Error('response.status for fetchMusList != 200 with error', response.Error);
  } catch (err) {
    handleError(err);
  }
}
async function fetchArtistList() {
  const resp = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${api_key}&format=json`)
  try {
    if (resp.status === 200) {
      const data = await resp.json()
      return data
    }
    else
      throw new Error('response.status for fetchArtistList != 200 with error', response.Error);
  } catch (err) {
    handleError(err);
  }
}
async function trackInfo(element) {
  const resp = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${api_key}&artist=${element.artist.name}&track=${element.name}&format=json`)
  try {
    if (resp.status === 200) {
      const trackInfoData = await resp.json()
      return trackInfoData
    }
    else
      throw new Error('response.status for trackInfo != 200 with error', response.Error);
  } catch (err) {
    handleError(err);
  }
}
async function artistAlbums(element) {
  const resp = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=${element.mbid}&limit=5&api_key=${api_key}&format=json`)
  try {
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

/** loading data from last.fm */
async function main() {
  const musList = await fetchMusList()
  const artistList = await fetchArtistList()

  artistList.artists.artist.slice(0, 6).forEach(async element => {
    const artistAlbumsData = await artistAlbums(element)
    image = artistAlbumsData.topalbums?.album[0]?.image[3]['#text'];
    if (image != null)
      addArtistItem(element, image)
    else
      addArtistItem(element, empty_image)
  });

  musList.slice(0, 6)
    .forEach(async element => {
      const trackInfoData = await trackInfo(element)
      addMusItem(trackInfoData.track)
    });
}

main()
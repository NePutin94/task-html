import React from 'react';

const api_key = 'e4fc8660e1c281125ef85d582f8ff4f3'
const empty_image = "images/player_default_album.png"

/* types of data from queries */
export type Image = { text: string }[];
export type Tag = { name: string, url: string }[];
export type Artist = { name: string, url: String, album: Album | null }[];
export type Album = { artist: string, title: String, image: Image[] }[];
export type Music = { name: string, duration: number, playcount: Number, listeners: Number, url: String, artist: Artist }[];
export type Track = { name: string, duration: number, playcount: Number, listeners: Number, url: String, artist: Artist, album: Album, toptags: Tag, image: Image[] }[];

/* default error handler */
export function handleError(err) {
    alert("error: " + err);
}

/* truncates strings that are longer than 72 */
export function slice_str(str) {
    if (str.length > 72)
        return str.slice(0, 72) + "..."
    else
        return str
}

/* filters for queries */
export function notUndefinedTrack(element) {
    return element !== undefined && element.hasOwnProperty('album') && element.hasOwnProperty('toptags');
}

export function notUndefinedTrackSearch(element) {
    return element !== undefined;
}

export function notUndefinedArtist(element) {
    return element !== undefined;
}

export function onlyUniqueTopTracks(value, index, self) {
    return self.findIndex(item => item.artist.name == value.artist.name) === index;
}

/* api requests last.fm */
export async function fetchMusList() {
    const resp = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${api_key}&format=json`)
    try {
        if (resp.status === 200) {
            const data = await resp.json()
            const filtered = data.tracks.track.filter(onlyUniqueTopTracks);
            return filtered
        }
        else
            throw new Error('response.status for fetchMusList != 200 with error' + resp);
    } catch (err) {
        handleError(err);
    }
}

export async function trackInfo(element) {
    const resp = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${api_key}&artist=${element.artist.name}&track=${element.name}&format=json`)
    try {
        if (resp.status === 200) {
            const trackInfoData = await resp.json()
            return trackInfoData
        }
        else
            throw new Error('response.status for trackInfo != 200 with error' + resp);
    } catch (err) {
        handleError(err);
    }
}

export async function trackInfoSearch(element) {
    const resp = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${api_key}&artist=${element.artist}&track=${element.name}&format=json`)
    try {
        if (resp.status === 200) {
            const trackInfoData = await resp.json()
            return trackInfoData
        }
        else
            throw new Error('response.status for trackInfo != 200 with error' + resp);
    } catch (err) {
        handleError(err);
    }
}

export async function fetchArtistList() {
    const resp = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${api_key}&format=json`)
    try {
        if (resp.status === 200) {
            const data = await resp.json()
            return data
        }
        else
            throw new Error('response.status for fetchArtistList != 200 with error' + resp);
    } catch (err) {
        handleError(err);
    }
}

export async function fetchArtistAlbums(element) {
    const resp = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=${element.mbid}&limit=5&api_key=${api_key}&format=json`)
    try {
        if (resp.status === 200) {
            const data = await resp.json()
            return data;
        }
        else
            throw new Error('response.status for artistAlbums != 200 with error' + resp);
    } catch (err) {
        handleError(err);
    }
}


export async function searchArtist(value) {
    const resp = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${value}&limit=20&api_key=${api_key}&format=json`)
    try {
        if (resp.status === 200) {
            const data = await resp.json()
            return data;
        }
        else
            throw new Error('response.status for searchArtist != 200 with error' + resp);
    } catch (err) {
        handleError(err);
    }
}

export async function searchAlbum(value) {
    const resp = await fetch(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${value}&limit=20&api_key=${api_key}&format=json`)
    try {
        if (resp.status === 200) {
            const data = await resp.json()
            return data;
        }
        else
            throw new Error('response.status for searchAlbum != 200 with error' + resp);
    } catch (err) {
        handleError(err);
    }
}

export async function searchTrcak(value) {
    const resp = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${value}&limit=28&api_key=${api_key}&format=json`)
    try {
        if (resp.status === 200) {
            const data = await resp.json()

            return data;
        }
        else
            throw new Error('response.status for searchTrcak != 200 with error' + resp);
    } catch (err) {
        handleError(err);
    }
}

/* checking for the existence of an image, 
   if it does not exist, output the default stub */
export function checlImage(value) {
    let image = value.album?.album[0]?.image[3]['#text'];
    if (image != null)
        return image
    else
        return empty_image
}

export function checImageAlbum(value) {
    let image = value.image[3]['#text']
    if (image != null)
        return image
    else
        return empty_image
}

export function checImageTrack(value) {
    let image = value.image
    if (image !== undefined && image != null)
        return image
    else
        return empty_image
}


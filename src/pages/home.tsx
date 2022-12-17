import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { checlImage, fetchArtistAlbums, fetchArtistList, fetchMusList, notUndefinedArtist, notUndefinedTrack, slice_str, Track, trackInfo } from "../api";

/* Auxiliary layout for the list of musics tag */
const TagListItem = ({ tag }) => (
    <div className="tag"><a href={tag.url}>{tag.name}</a></div>
);

/* Auxiliary layout for the list of music item */
const MusListItem = ({ item }) => (
    <div className="grid-item">
        <div className="card_mus">
            <div className="card_img">
                <img src={item.album.image[2]['#text']} alt="user-image" />
            </div>
            <div className="card_info">
                <h2>{slice_str(item.name)}</h2>
                <p>{slice_str(item.artist.name)}</p>
                <p className="grayout">Play count: {item.playcount}</p>
                <div className="card_info_tag">
                    {item.toptags.tag.slice(0, 3).map(tag => (<TagListItem key={tag.name} tag={tag} />))}
                </div>
            </div>
        </div>
    </div>
);

/* Auxiliary layout for the list of musics */
function MusicList() {
    const [state, setState] = useState<Track>([]);
    useEffect(() => {
        const dataFetch = async () => {
            let musList = await fetchMusList()

            let data = await Promise.all(musList.map(async (element) => {
                return (await trackInfo(element)).track
            }))

            data = data.filter(notUndefinedTrack).slice(0, 6)

            setState(data);
        };
        dataFetch();
    }, []);

    return (
        <div className="grid-container">
            {state?.map(item => (
                <MusListItem key={item.name} item={item} />
            ))}
        </div>
    );
}

/* Auxiliary layout for the list of artist item */
const ArtistListItem = ({ item, image }) => (
    <div className="grid-item">
        <div className="card_artist">
            <div className="card_img">
                <img src={image} alt="user-image" />
            </div>
            <div className="card_info">
                <h2>{slice_str(item.name)}</h2>
                <p className="grayout">Listeners: {item.listeners}</p>
            </div>
        </div>
    </div>
);

/* Auxiliary layout for the list of artists */
function ArtistList() {
    const [state, setState] = useState<Track>([]);
    useEffect(() => {
        const dataFetch = async () => {
            let artistList = await fetchArtistList()

            let data = await Promise.all(artistList.artists.artist.slice(0, 6).map(async element => {
                const artistAlbumsData = await fetchArtistAlbums(element)
                element.album = artistAlbumsData.topalbums
                return element
            }))

            data = data.filter(notUndefinedArtist).slice(0, 6)
            setState(data);
        };
        dataFetch();
    }, []);

    return (
        <div className="grid-container">
            {state.map(item => (
                <ArtistListItem key={item.name} item={item} image={checlImage(item)} />
            ))}
        </div>
    );
}

/* Layout of a page with a list of popular music and artists */
function MusLayout() {
    return (
        <div>
            <link href="/media/examples/link-element-example.css" rel="stylesheet"></link>
            <div className="mus-list-header">
                <h1>Music</h1>
            </div>
            <div className="mus-list" id="list_top_mus">
                <MusicList />
            </div>
            <div className="mus-list-header">
                <h1>Artists</h1>
            </div>
            <div className="mus-list" id="list_top_artist">
                <ArtistList />
            </div>
        </div>
    );
}

export default MusLayout;

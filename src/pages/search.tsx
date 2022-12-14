import React, { useEffect, useState } from "react";
import { Album, Artist, checImageAlbum, checImageTrack, checlImage, fetchArtistAlbums, notUndefinedTrack, notUndefinedTrackSearch, searchAlbum, searchArtist, searchTrcak, slice_str, Track, trackInfoSearch } from "../api";
import { useForm } from "react-hook-form";


const ArtistListItem = ({ item, image }) => (
    <div className="grid-item-search">
        <div className="card-search">
            <div className="card-search-info">
                <a href={item.url}>{slice_str(item.name)}</a>
            </div>
            <div className="pickgradient">
                <img src={image} alt="user-image" />
            </div>
        </div>
    </div>
);

function ArtistList(elem) {
    return (
        <div className="search-list">
            <div className="grid-container-search" id="search_list_artist">
                {elem.artists?.map(item => (
                    <ArtistListItem key={item.name} item={item} image={checlImage(item)} />
                ))}
            </div>
        </div>
    );
}

const AlbumsListItem = ({ item, image }) => (
    <div className="grid-item-search">
        <div className="card-search">
            <div className="card-search-info">
                <h2><a href={item.url}>{slice_str(item.name)}</a></h2>
            </div>
            <div className="pickgradient">
                <img src={image} alt="user-image" />
            </div>
        </div>
    </div>
);

function AlbumsList(elem) {
    return (
        <div className="search-list">
            <div className="grid-container-search" id="search_list_artist">
                {elem.albums?.map(item => (
                    <AlbumsListItem key={item.url} item={item} image={checImageAlbum(item)} />
                ))}
            </div>
        </div>
    );
}

const TrackListItem = ({ item, image }) => (
    <tr className="table-tracks-row">
        <td className="table-tracks-image">
            <img src={image} alt="user-image" />
        </td>
        <td className="table-tracks-artist">
            {slice_str(item.artist)}
        </td>
        <td className="table-tracks-track">
            <a href={item.url}>{slice_str(item.name)}</a>
        </td>
    </tr>
);

function TrackList(elem) {
    return (
        <div className="search-list">
            <table className="table-tracks" id="search_albums_track">
                <tbody>
                    {elem.tracks?.map(item => (
                        <TrackListItem key={item.url} item={item} image={checImageTrack(item)} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export type SearchState = { artists: Artist, tracks: Track, albums: Album, inputValue: string };

function SearchLayout() {
    const [state, setState] = useState<SearchState>({
        artists: [],
        tracks: [],
        albums: [],
        inputValue: ""
    });
    const { handleSubmit } = useForm();
    const onSubmit = async data => {
        if (state.inputValue.length > 0) {
            const artistsList = (await searchArtist(state.inputValue)).results.artistmatches.artist.slice(0, 6)
            const albumsList = (await searchAlbum(state.inputValue)).results.albummatches.album.slice(0, 6)
            const tracksList = (await searchTrcak(state.inputValue)).results.trackmatches.track
            let artistsListFull = await Promise.all(artistsList.map(async element => {
                const artistAlbumsData = await fetchArtistAlbums(element)
                element.album = artistAlbumsData.topalbums
                return element
            }))

            let trackListFull = (await Promise.all(tracksList.map(async element => {
                const trackInfoData = await trackInfoSearch(element)

                if (trackInfoData !== undefined && trackInfoData.error === undefined) {
                    element.image = trackInfoData.track.album?.image[3]['#text'];

                    return element
                }
                else
                    return undefined
            }))).filter(notUndefinedTrackSearch).slice(0, 8)
            let ty: SearchState = {
                artists: artistsListFull,
                tracks: trackListFull,
                albums: albumsList,
                inputValue: state.inputValue
            };
            setState(ty)
        }
    };

    const inputValueSet = (event) => {
        let ty: SearchState = {
            artists: [],
            tracks: [],
            albums: [],
            inputValue: event.target.value.trim()
        };
        setState(ty)
    }

    return (
        <div className="search">
            <form id="search_form" onSubmit={handleSubmit(onSubmit)}>
                <input type="search" placeholder="Search..." id="serach_input"
                    onChange={inputValueSet}></input>
                <button>Search</button>
            </form>
            <div id="search_area">
                <div className="search-list-header">
                    <h1>Artists</h1>
                </div>
                <ArtistList artists={state.artists} />
                <div className="separator"></div>
                <div className="search-list-header">
                    <h1>Albums</h1>
                </div>
                <AlbumsList albums={state.albums} />
                <div className="separator"></div>
                <div className="search-list-header">
                    <h1>Tracks</h1>
                </div>
                <TrackList tracks={state.tracks} />
            </div>
        </div>
    );
}

export default SearchLayout;

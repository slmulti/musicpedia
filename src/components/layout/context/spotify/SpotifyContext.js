import { createContext, useReducer } from "react";
import spotifyReducer from "./SpotifyReducer";

const SpotifyContext = createContext();

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

export const SpotifyProvider = ({ children }) => {
    const initialState = {
        accessToken: "",
        artists: [],
        artist: {},
        albums: [],
        topTracks: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(spotifyReducer, initialState);

    //search for multiple artists
    const searchArtists = async (text) => {
        setLoading();

        const authParameters = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        };
        const tokenResponse = await fetch(
            "https://accounts.spotify.com/api/token",
            authParameters
        );
        const tokenData = await tokenResponse.json();
        console.log(tokenData);
        const accessTokenData = tokenData.access_token;
        console.log(tokenData.access_token);

        const response = await fetch(
            `https://api.spotify.com/v1/search?q=${text}&type=artist`,
            {
                headers: {
                    Authorization: `Bearer ${tokenData.access_token}`,
                },
            }
        );
        const artistData = await response.json();
        console.log(artistData);

        const KeyArtistData = artistData.artists.items;
        console.log(
            "key artist data from searchArtists: ",
            artistData.artists.items
        );

        dispatch({
            type: "GET_ARTISTS",
            accessTokenPayload: accessTokenData,
            payload: KeyArtistData,
        });
    };

    //get single artist
    const getArtist = async (id) => {
        setLoading();
        console.log("id from getArtist :", id);

        const authParameters = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        };
        const tokenResponse = await fetch(
            "https://accounts.spotify.com/api/token",
            authParameters
        );
        const tokenData = await tokenResponse.json();
        const accessTokenData = tokenData.access_token;

        const response = await fetch(
            `https://api.spotify.com/v1/artists/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${tokenData.access_token}`,
                },
            }
        );
        const artistData = await response.json();
        console.log("single artistData: ", artistData);

        dispatch({
            type: "GET_ARTIST",
            accessTokenPayload: accessTokenData,
            payload: artistData,
        });
    };

    //get all albums by an artist
    const getAlbums = async (id) => {
        setLoading();

        const authParameters = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        };
        const tokenResponse = await fetch(
            "https://accounts.spotify.com/api/token",
            authParameters
        );
        const tokenData = await tokenResponse.json();
        const accessTokenData = tokenData.access_token;

        const response = await fetch(
            `https://api.spotify.com/v1/artists/${id}/albums?limit=50`,
            {
                headers: {
                    Authorization: `Bearer ${tokenData.access_token}`,
                },
            }
        );

        //destructed the json object for only the info i want
        const { items } = await response.json();
        console.log("items", items);

        dispatch({
            type: "GET_ALBUMS",
            accessTokenPayload: accessTokenData,
            payload: items,
        });
    };

    //get all top tracks by an artist
    const getTopTracks = async (id) => {
        setLoading();

        const authParameters = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        };
        const tokenResponse = await fetch(
            "https://accounts.spotify.com/api/token",
            authParameters
        );
        const tokenData = await tokenResponse.json();
        const accessTokenData = tokenData.access_token;

        const response = await fetch(
            `https://api.spotify.com/v1/artists/${id}/top-tracks?market=GB`,
            {
                headers: {
                    Authorization: `Bearer ${tokenData.access_token}`,
                },
            }
        );

        //destructed the json object for only the info i want
        const { tracks } = await response.json();
        console.log("Top Tracks from context:", tracks);

        dispatch({
            type: "GET_TOP_TRACKS",
            accessTokenPayload: accessTokenData,
            payload: tracks,
        });
    };

    //clear artisit from state
    const clearArtists = () => {
        dispatch({ type: "CLEAR_ARTISTS" });
    };
    //set loading
    const setLoading = () => dispatch({ type: "SET_LOADING" });

    return (
        <SpotifyContext.Provider
            value={{
                accessToken: state.accessToken,
                artists: state.artists,
                artist: state.artist,
                albums: state.albums,
                topTracks: state.topTracks,
                loading: state.loading,
                searchArtists,
                getArtist,
                getAlbums,
                getTopTracks,
                clearArtists,
            }}
        >
            {children}
        </SpotifyContext.Provider>
    );
};

export default SpotifyContext;

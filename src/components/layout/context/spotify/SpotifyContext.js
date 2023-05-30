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

    const searchArtists = async (text) => {
        setLoading();

        //try and avoid using this as throws funny results
        // const params = new URLSearchParams({
        //     q: text,
        // });
        // console.log("params:", params);
        // console.log("text", text);

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
        // setAccessToken(tokenData.access_token); //had to use tokenData.access_token below because useState isnt working at the moment
        console.log(tokenData.access_token);

        //search for artist with token for testing
        // const searchQuery = "Foo+Fighters";

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
        console.log(
            "key artist data from searchArtists: ",
            artistData.artists.items
        );
        const KeyArtistData = artistData.artists.items;

        // setArtists(artistData.artists.items);
        // setLoading(false);
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

        // const artistsAlbumsData = await response.json();
        // const artistsAlbumsDataItems = artistsAlbumsData.items;
        // console.log("artistsAlbumsDataItems: ", artistsAlbumsDataItems);

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

        // const firstFiveTracks = tracks.slice(0, 5);
        // console.log("first 5 tracks", firstFiveTracks);
        // // const x = firstFiveTracks[0].name;
        // // console.log("x", x);
        // const trackName = firstFiveTracks.map((track) => track.name);
        // console.log(trackName);

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

import React from "react";
import { useEffect, useState } from "react";
import Spinner from "../../layout/Spinner";
import ArtistItem from "./ArtistItem";

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

function ArtistResults() {
    const [accessToken, setAccessToken] = useState("");
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArtists();
    }, []);

    const fetchArtists = async () => {
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
        setAccessToken(tokenData.access_token); //had to use tokenData.access_token below because useState isnt working at the moment
        console.log(tokenData.access_token);

        //search for artist with token
        const searchQuery = "Foo+Fighters";

        const response = await fetch(
            `https://api.spotify.com/v1/search?q=${searchQuery}&type=artist`,
            {
                headers: {
                    Authorization: `Bearer ${tokenData.access_token}`,
                },
            }
        );
        const artistData = await response.json();
        console.log(artistData);
        console.log(artistData.artists.items);
        setArtists(artistData.artists.items);
        setLoading(false);
    };

    if (!loading) {
        return (
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grif-cols-2">
                {artists.map((artist) => (
                    <ArtistItem key={artist.id} artist={artist} />
                ))}
            </div>
        );
    } else {
        return <Spinner />;
    }
}

export default ArtistResults;

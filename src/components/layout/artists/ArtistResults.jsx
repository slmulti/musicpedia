import React from "react";
import { useContext } from "react";
import Spinner from "../../layout/Spinner";
import ArtistItem from "./ArtistItem";
import SpotifyContext from "../context/spotify/SpotifyContext";

function ArtistResults() {
    const { artists, loading } = useContext(SpotifyContext);

    console.log("ARTISTS from ArtistResults:", artists);

    if (!loading) {
        return (
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grif-cols-2 ">
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

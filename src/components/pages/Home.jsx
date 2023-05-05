import React from "react";
import ArtistResults from "../layout/artists/ArtistResults";
import ArtistSearch from "../layout/artists/ArtistSearch";

function Home() {
    return (
        <div>
            <h1 className="text-6xl pb-2">Hi There!</h1>
            <h1 className="text-2xl">
                Using the Spotify API you can search for Artists below to learn
                about them and their Albums.
            </h1>
            <ArtistSearch />
            <ArtistResults />
        </div>
    );
}

export default Home;

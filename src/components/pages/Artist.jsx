import React, { useEffect, useContext } from "react";
import SpotifyContext from "../layout/context/spotify/SpotifyContext";
import { useParams } from "react-router-dom";

function Artist() {
    const { id } = useParams();
    const { artist, loading, getArtist } = useContext(SpotifyContext);
    console.log("id from useParams:", id);

    useEffect(() => {
        getArtist(id);
    }, []);

    return (
        <>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure>
                    <img
                        className="h-96"
                        src={artist.images[0].url}
                        alt={artist.name}
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Artist: {artist.name}</h2>
                    <p>Popularity : {artist.popularity}</p>
                    <ul className="capitalize">
                        {artist.genres.map((genre) => (
                            <li key={genre}>{genre}</li>
                        ))}
                    </ul>

                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">
                            Spotify Link :{" "}
                            <a href={artist.external_urls.spotify}>
                                {artist.external_urls.spotify}
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Artist;

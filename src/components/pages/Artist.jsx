import { useEffect, useContext } from "react";
import SpotifyContext from "../layout/context/spotify/SpotifyContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import GetAlbumsByArtistID from "../layout/artistinfo/GetAlbumsByArtistID";
import GetTopTracksByArtistID from "../layout/artistinfo/GetTopTracksByArtistID";
import Spinner from "../layout/Spinner";
import NotFound from "./NotFound";

function Artist() {
    const {
        artist,
        loading,
        getArtist,
        getAlbums,
        getTopTracks,
        albums,
        topTracks,
    } = useContext(SpotifyContext);
    // console.log("id from useParams:", id);

    const { id } = useParams();

    console.log("ID from Artist", id);
    console.log("single artist from Artist", artist);

    useEffect(() => {
        getArtist(id);
        getAlbums(id);
        getTopTracks(id);
    }, []);

    if (!artist) {
        return <NotFound />;
    }
    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <div className="mb-4">
                <Link to="/" className="btn btn-ghost">
                    Back to Search
                </Link>
            </div>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure>
                    <img
                        className="h-96 pl-8"
                        src={artist.images[0].url}
                        alt={artist.name}
                    />
                </figure>
                <div className="card-body">
                    <h2 className="text-3xl card-title"></h2>
                    <div className="width-full round-lg shadow-md bg-base-100 stats">
                        <div className="stat">
                            <div className="text-3xl card-title">
                                {artist.name}
                            </div>
                        </div>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary h-full ">
                                <a
                                    href={artist.external_urls.spotify}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Open in Spotify{" "}
                                </a>
                            </button>
                        </div>
                    </div>
                    <div className="width-full round-lg shadow-md bg-base-100 stats">
                        <div className="stat">
                            <div className="stat-title text-md">
                                Popularity :
                                <div className="text-lg stat-value">
                                    {artist.popularity}
                                </div>
                            </div>
                        </div>
                        <div className="stat">
                            <div className="stat-title text-md">
                                Followers :
                                <div className="text-lg stat-value">
                                    {artist.followers.total}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="width-full round-lg shadow-md bg-base-100 stats">
                        <div className="stat">
                            <div className="stat-title text-md">
                                Genres :
                                <div className="text-lg stat-value">
                                    <ul className="capitalize">
                                        {artist.genres
                                            .slice(0, 5)
                                            .map((genre) => (
                                                <li key={genre}>{genre}</li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="stat">
                            <div className="stat-title text-md">
                                Top Tracks :
                                <div className="text-lg stat-value">
                                    <GetTopTracksByArtistID
                                        topTracks={topTracks}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <GetAlbumsByArtistID albums={albums} />
        </>
    );
}

export default Artist;

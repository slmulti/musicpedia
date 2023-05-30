import React, { useEffect, useContext } from "react";
import SpotifyContext from "../context/spotify/SpotifyContext";
import { useParams } from "react-router-dom";

function GetAlbumsByArtistID({ albums }) {
    //filtered albums only in uk market and remove singles
    console.log("Full return of albums", albums);
    // const filteredAlbums = albums.filter(
    //     (obj) =>
    //         obj.available_markets.includes("GB") &&
    //         (obj.album_type.includes("album") ||
    //             obj.album_type.includes("compilation"))
    // );
    const filteredAlbums = albums
        .filter(
            (obj) =>
                obj.available_markets.includes("GB") &&
                (obj.album_type.includes("album") ||
                    obj.album_type.includes("compilation"))
        )
        .filter((album, index, self) => {
            const currentIndex = self.findIndex(
                (a) => a.name.substring(0, 10) === album.name.substring(0, 10)
            );
            return currentIndex === index;
        });

    console.log("Filtered return of Albums: ", filteredAlbums);

    return (
        <div className="mt-8">
            <h1 className="text-6xl mb-4">Albums</h1>
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3">
                {filteredAlbums.map((album) => (
                    <a
                        href={album.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="card card-compact w-48 bg-base-100 shadow-xl hover:scale-105 ">
                            <figure>
                                <img
                                    src={album.images[1].url}
                                    alt={album.name}
                                />
                            </figure>
                            <div className="card-body h-20">
                                {/* restricting name of album to 2 lines max */}
                                <h2 className="text-base text-center line-clamp-2">
                                    {album.name}
                                </h2>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default GetAlbumsByArtistID;

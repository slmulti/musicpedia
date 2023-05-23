import React, { useEffect, useContext } from "react";
import SpotifyContext from "../context/spotify/SpotifyContext";
import { useParams } from "react-router-dom";

function GetAlbumsByArtistID({ albums }) {
    //filtered albums only in uk market and remove singles
    console.log("Full return of albums", albums);
    const filteredAlbums = albums.filter(
        (obj) =>
            obj.available_markets.includes("GB") &&
            (obj.album_type.includes("album") ||
                obj.album_type.includes("compilation"))
    );

    console.log("Filtered return of Albums: ", filteredAlbums);

    return (
        <div>
            <h1 className="text-6xl">Albums</h1>
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-10 lg:grid-cols-5 md:grid-cols-2">
                {filteredAlbums.map((album) => (
                    <div>
                        <figure>
                            <img src={album.images[1].url} alt={album.name} />
                        </figure>
                        <h3>{album.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GetAlbumsByArtistID;

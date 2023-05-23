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
        <div className="mt-8">
            <h1 className="text-6xl mb-4">Albums</h1>
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3">
                {filteredAlbums.map((album) => (
                    // <div>
                    //     <figure>
                    //         <img src={album.images[1].url} alt={album.name} />
                    //     </figure>
                    //     <h3>{album.name}</h3>
                    // </div>
                    <div className="card card-compact w-48 bg-base-100 shadow-xl hover:scale-105 ">
                        <figure>
                            <img src={album.images[1].url} alt={album.name} />
                        </figure>
                        <div className="card-body">
                            <h2 className="text-lg text-center">
                                {album.name}
                            </h2>

                            {/* <div className="card-actions justify-end">
                                <button className="btn btn-primary">
                                    Listen
                                </button>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GetAlbumsByArtistID;

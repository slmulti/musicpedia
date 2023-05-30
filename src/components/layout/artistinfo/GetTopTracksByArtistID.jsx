import React from "react";

function GetTopTracksByArtistID({ topTracks }) {
    console.log("GetTopTracksByArtistID:", topTracks);
    return (
        <>
            <div className="text-lg stat-value">
                <ul className="capitalize">
                    {topTracks.slice(0, 5).map((track) => (
                        <li key={track.id} className="hover: input-ghost">
                            {" "}
                            <a
                                href={track.external_urls.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-2 rounded hover:bg-gray-400 hover:text-white"
                            >
                                {track.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default GetTopTracksByArtistID;

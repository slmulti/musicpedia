import React, { useState, useContext } from "react";
import SpotifyContext from "../context/spotify/SpotifyContext";
import AlertContext from "../context/alert/AlertContext";

function ArtistSearch() {
    const [text, setText] = useState("");

    //pulling in context to hide or show clear button
    const { artists, searchArtists, clearArtists } =
        useContext(SpotifyContext);
    const { setAlert } = useContext(AlertContext);

    const handleChange = (e) => setText(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (text === "") {
            setAlert("Please enter something", "error");
        } else {
            //search artists
            searchArtists(text);
            setText("");
        }
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                                placeholder="Search..."
                                value={text}
                                onChange={handleChange}
                            />
                            <button
                                type="submit"
                                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
                            >
                                Go
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {artists.length > 0 && (
                <div>
                    <button
                        onClick={clearArtists}
                        className="btn btn-ghost btn-lg"
                    >
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
}

export default ArtistSearch;

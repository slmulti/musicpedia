import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

function ArtistItem({ artist }) {
    const firstImage = artist.images[0];
    console.log("firstImage", firstImage);
    const firstImageUrl = artist.images.map((image) => image.url)[0]; //this is the only way i could get images
    console.log(firstImageUrl);

    return (
        <div className="card shadow-md compact side bg-base-100">
            <div className="flex-row items-centre space-x-4 card-body">
                <div>
                    <div className="avatar">
                        <div className="rounded-full shadow w-14 h-14">
                            <img
                                src={
                                    firstImageUrl ||
                                    "https://p7.hiclipart.com/preview/69/982/493/itunes-computer-icons-logo-itunes-png.jpg"
                                }
                                alt={artist.name}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="card-title">{artist.name}</h2>
                    <Link
                        className="text-base-conent text-opacity-40"
                        to={`/user/`}
                    >
                        Visit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}

ArtistItem.propTypes = {
    artist: PropTypes.object.isRequired,
};

export default ArtistItem;

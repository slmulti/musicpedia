import React from "react";
import MyImage from "../layout/assests/MyImage.jpeg";

function AboutMe() {
    return (
        <>
            <div class="py-16 bg-white">
                <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                    <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                        <div class="md:5/12 lg:w-5/12">
                            <img
                                src={MyImage}
                                alt="image"
                                loading="lazy"
                                width="300"
                                height=""
                                className="md:mx-auto rounded"
                            />
                        </div>
                        <div class="md:7/12 lg:w-6/12">
                            <h2 class="text-2xl text-gray-900 font-bold md:text-4xl">
                                Hi!!! Im Simon 👋
                            </h2>
                            <p class="mt-6 text-gray-600">
                                I am an Apprentice at Barclays studying Software
                                Engineering with Multiverse. I have been with
                                the bank for 13 years and had many roles but
                                this is my first experience in the Tech side of
                                the bank.
                            </p>
                            <p class="mt-4 text-gray-600">
                                {" "}
                                Outside of work I enjoy Hiking, Photography and
                                Gardening...Im only 34!!!!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutMe;

import React from "react";
function About() {
    return (
        <>
            <div className="mb-16">
                <h1 className="text-6xl mb-4">MusicPedia</h1>
                <p className="mb-4 text-2xl font-light">
                    A React App using Tailwindcss and DaisyUI to search the{" "}
                    <strong>
                        <a href="https://developer.spotify.com/documentation/web-api">
                            {" "}
                            Spotify API{" "}
                        </a>
                    </strong>
                    for music Artists and their Albums and additional
                    information. This project is part of the front end module in
                    the SWE apprenticeship course by
                    <strong>
                        <a href="https://www.multiverse.io/en-GB">
                            {" "}
                            Multiverse
                        </a>{" "}
                    </strong>{" "}
                    taught by
                    <strong>
                        <a href="https://barker.codes/"> Kieran Barker</a>
                    </strong>
                    .
                </p>
            </div>
            <div className="mb-16">
                <h1 className="text-3xl mb-4">Apprenticeship Progress</h1>
                <ul className="steps">
                    <li className="step step-primary">
                        UK Intro to Coding Course
                    </li>
                    <li className="step step-primary">UK Bootcamp Part 1</li>
                    <li className="step step-primary">UK Bootcamp Part 2</li>
                    <li className="step step-primary">UK Back End Module</li>
                    <li className="step step-primary">UK Deployment Module</li>
                    <li className="step">Front End Module (4.23)</li>
                    <li className="step">Final Project</li>
                    <li className="step">Final Interview and Assement</li>
                </ul>
            </div>
            <p className="text-lg text-gray-400">
                Version <span>1.0.0</span>
            </p>
        </>
    );
}

export default About;

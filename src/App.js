import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import Footer from "./components/layout/Footer";
import React, { useState, useEffect } from "react";
import { SpotifyProvider } from "./components/layout/context/spotify/SpotifyContext";
import { AlertProvider } from "./components/layout/context/alert/AlertContext";
import Alert from "./components/layout/Alert";
import Artist from "./components/pages/Artist";

function App() {
    return (
        <SpotifyProvider>
            <AlertProvider>
                <Router>
                    <div className="flex flex-col justify-between h-screen">
                        <Navbar />
                        <main className="container mx-auto px-3 pb-12">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route
                                    path="/artist/:id"
                                    element={<Artist />}
                                />
                                <Route
                                    path="/notfound"
                                    element={<NotFound />}
                                />
                                <Route path="/*" element={<NotFound />} />
                            </Routes>
                            <Alert />
                        </main>
                        <Footer />
                    </div>
                </Router>
            </AlertProvider>
        </SpotifyProvider>
    );
}

export default App;

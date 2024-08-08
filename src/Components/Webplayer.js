import React, { createContext, useState } from "react";
import SideBar from "./SideBar";
import { BrowserRouter, Routes , Route } from "react-router-dom";
import { Header } from "./Header";
import "../Styles/webplayerMain.css";
import SpotifyWebApi from "spotify-web-api-js";
import Home from "../Routes/Home";
import Artist from "../Routes/Artist";
import Album from "../Routes/Album";
import Playlist from "../Routes/Playlist";
import Search from "../Routes/Search";
import MusicPlayer from "../Routes/MusicPlayer";

export default function Webplayer() {
  let [track , setTrack] = useState("5aMLADD1Ho6Ogq8s8mIzB9");
  return (
    <>
        <BrowserRouter basename="/react-spotify-clone">
            {<SideBar />}
            <div className="webplayer__main__body" id="super" >
                <Header/>
                    <div className="super">
                    <songChangeContext.Provider value={{setTrack: setTrack}}>
                        <Routes >
                            <Route  exact path="/" element={<Home />}/>
                            {<Route path="/playlist/:playlistId" element={<Playlist />}/>}
                            {<Route path="/album/:albumId" element={<Album />}/>}
                            {<Route path="/artist/:artistId" element={<Artist />}/>}
                            {<Route path="/search" element={<Search />}/>}
                        </Routes>
                    </songChangeContext.Provider>
                </div>
              </div>
                {<MusicPlayer track={track}/>}
        </BrowserRouter>
    </>
  )
}

export const Spotify = new SpotifyWebApi();
export let songChangeContext = createContext();
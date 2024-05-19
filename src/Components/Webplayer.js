import React from "react";
import SideBar from "./SideBar";
import { BrowserRouter, Routes , Route } from "react-router-dom";
// import Search from "../Routes/Search";
// import Playlist from "../Routes/Playlist";
// import Fav from "../Routes/Fav";
// import Home from "../Routes/Home";
import { Header } from "./Header";
import "../Styles/webplayerMain.css";
import SpotifyWebApi from "spotify-web-api-js";
import Home from "../Routes/Home";
import Artist from "../Routes/Artist";
import Album from "../Routes/Album";
import Playlist from "../Routes/Playlist";
import Search from "../Routes/Search";
export const  Spotify = new SpotifyWebApi();







export default function Webplayer() {

  return (
    <>
        <BrowserRouter>
            {/* SideBar */}
            {<SideBar />}
            {/* Body */}
            <div className="webplayer__main__body">
                <Header/>
                <div className="super">
                <Routes>
                  <Route path="" element={<Home />}/>
                  <Route path="playlist/:playlistId" element={<Playlist />}/>
                  <Route path="album/:albumId" element={<Album />}/>
                  <Route path="artist/:artistId" element={<Artist />}/>
                  <Route path="search" element={<Search />}/>
                </Routes>
                
                </div>
            </div>

        </BrowserRouter>
    </>
  )
}

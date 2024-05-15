import React, { useContext, useEffect } from "react";
import SideBar from "./SideBar";
import { BrowserRouter  } from "react-router-dom";
// import Search from "../Routes/Search";
// import Playlist from "../Routes/Playlist";
// import Fav from "../Routes/Fav";
// import Home from "../Routes/Home";
// import { Header } from "./Header";
import "../Styles/webplayer.css";
import SpotifyWebApi from "spotify-web-api-js";
import { myContext } from "../App";

export const  Spotify = new SpotifyWebApi();
export default function Webplayer() {

  return (
    <>
        <BrowserRouter>
            {/* SideBar */}
            {<SideBar />}
            {/* Body */}
            <div className="webplayer__body">
                {/* <Header/> */}
                {/* <Routes>
                    <Route path="" element={<Home />}></Route>
                    <Route path="search" element={<Search />}></Route>
                    <Route path="playlist/:id/:playlistName/:ownerName" element={<Playlist />}></Route>
                </Routes> */}
            </div>

        </BrowserRouter>
    </>
  )
}

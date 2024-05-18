import React from "react";
import SideBar from "./SideBar";
import { BrowserRouter  } from "react-router-dom";
// import Search from "../Routes/Search";
// import Playlist from "../Routes/Playlist";
// import Fav from "../Routes/Fav";
// import Home from "../Routes/Home";
import { Header } from "./Header";
import "../Styles/webplayerMain.css";
import SpotifyWebApi from "spotify-web-api-js";
import Home from "./Home";
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
                <Home />
            </div>

        </BrowserRouter>
    </>
  )
}

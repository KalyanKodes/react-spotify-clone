import React, { createContext, useState } from "react";
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
import MusicPlayer from "../Routes/MusicPlayer";
export const  Spotify = new SpotifyWebApi();




export let songChangeContext = createContext();


export default function Webplayer() {
  // console.log("Tracks State Variable : " , tracks)


  let [track , setTrack] = useState("5aMLADD1Ho6Ogq8s8mIzB9");
  // console.log("Current Track Id from Web Player Component: " , track)
  return (
    <>
        <BrowserRouter>
            {/* SideBar */}
            {<SideBar />}
            {/* Body */}
            <div className="webplayer__main__body" id="super" >
            <Header/>
                <div className="super">
                <songChangeContext.Provider value={{setTrack: setTrack}}>
                  <Routes>
                    <Route path="" element={<Home />}/>
                    <Route path="playlist/:playlistId" element={<Playlist />}/>
                    {<Route path="album/:albumId" element={<Album />}/>}
                    {<Route path="artist/:artistId" element={<Artist />}/>}
                    {<Route path="search" element={<Search />}/>}
                  
                    </Routes>
                    </songChangeContext.Provider>
                </div>
                </div>
          
                {<MusicPlayer track={track}/>}

        </BrowserRouter>
    </>
  )
}

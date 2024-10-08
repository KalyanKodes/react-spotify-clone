import React , {useEffect, useState}from 'react';
import { Spotify } from '../Components/Webplayer';
import "../Styles/search.css";
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArtistCard } from './Home';
import { AlbumCard } from './Home';
import { Audio } from '../Components/Songs';

function Search() {
  let [inputValue , setInputValue] = useState(localStorage.getItem('recentQuery'));
  let [trackLimit , setTrackLimit] = useState(6);
  let [artistLimit , setArtistLimit] = useState(6);
  let [albumLimit , setAlbumLimit] = useState(6);
  let [playlistLimit , setPlaylistLimit] = useState(6);
  let [renderType , setRenderType] = useState("all");
  let [searchResult , setSearchResult] = useState({
    loadingStatus: false,
    albums: ["" , "" , "" , "" , ""],
    artists: ["" , "" , "" , "" , ""],
    playlists: ["" , "" , "" , "" , ""],
    tracks: ["" , "" , "" , "" , ""],
  });

  useEffect(()=>{changeBackgroundColor(["#222222" , "#131819", "#121212"])} , []); 

  function changeBackgroundColor(colors){
    try{
        let element = document.getElementById('super');
        element.style.background = `linear-gradient(${colors})`;
    }
    catch(e){
      console.log(e)
    }
  }

  const getDetails = async ()=>{
    if(inputValue !== ""){
      setSearchResult({
        loadingStatus: true,
        albums: ["" , "" , "" , "" , ""],
        artists: ["" , "" , "" , "" , ""],
        playlists: ["" , "" , "" , "" , ""],
        tracks: ["" , "" , "" , "" , ""],
      });
      try{
        let details = await Spotify.search(inputValue, ['album', 'artist', 'playlist', 'track', 'show', 'episode']);
        setSearchResult({
            loadingStatus: false,
            albums: details.albums.items,
            artists: details.artists.items,
            playlists: details.playlists.items,
            tracks: details.tracks.items,
        })
        localStorage.setItem('recentQuery' , inputValue)
      }
      catch(e){
        console.log(e)
      }
    }
  }

  useEffect(()=>{
    getDetails();
  } , []);

  useEffect(()=>{
    const changeLimit = ()=>{
      if(renderType === "all"){
        setTrackLimit(6)
        setAlbumLimit(6)
        setArtistLimit(6)
        setPlaylistLimit(6)
      }
      else if(renderType === "albums"){
        setTrackLimit(0)
        setAlbumLimit(20)
        setArtistLimit(0)
        setPlaylistLimit(0)
      }
      else if(renderType === "artists"){
        setTrackLimit(0)
        setAlbumLimit(0)
        setArtistLimit(20)
        setPlaylistLimit(0)
      }
      else if(renderType === "playlists"){
        setTrackLimit(0)
        setAlbumLimit(0)
        setArtistLimit(0)
        setPlaylistLimit(20)
      }
      else if(renderType === "tracks"){
        setTrackLimit(20)
        setAlbumLimit(0)
        setArtistLimit(0)
        setPlaylistLimit(0)
      }
    }
    changeLimit()
  } , [renderType]);

  const changeRenderType = (e , type)=>{
      document.getElementById('categories').childNodes.forEach((node)=>node.style.background  = "#3e3c3c");
      e.target.style.background = "rgba(222 , 222 , 222 , .7)";
      setRenderType(type);
  }

  return (
    <>
      {/* Serch Body */}
      <div className="search__body">
        <div className={"search__inputs"}>
        <form action="" className='search__form' onSubmit={(e)=>{
          e.preventDefault();
          getDetails()
        }}>
        <div className='icons__parent'>
         <label htmlFor="query" className='input__label__search__icon'>
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </label>
          <input type="text" id="query" placeholder='What do you want to play?' autoFocus value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
        <label htmlFor="query" className='input__label__cross__icon'>
          <FontAwesomeIcon icon={faXmark} onClick={()=>setInputValue("")}></FontAwesomeIcon>
        </label>
        </div>
        <button className='search__button'>Search</button>
        </form>
        </div> 
        <div id="categories">
          <button className='category__button' onClick={(e)=>{changeRenderType(e , "all")}} style={{background : "rgba(222 , 222 , 222 , .7)"}}>All</button>
          <button className='category__button' onClick={(e)=>{changeRenderType(e , "albums")}}>Albums</button>
          <button className='category__button' onClick={(e)=>{changeRenderType(e , "artists")}}>Artists</button>
          <button className='category__button' onClick={(e)=>{changeRenderType(e , "playlists")}}>Playlists</button>        
          <button className='category__button' onClick={(e)=>{changeRenderType(e , 'tracks')}}>Tracks</button>        
        </div>
          {/* Albums */}
       { albumLimit !== 0 && <div className="home__new__releases__card__outer">
       <h3>Albums</h3>
       <br />
       <div className="wrapper">
         {
           searchResult.loadingStatus ? 
               searchResult.albums.map((item , i)=><AlbumCard loading={true} key={i}/>):
               searchResult.albums.map((album , i)=> {
                 if(i < albumLimit)
                 try{
                   return <AlbumCard key={album.id} albumImage={album.images[0].url} albumTitle={album.name} albumArtist={album.artists[0].name} id={album.id} loading={false} pathTo={"album"}/>
                 }
                 catch(e){
                   console.log(e)
                 }
             })
         }
       </div>
   </div>}
        {/* Artist */}
        {artistLimit !== 0 && <div className="home__top__artist__card__outer">
            <h3>Artists</h3>
            <br />
            <div className="wrapper">
              {
                searchResult.loadingStatus ? 
                    searchResult.artists.map((item , i)=><ArtistCard loading={true} key={i}/>):
                    searchResult.artists.map((artist , i)=>{
                      if(i < artistLimit)
                      try{
                        return <ArtistCard key={artist.id} loading={false} image={artist.images[0].url} name={artist.name} id={artist.id}/>
                      }
                      catch(e){
                        console.log(e)
                      }
                    })
              }
            </div>
        </div>}
        {/*  Playlist */}
        {playlistLimit !== 0 && <div className="home__new__releases__card__outer">
            <h3>Playlists</h3>
            <br />
            <div className="wrapper">
              {
                searchResult.loadingStatus ? 
                    searchResult.playlists.map((item , i)=><AlbumCard loading={true} key={i}/>):
                    searchResult.playlists.map((playlist , i)=>{
                      if(i < playlistLimit)
                      try{                       
                        return <AlbumCard key={playlist.id} albumImage={playlist.images[0].url} albumTitle={playlist.name} albumArtist={playlist.owner.display_name} id={playlist.id} loading={false} pathTo= "playlist"/>
                      }
                      catch(e){
                        console.log(e)
                      }
                  })
              }
            </div>
        </div>}
      </div>
      {/* Tracks */}
        <div className="songs__super__search">
        {trackLimit !== 0 && <h3>Tracks</h3>}
       {
            !searchResult.loadingStatus ? searchResult.tracks.map((song , i)=>{
              if(i < trackLimit){
                try{
                    return (<div className='song'><Audio trackNumber = {i +1} addedOn = {song.album.release_date} artists = {song.artists} songName = {song.name} songDuration = {song.duration_ms} coverImage = {song.album.images[0].url} heading = {false} albumName = {song.album.name} listType = {false} id = {song.id} key = {song.id}/></div>)
                }
                catch{
                  console.log("error")
                }
              }
            }) : searchResult.tracks.map((item , i)=> <div className='search__song__loading'></div>)
       }
    </div> 
    </>
  )
}

export default Search
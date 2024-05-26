import React , {useEffect, useState}from 'react';
import { Spotify } from '../Components/Webplayer';
import "../Styles/search.css";
import { faCancel, faCross, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArtistCard } from './Home';
import { AlbumCard } from './Home';


function Search() {

  let [inputValue , setInputValue] = useState(localStorage.getItem("recentQuery"));
  let [searchResult , setSearchResult] = useState({
    loadingStatus: false,
    albums: ["" , "" , "" , "" , ""],
    artists: ["" , "" , "" , "" , ""],
    playlists: ["" , "" , "" , "" , ""],
    tracks: ["" , "" , "" , "" , ""],
    shows: ["" , "" , "" , "" , ""],
    episodes: ["" , "" , "" , "" , ""]

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
    shows: ["" , "" , "" , "" , ""],
    episodes: ["" , "" , "" , "" , ""]
      });
      try{
        let details = await Spotify.search(inputValue, ['album', 'artist', 'playlist', 'track', 'show', 'episode']);

        setSearchResult({
          loadingStatus: false,
          albums: details.albums.items,
          artists: details.artists.items,
          playlists: details.playlists.items,
          tracks: details.tracks.items,
          shows: details.shows.items,
          episodes: details.episodes.items,
        })

        localStorage.setItem("recentQuery" , inputValue);

        console.log('Albums:', details.albums.items);
        console.log('Artists:', details.artists.items);
        console.log('Playlists:', details.playlists.items);
        console.log('Tracks:', details.tracks.items);
        console.log('Shows:', details.shows.items);
        console.log('Episodes:', details.episodes.items);
      }
      catch(e){
        console.log(e)
      }
    }
    
  }

  useEffect(()=>{
    getDetails();
  } , []);


  console.log("Search Result: ",searchResult)

  console.log("Input Value: " , inputValue)
  return (
    <>
    
        <div className={"search__inputs"}>

       <label htmlFor="query" className='input__label__search__icon'>
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </label>
        <form action="" className='search__form' onSubmit={(e)=>{
          e.preventDefault();
          getDetails()
        }}>
        <input type="text" id="query" placeholder='What do you want to play?' autoFocus value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
        
        <button className='search__button'>Search</button>
        </form>
        <label htmlFor="query" className='input__label__cross__icon'>
          <FontAwesomeIcon icon={faXmark} onClick={()=>setInputValue("")}></FontAwesomeIcon>
        </label>
        </div>
      

      {/* Serch Body */}

      <div className="search__body">
        <div className="categories">
          <button className='category__button'>All</button>
          <button className='category__button'>Albums</button>
          <button className='category__button'>Artists</button>
          <button className='category__button'>Playlists</button>
          <button className='category__button'>Shows</button>
          <button className='category__button'>Episods</button>
        
        </div>


        {/* Albums */}
        {/* Artist */}
        {/* Playlist */}
        {/* Shows */}
        {/* Episods */}
        



      

        

      </div>

    </>

  )
}

export default Search
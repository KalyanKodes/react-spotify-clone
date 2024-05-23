import React , {useEffect, useState}from 'react';
import { Spotify } from '../Components/Webplayer';
import "../Styles/search.css";
import { faCancel, faCross, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArtistCard } from './Home';
import { AlbumCard } from './Home';


function Search() {

  let [inputValue , setInputValue] = useState("Hanuman")
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

        {/* Same Components used In Home so No changes done execpt inside map method */}

        {/* Artist */}
        <div className="home__top__artist__card__outer">
            <h3>Artists</h3>
            <br />
            <div className="wrapper">
              {
                searchResult.loadingStatus ? 
                    searchResult.artists.map((item , i)=><ArtistCard loading={true} key={i}/>):
                    searchResult.artists.map((artist , i)=>{
                      if(i < 6)
                      try{
                        // console.log("Artist Complete Object: " , artist)
                        // console.log("Artist Id: ",artist.id)
                        // console.log("Artist name: ",artist.name)
                        // console.log("Artist Image: ", artist.images[0].url)
                        return <ArtistCard key={artist.id} loading={false} image={artist.images[0].url} name={artist.name} id={artist.id}/>
                      }
                      catch(e){
                        console.log(e)
                      }
                      // console.log("Artist Image: ",artist.images[0].url)
                    })
              }
            </div>
        </div>


        {/* Albums */}

        <div className="home__new__releases__card__outer">
            <h3>Albums</h3>
            <br />
            <div className="wrapper">
              {
                searchResult.loadingStatus ? 
                    searchResult.albums.map((item , i)=><AlbumCard loading={true} key={i}/>):
                    searchResult.albums.map((album , i)=>{
                      if(i < 6)
                      try{
                        console.log("Album Complete Object: " , album)
                        console.log("Album Id: ",album.id)
  
                        // console.log("Album name: ",album.name)
                        return <AlbumCard key={album.id} albumImage={album.images[0].url} albumTitle={album.name} albumArtist={album.artists[0].name} id={album.id} loading={false} pathTo={"album"}/>
                      }
                      catch(e){
                        console.log(e)
                      }
                  })
              }
            </div>
        </div>
        


        {/*  Playlist */}
        <div className="home__new__releases__card__outer">
            <h3>Playlists</h3>
            <br />
            <div className="wrapper">
              {
                searchResult.loadingStatus ? 
                    searchResult.playlists.map((item , i)=><AlbumCard loading={true} key={i}/>):
                    searchResult.playlists.map((playlist , i)=>{
                      if(i < 6)
                      try{
                        console.log("Playst Complete Object: " , playlist)
                        console.log("Plalist Id: ",playlist.id)
  
                        // console.log("Album name: ",album.name)
                        return <AlbumCard key={playlist.id} albumImage={playlist.images[0].url} albumTitle={playlist.name} albumArtist={playlist.owner.display_name} id={playlist.id} loading={false} pathTo= "playlist"/>
                      }
                      catch(e){
                        console.log(e)
                      }
                  })
              }
            </div>
        </div>

      </div>

    </>

  )
}

export default Search
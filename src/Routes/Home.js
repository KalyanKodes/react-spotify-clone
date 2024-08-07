import React , {useContext , useState , useEffect} from "react";
import { myContext } from "../App";
import { Spotify } from "../Components/Webplayer";
import "../Styles/home.css";
import spotifyLogo from '../Assests/spotifyDiscoverWeeklyLogo.png';
import { Link } from "react-router-dom";

export default function Home(){
    let {accessToken} = useContext(myContext);
    let [playlists , setPlaylists] = useState({loadingStatus: true , $playlists: ["" , "" , "" , "" , ""]});
    let [artists , setArtists] = useState({loadingStatus: true , $artists : ["" , "" , "" , "" , ""]});
    let [albums , setAlbums] = useState({loadingStatus: true , $albums : ["" , "" , "" , "" , ""]});
    let [topAlbums , setTopAlbums] = useState({loadingStatus: true , $topAlbums : ["" , "" , "" , "" , ""]});

    // Use Effect to get recent Tracks Playlists
    useEffect(()=>{getRecentlyPlayedTracksPlaylists(accessToken , setPlaylists)} , [accessToken])
    // Use Effect to get Artist details;
    useEffect(()=>{getTopArtists(setArtists)} , [accessToken])
    // Use Effect to get New Albums
    useEffect(()=>{AlbumCards(setAlbums)} , [accessToken]);
    // Use Effect to get Top Albums of User
    useEffect(()=>{getTopAlbums(setTopAlbums)} , [accessToken]);
    // Use Effect to change background color of Home Component on Initial Render
    useEffect(()=>{changeBackgroundColor(["#222222" , "#131819", "#121212"])} , []); 
      
    return(
      <>
        {/* Playback History */}
        <div className="home__playlist__card__outer">
            <h3>Playback History</h3>
            <br />
            <div className="wrapper">
              {
                playlists.loadingStatus ? 
                    playlists.$playlists.map((item , i)=><PlaylistCard loading={true} key={i}/>): 
                    playlists.$playlists.length !== 0 ? playlists.$playlists.map((playlist)=><PlaylistCard key={playlist[2]} loading={false} coverImage={playlist[0]} title={playlist[1]} id={playlist[2]}/>) : "No Recent Tracks"
              }
            </div>
        </div>       
        {/* Artists */}
        <div className="home__top__artist__card__outer">
            <h3>Top Artists</h3>
            <br />
            <div className="wrapper">
              {
                artists.loadingStatus ? 
                    artists.$artists.map((item , i)=><ArtistCard loading={true} key={i}/>):
                    artists.$artists.length !== 0 ? artists.$artists.map((artist)=><ArtistCard key={artist[0]} loading={false} image={artist[1]} name={artist[2]} id={artist[0]}/>) : "Detials not found"
              }
            </div>
        </div>
        {/* New Albums */}
        <div className="home__new__releases__card__outer">
            <h3>New Releases</h3>
            <br />
            <div className="wrapper">
              {
                albums.loadingStatus ? 
                    albums.$albums.map((item , i)=><AlbumCard loading={true} key={i}/>):
                    albums.$albums.map((album)=><AlbumCard key={album[0]} albumImage={album[1]} albumTitle={album[2]} albumArtist={album[3]} id={album[0]} pathTo = "album"/>)
              }
            </div>
        </div>
        {/* User's Top Albums */}
        <div className="home__top__albums__card__outer">
            <h3>Your Top Albums</h3>
            <br />
            <div className="wrapper">
              {
                topAlbums.loadingStatus ? 
                    topAlbums.$topAlbums.map((item , i)=><TopAlbum loading={true} key={i}/>):
                    topAlbums.$topAlbums.length !== 0 ? topAlbums.$topAlbums.map((album)=><TopAlbum key={album[0]} albumImage={album[1]} albumTitle={album[2]} albumArtist={album[3]} id={album[0]} pathTo={"album"}/>) : "No top Artists found"
              }
            </div>
        </div>    
      </>
   )
}

function changeBackgroundColor(colors){
    try{
        let element = document.getElementById('super');
        element.style.background = `linear-gradient(${colors})`;
    }
    catch(e){
      console.log(e)
    }
}

async function getTopAlbums(stateChanger){
  let response = await Spotify.getMyTopTracks({limit: 50});
  let trackDetaisArr = response.items;
  let topAlbumsId = []
  let topAlbums = [];
  let initialTopAlbums = [];

  for(const item of trackDetaisArr){
    if(!topAlbumsId.includes(item.album.id)){
      topAlbums.push([item.album.id , item.album.images[0].url , item.album.name , item.album.artists[0].name]);
      topAlbumsId.push(item.album.id)
    }
  }
  
  if(topAlbums.length > 6){
      for(let i = 0; i < 6; i++){
              initialTopAlbums.push(topAlbums[i])
      }
  }
  else{ initialTopAlbums = topAlbums; }
  
  stateChanger({loadingStatus: false , $topAlbums: [...initialTopAlbums]})
}




async function AlbumCards(stateChanger){
    let response = await Spotify.getNewReleases();
    let artistsArr = response.albums.items;
    let artistDetials = [];
    let initialArtistDetials = [];

    for(const artist of artistsArr){
          artistDetials.push([artist.id , artist.images[0].url , artist.name , artist.artists[0].name])
    }

    if(artistDetials.length > 6){
        for(let i = 0; i < 6; i++){
              initialArtistDetials.push(artistDetials[i])
        }
    }
    else{ initialArtistDetials = artistDetials; }

    stateChanger({loadingStatus : false  , $albums : [...initialArtistDetials]});
}


async function getTopArtists(stateChanger){
    try{
        let response = await Spotify.getMyTopArtists();
        let artistsItemsArr = response.items;
        let artistsDetials = [];
        let initialArtists = [];

        for(const artist of artistsItemsArr){
            artistsDetials.push([artist.id , artist.images[0].url , artist.name]);
        }

        for(let i = 0; i < 12; i++){
            if(i < artistsDetials.length){
                initialArtists.push(artistsDetials[i])
            }
        }

        stateChanger({loadingStatus: false , $artists: [...initialArtists]});
    }
    catch{
        console.log("Error Generated while fetching Artist")
    }
}



async function getRecentlyPlayedTracksPlaylists(token , stateChanger){
    Spotify.setAccessToken(token);
    let response = await Spotify.getMyRecentlyPlayedTracks({limit: 50});  
    let returnedDetials = response.items;
    let ids = [];
    let playlistDetails = []

    for(const item of returnedDetials){
        try{
            ids.push(item.context.uri.split(":")[2]);
        }
        catch{
            console.log("Can't find Recently played Tracks")
        }
    }

    let uniqueIds = new Set(ids);

    for(const id of uniqueIds){
        try{
            let res = await Spotify.getPlaylist(id);
            playlistDetails.push([res.images[0].url , res.name , id])
        }
        catch{
              console.log("Cannot Find Playlist of Id: " , id)
        }
    }

    stateChanger({loadingStatus: false , $playlists: playlistDetails})
}


export function ArtistCard({loading , image , name , id}){
    return (
      <Link to={`/artist/${id}`}>
        <div className="home__artist__card">
              {loading ? <div className="home__artist__card__image__load"></div> : <img src={image} alt={name} onError={(e)=> e.target.src = spotifyLogo}/>}
              {!loading && <small>{name}</small>}
              {!loading && <code>Artist</code>}
        </div>
      </Link>
    )
}

export function AlbumCard({loading , albumImage , albumTitle , albumArtist , id , pathTo}){
    return (
    <Link to={`/${pathTo}/${id}`}>
        <div className="home__new__releases__card">
                    {loading ? <div className="home__new__releases__card__image__load"></div> : <img src={albumImage} alt={albumTitle} onError={(e) => e.target.src = spotifyLogo}/>}
                    {!loading && <small>{albumTitle}</small>}
                    {!loading && <code>{albumArtist}</code>}
        </div>
    </Link>
    )
}

export function TopAlbum({loading , albumImage , albumTitle , albumArtist , id , pathTo}){
    return (
    <Link to={`/${pathTo}/${id}`}>
        <div className="home__top__albums__card">
                    {loading ? <div className="home__top__albums__card__image__load"></div> : <img src={albumImage} alt={albumTitle} />}
                    {!loading && <small>{albumTitle}</small>}
                    {!loading && <code>{albumArtist}</code>}
        </div>
    </Link>
    )
}

function PlaylistCard({loading , coverImage , title , id}){  
      return(
        <Link to={`/playlist/${id}`}>
          <div 
              className="playlist__card" >
            {loading ? <div className="playlist__card__image__load"> </div> : 
                    <img src={coverImage} alt="playlist-cover" onError={(e)=> e.target.src = spotifyLogo}/>

            }
            {loading ? <p className="playlist__card__title__load"></p> : <p>{title}</p>}
        </div>
        </Link>
    )
}
  
  
  
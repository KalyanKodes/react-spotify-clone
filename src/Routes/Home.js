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
    useEffect(()=>{getNewAlbums(setAlbums)} , [accessToken]);
    // Use Effect to get Top Albums of User
      useEffect(()=>{getTopAlbums(setTopAlbums)} , [accessToken]);
      
    

    return(
      <>
        {/* Playback History */}
        <div className="home__playlist__card__outer">
            <h3>Playback History</h3>
            <br />
            <div className="wrapper">
              {
                playlists.loadingStatus ? 
                    playlists.$playlists.map((item , i)=><HomePlaylistCard loading={true} key={i}/>):
                    playlists.$playlists.map((playlist)=><HomePlaylistCard key={playlist[2]} loading={false} coverImage={playlist[0]} title={playlist[1]} id={playlist[2]}/>)
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
                    artists.$artists.map((item , i)=><HomeArtistCard loading={true} key={i}/>):
                    artists.$artists.map((artist)=><HomeArtistCard key={artist[0]} loading={false} image={artist[1]} name={artist[2]} id={artist[0]}/>)
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
                    albums.$albums.map((item , i)=><NewAlbum loading={true} key={i}/>):
                    albums.$albums.map((album)=><NewAlbum key={album[0]} albumImage={album[1]} albumTitle={album[2]} albumArtist={album[3]} id={album[0]}/>)
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
                    topAlbums.$topAlbums.map((album)=><TopAlbum key={album[0]} albumImage={album[1]} albumTitle={album[2]} albumArtist={album[3]} id={album[0]}/>)
              }
            </div>
        </div>
        
      </>
    )
  }
  


async function getTopAlbums(stateChanger){
  let response = await Spotify.getMyTopTracks({limit: 50});
  console.log("Top Tracks: ",response.items)
  let trackDetaisArr = response.items;
  let topAlbumsId = []
  let topAlbums = [];
  for(const item of trackDetaisArr){
    if(!topAlbumsId.includes(item.album.id)){
      topAlbums.push([item.album.id , item.album.images[0].url , item.album.name , item.album.artists[0].name]);
      topAlbumsId.push(item.album.id)
    }
  }
  let initialTopAlbums = [];
            if(topAlbums.length > 6){
              for(let i = 0; i < 6; i++){
                initialTopAlbums.push(topAlbums[i])
              }
            }
            else{
              initialTopAlbums = topAlbums;
            }
  // let uniqueTopAlbumsIds = new Set(topAlbumsId)
  // console.log("Top Albums : " , initialTopAlbums);
  stateChanger({loadingStatus: false , $topAlbums: [...initialTopAlbums]})

}




  async function getNewAlbums(stateChanger){
    let response = await Spotify.getNewReleases();
            let artistsArr = response.albums.items;
            let artistDetials = [];
            for(const artist of artistsArr){
              artistDetials.push([artist.id , artist.images[0].url , artist.name , artist.artists[0].name])
            }
            // console.log("Test: ",artistsArr);
            let initialArtistDetials = [];
            if(artistDetials.length > 6){
              for(let i = 0; i < 6; i++){
                initialArtistDetials.push(artistDetials[i])
              }
            }
            else{
              initialArtistDetials = artistDetials;
            }
            // console.log("Final Artist Detials: ",initialArtistDetials)
            stateChanger({loadingStatus : false  , $albums : [...initialArtistDetials]});
  }


  async function getTopArtists(stateChanger){
    try{
        let response = await Spotify.getMyTopArtists();
        // console.log("Artist Details: ",response)
        let artistsItemsArr = response.items;
        let artistsDetials = [];

        for(const artist of artistsItemsArr){
            artistsDetials.push([artist.id , artist.images[0].url , artist.name]);
        }
        let initialArtists = [];
        for(let i = 0; i < 12; i++){
            if(i < artistsDetials.length){
                initialArtists.push(artistsDetials[i])
            }
        }
        // console.log(initialArtists)
        // console.log("All Artists Detials: " , artistsDetials);
        stateChanger({loadingStatus: false , $artists: [...initialArtists]});
    }
    catch{
        // console.log("Error Generated while fetching Artist")
    }
}



  async function getRecentlyPlayedTracksPlaylists(token , stateChanger){
    Spotify.setAccessToken(token);
        // console.log("Getting Recently Played Tracks");
        let response = await Spotify.getMyRecentlyPlayedTracks({limit: 50});  
        // console.log("Response: " , response.items)
        let returnedDetials = response.items;
        // console.log("Unique Playlits Id's: " , returnedDetials)
        let ids = [];
        for(const item of returnedDetials){
          try{
            // console.log("Playlist Id: ",item.context.uri.split(":")[2]);
            ids.push(item.context.uri.split(":")[2]);
          }
          catch{
            // console.log("Can't find Recently played Tracks")
          }
        }
        let uniqueIds = new Set(ids);
        // console.log("Final Id's: ",uniqueIds)
        // console.log("Playlist ID's: " , returnedDetials)
        let playlistDetails = []
          for(const id of uniqueIds){
            try{
              let res = await Spotify.getPlaylist(id);
              playlistDetails.push([res.images[0].url , res.name , id])
              //console.log("Playlist Details: ",res)
            }
            catch{
              // console.log("Cannot Find Playlist of Id: " , id)
            }
          }
        // console.log("Fetched Details: ",playlistDetails)
        stateChanger({loadingStatus: false , $playlists: playlistDetails})
        // console.log("Updataed State:  ",playlists)
  }


function HomeArtistCard({loading , image , name , id}){
    return (
      <Link to={`artist/${id}`}>
        <div className="home__artist__card">
                    {loading ? <div className="home__artist__card__image__load"></div> : <img src={image} alt={name} />}
                    {!loading && <small>{name}</small>}
                    {!loading && <code>Artist</code>}
        </div>
      </Link>
    )
}
function NewAlbum({loading , albumImage , albumTitle , albumArtist , id}){
    return (
    <Link to={`album/${id}`}>
        <div className="home__new__releases__card">
                    {loading ? <div className="home__new__releases__card__image__load"></div> : <img src={albumImage} alt={albumTitle} />}
                    {!loading && <small>{albumTitle}</small>}
                    {!loading && <code>{albumArtist}</code>}
        </div>
    </Link>
    )
}
function TopAlbum({loading , albumImage , albumTitle , albumArtist , id}){
    return (
    <Link to={`album/${id}`}>
        <div className="home__top__albums__card">
                    {loading ? <div className="home__top__albums__card__image__load"></div> : <img src={albumImage} alt={albumTitle} />}
                    {!loading && <small>{albumTitle}</small>}
                    {!loading && <code>{albumArtist}</code>}
        </div>
    </Link>
    )
}


  function HomePlaylistCard({loading , coverImage , title , id}){  
      return(
        <Link to={`playlist/${id}`}>
          <div className="playlist__card">
            {loading ? <div className="playlist__card__image__load"> </div> : <img src={coverImage} alt="playlist-cover" onError={(e)=> e.target.src = spotifyLogo}/>}
            {loading ? <p className="playlist__card__title__load"></p> : <p>{title}</p>}
        </div>
        </Link>
      )
  }
  
  
  
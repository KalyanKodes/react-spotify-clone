import React , {useContext , useState , useEffect} from "react";
import { myContext } from "../App";
import { Spotify } from "./Webplayer";
import "../Styles/home.css";
import spotifyLogo from '../Assests/spotifyDiscoverWeeklyLogo.png'

export default function Home(){
    let {accessToken} = useContext(myContext);
    let [playlists , setPlaylists] = useState({loadingStatus: true , $playlists: ["" , "" , "" , "" , ""]});
    let [artists , setArtists] = useState({loadingStatus: true , $artists : ["" , "" , "" , "" , ""]});


    // Use Effect to get recent Tracks Playlists
    useEffect(()=>{
      getRecentlyPlayedTracksPlaylists(accessToken , setPlaylists)
    } , [accessToken])
  

    // Use Effect to get Artist details;
    useEffect(()=>{
        getTopArtists(setArtists);
    } , [accessToken])

    useEffect(()=>{
        const test = async ()=>{
            // Spotify.setAccessToken(accessToken)
            let response = await Spotify.getCategories()
            console.log(response);
        }
        test()
    } , [accessToken]);
  
    return(
      <div className="home__super">
        {/* Playback History */}
        <div className="home__playlist__card__outer">
            <h3>Playback History</h3>
            <br />
            <div className="wrapper">
              {
                playlists.loadingStatus ? 
                    playlists.$playlists.map((item , i)=><HomePlaylistCard loading={true} key={i}/>):
                    playlists.$playlists.map((playlist)=><HomePlaylistCard key={playlist[2]} loading={false} coverImage={playlist[0]} title={playlist[1]}/>)
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
                    artists.$artists.map((artist)=><HomeArtistCard key={artist[0]} loading={false} image={artist[1]} name={artist[2]}/>)
              }
            </div>
        </div>


        {/* Best Playlists */}
        {/* Recomended Stations */}
        {/* Sweat Hours */}
      </div>
    )
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
        console.log("Error Generated while fetching Artist")
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
            console.log("Can't find Recently played Tracks")
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
              console.log("Cannot Find Playlist of Id: " , id)
            }
          }
        // console.log("Fetched Details: ",playlistDetails)
        stateChanger({loadingStatus: false , $playlists: playlistDetails})
        // console.log("Updataed State:  ",playlists)
  }


function HomeArtistCard({loading , image , name}){
    return (
        <div className="home__artist__card">
                    {loading ? <div className="home__artist__card__image__load"></div> : <img src={image} alt={name} />}
                    {!loading && <small>{name}</small>}
                    {!loading && <code>Artist</code>}
        </div>
    )
}


  function HomePlaylistCard({loading , coverImage , title}){  
      return(
  
         <div className="playlist__card">
            {loading ? <div className="playlist__card__image__load"> </div> : <img src={coverImage} alt="playlist-cover" onError={()=>this.src = spotifyLogo}/>}
            {loading ? <p className="playlist__card__title__load"></p> : <p>{title}</p>}
        </div>
      )
  }
  
  
  
import React , {useContext , useState , useEffect} from "react";
import { myContext } from "../App";
import { Spotify } from "./Webplayer";
import "../Styles/home.css";


export default function Home(){
    let {accessToken} = useContext(myContext);
    let [playlists , setPlaylists] = useState({loadingStatus: true , $playlists: ["" , "" , "" , "" , ""]});
    useEffect(()=>{
      const getRecentlyPlayedTracks = async ()=>{
        Spotify.setAccessToken(accessToken);
        console.log("Getting Recently Played Tracks");
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
        console.log("Fetched Details: ",playlistDetails)
  
        setPlaylists({loadingStatus: false , $playlists: playlistDetails})
        console.log("Updataed State:  ",playlists)
  
      }
      getRecentlyPlayedTracks()
    } , [accessToken])
  
  
  
    console.log("State: ",playlists)
    return(
      <div className="home__super">
        {/* Playback History */}
        <div className="home__playlist__card__outer">
            <h3>Playback History</h3>
            <br />
            <div>
              {
                playlists.loadingStatus ? 
                    playlists.$playlists.map((item , i)=><HomePlaylistCard loading={true} key={i}/>):
                    playlists.$playlists.map((playlist)=><HomePlaylistCard key={playlist[2]} loading={false} coverImage={playlist[0]} title={playlist[1]}/>)
              }
            </div>
        </div>

        {/* Artists */}
              
        {/* Best Playlists */}
        {/* Recomended Stations */}
        {/* Sweat Hours */}
      </div>
    )
  }
  
  function HomePlaylistCard({loading , coverImage , title}){  
      return(
  
         <div className="playlist__card">
            {loading ? <div className="playlist__card__image__load"> </div> : <img src={coverImage} alt="playlist-cover" onError={()=>console.log("Error Loading Image")}/>}
            {loading ? <p className="playlist__card__title__load"></p> : <p>{title}</p>}
        </div>
      )
  }
  
  
  
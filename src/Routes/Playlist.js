import React , {useEffect, useState}from "react"
import { Spotify } from "../Components/Webplayer";
import { useParams } from "react-router-dom";
import Banner from "../Components/Banner";
import { Controls } from "../Components/Controls";
import Songs from "../Components/Songs";



export default function Playlist(){
  const {playlistId} = useParams();
  let [playlistDetails , setPlaylistDetails] = useState()
  let [songsData , setSongsData] = useState();
  let [listType , setlistType] = useState(false);
  useEffect(()=>{
    const getPlaylistsFromSpotify = async ()=>{
      setPlaylistDetails(false)
      let response = await Spotify.getPlaylist(playlistId);
      console.clear();
      // console.log("Playlist Details: ",response)
      // console.log("Playlist Tracks: ",response.tracks.items[0]);
      // console.log("Song Added on: " , response.tracks.items[0].added_at.split("T")[0]);
      // console.log("Artists: " , response.tracks.items[0].track.artists)
      // console.log("Song name: " , response.tracks.items[0].track.album.name)
      // console.log("Song Duration: " , response.tracks.items[0].track.duration_ms);
      setPlaylistDetails(response)
      setSongsData(response.tracks.items)
    }
    getPlaylistsFromSpotify();
  } , [playlistId]);
    return(
        playlistDetails ? 
        <>
            <Banner 
                  coverImage={playlistDetails.images[0].url}
                  type={playlistDetails.type}
                  name={playlistDetails.name}
                  description={playlistDetails.description}
                  ownerName={playlistDetails.owner.display_name}
                  totalTracks={playlistDetails.tracks.total}
                  likes={playlistDetails.followers.total}
                  id={playlistId}
                  bannerType = {"playlist"}
                  loading = {false}
            />
            {<Controls changeListType={setlistType}/>}
            {<Songs data = {songsData} listType={listType}/>}
        </> :

      <Banner loading={true}/>
    )
}









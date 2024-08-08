import React , {useEffect, useState}from "react"
import { Spotify } from "../Components/Webplayer";
import { useParams } from "react-router-dom";
import Banner from "../Components/Banner";
import { Controls } from "../Components/Controls";
import Songs from "../Components/Songs";

export default function Playlist({musicPlayerTracksChanger}){
  const {playlistId} = useParams();
  let [playlistDetails , setPlaylistDetails] = useState()
  let [songsData , setSongsData] = useState();
  let [listType , setlistType] = useState(false);

  useEffect(()=>{
    const getPlaylistsFromSpotify = async ()=>{
      setPlaylistDetails(false)
      let response = await Spotify.getPlaylist(playlistId);
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
            {<Controls changeListType={setlistType} stateChanger = {musicPlayerTracksChanger} data = {songsData} type={'playlist'}/>}
            {<Songs data = {songsData} listType={listType} />}
        </> :
      <Banner loading={true}/>
    )
}









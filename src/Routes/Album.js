import React ,{useEffect  , useState}from 'react';
import { useParams } from 'react-router-dom'
import { Spotify } from '../Components/Webplayer';
import Songs from '../Components/Songs';
import { Controls } from '../Components/Controls';
import Banner from '../Components/Banner';

function Album() {
  let {albumId} = useParams();
  let [albumDetails , setAlbumDetails] = useState();
  let [albumSongs , setAlbumSongs] = useState();
  let [listType , setlistType] = useState(false);

  useEffect(()=>{
    const getAlbumCompleteDetails = async()=>{
      try{
          let response = await Spotify.getAlbum(albumId);
          console.clear();
          console.log("Album Details From Album Component: " , response)
          setAlbumDetails(response)
          setAlbumSongs(response.tracks.items)
      }
      catch{
        console.log("Error Fetching Album")
      }
    }
    getAlbumCompleteDetails();
  }  , [albumId]);
  console.log("Album Songs: " , albumSongs)
  return (
    <>
        {albumDetails ?  <Banner loading={false} coverImage={albumDetails.images[0].url} type={albumDetails.album_type} name={albumDetails.name} ownerName={albumDetails.artists[0].name} totalTracks={albumDetails.tracks.total} releasedDate={albumDetails.release_date.split("-")[0]} bannerType={"Album"}/>: <Banner loading={true}/>}
        {<Controls changeListType={setlistType}/>}
        {albumDetails && <Songs data={albumSongs} listType={listType} requestType={"album"} albumRealese = {albumDetails.release_date} albumName = {albumDetails.name} albumCoverImage={albumDetails.images[0].url}/>}
    
  
    </>
  )
}



export default Album
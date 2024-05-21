import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Spotify } from '../Components/Webplayer';
import Banner from '../Components/Banner'
import { Controls } from '../Components/Controls';
import Songs from '../Components/Songs';


function Artist() {
  let {artistId} = useParams();
  let [artistDetails , setArtistDetails] = useState();
  let [artistSongs , setArtistSongs] = useState();
  let [listType , setlistType] = useState(false);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        let response = await Spotify.getArtist(artistId);
        let songs = await Spotify.getArtistTopTracks(artistId);
        // console.clear();
        // console.log("Artist Details: ", response);
        // console.log("Artist Songs: ", songs);
        let details = {
          id: response.id,
          coverImage: response.images[0].url,
          followers: response.followers.total,
          artistName: response.name
        };
        setArtistDetails(details);
        setArtistSongs(songs.tracks);
      } catch (error) {
        console.error('Error fetching artist data:', error);
      }
    };
    
    fetchArtistData();
  }, [artistId]);

console.log("Songs: " , artistSongs)
  return (
    <>
      {artistDetails  ? <Banner loading={false} coverImage={artistDetails.coverImage} name={artistDetails.artistName} followers={artistDetails.followers} id={artistDetails.id} bannerType ={"Artist"}/> : <Banner loading={true}/>}
      {<Controls changeListType={setlistType}/>}
      {artistDetails && <Songs listType={listType} data={artistSongs} requestType = "artist"/>}
      
      

    </>
  )
}












export default Artist
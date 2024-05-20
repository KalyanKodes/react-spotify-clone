import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spotify } from '../Components/Webplayer';
import { myContext } from '../App';

function Artist() {
  let {artistId} = useParams();
  let {accessToken} = useContext(myContext);

  useEffect(()=>{
    const testing = async()=>{
        let response = await Spotify.getArtist(artistId);
        console.clear();
        console.log("Artist Details From Artist Component: " , response)
    }
    testing();
  });
  return (
    <>
      <div>Artist Component</div>
      <h1>Artist id: {artistId}</h1>
    </>
  )
}

export default Artist
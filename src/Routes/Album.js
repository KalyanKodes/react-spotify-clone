import React ,{useEffect , useContext}from 'react';
import { useParams } from 'react-router-dom'
import { Spotify } from '../Components/Webplayer';
import { myContext } from '../App';

function Album() {
  let {albumId} = useParams();
  let {accessToken} = useContext(myContext);

  useEffect(()=>{
    const testing = async()=>{
        let response = await Spotify.getAlbum(albumId);
        console.clear();
        console.log("Album Details From Album Component: " , response)
    }
    testing();
  } );
  return (
    <>
      <div>Album Component</div>  
      <h1>Album Id: {albumId}</h1>
    </>
  )
}

export default Album
import React , {useEffect , useContext} from 'react'
import { useParams } from 'react-router-dom';
import { myContext } from '../App';
import { Spotify } from '../Components/Webplayer';


function Playlist() {
  let {playlistId} = useParams();
  let {accessToken} = useContext(myContext);

  useEffect(()=>{
    const testing = async()=>{
        let response = await Spotify.getPlaylist(playlistId);
        console.clear()
        console.log("Playlist Details From Playlist Component: " , response)
    }
    testing();
  } );
  return (
    <>
      <div>Playlist Component</div>
      <h1>Playlist Id: {playlistId}</h1>
    </>
  )
}

export default Playlist
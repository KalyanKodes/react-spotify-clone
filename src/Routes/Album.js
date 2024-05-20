import React ,{useEffect , useContext , useState}from 'react';
import { useParams } from 'react-router-dom'
import { Spotify } from '../Components/Webplayer';
import { myContext } from '../App';
import { ColorExtractor } from 'react-color-extractor';
import { type } from '@testing-library/user-event/dist/type';
import { Controls } from './Playlist';
import { Audio } from './Playlist';

function Album() {
  let {albumId} = useParams();
  let {accessToken} = useContext(myContext);
  let [albumDetails , setAlbumDetails] = useState();
  let [albumSongs , setAlbumSongs] = useState();
  useEffect(()=>{
    const testing = async()=>{
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
    testing();
  }  , [albumId]);
  return (
    <>
        {!albumDetails ? <AlbumBanner loading={true}/> : <AlbumBanner loading={false} coverImage={albumDetails.images[0].url} type={albumDetails.album_type} name={albumDetails.name} ownerName={albumDetails.artists[0].name} totalTracks={albumDetails.tracks.total} releasedDate={albumDetails.release_date.split("-")[0]}/>}
        <Controls/>
        <Audio heading={true}/>
        <hr className='songs__hr'/>
        {albumDetails && albumSongs.map((song, i) => (<Audio
          key={i}
          trackNumber={i + 1}
          addedOn={albumDetails.release_date}
          artists={song.artists}
          songName={song.name}
          songDuration={song.duration_ms}
          albumName={albumDetails.name}
        />))
  }
    </>
  )
}





function AlbumBanner({ coverImage, type, name, ownerName, totalTracks, releasedDate , id , loading}) {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');


  // I Tried to understand this function but no use. 
  // This function is part of extracting the dominent color of the image.
  const handleColors = (colors) => {
    if (colors.length > 0) {
      setBackgroundColor(colors);
      changeBackgroundColor();
    }
  };
  const changeBackgroundColor = ()=>{
    let element = document.getElementById('super');
    element.style.background =  `linear-gradient(${backgroundColor[1]}  ,  #131819 , #121212)`
  }
  changeBackgroundColor();




  // console.log("Background Color: ", backgroundColor);

  return (
    !loading ? 
    <div className="banner__super" >
      <div className="banner__left">
        <ColorExtractor getColors={handleColors}>
          <img src={coverImage} alt="playlist" className='banner__image' width={250} height={250} />
        </ColorExtractor>
      </div>
      <div className="banner__right">
        <p className='banner__right__one'>{type}</p>
        <h1 className='banner__right__heading'>{name}</h1>
        <p className='banner__right__bottom'>
          &#x2022; <span>{ownerName}</span> &#x2022; {releasedDate}  &#x2022; {totalTracks} {totalTracks > 1 ? "Songs" : "Song"} &#x2022;
        </p>
      </div>
    </div> : 
    <div className="banner__super__load">
        <div className="banner__left__load">
            <div alt="playlist" className='banner__image__load'></div>
        </div>
        <div className="banner__right__load">
            <p className='banner__right__one__load'></p>
            <h1 className='banner__right__heading__load'> </h1>
            <p className='banner__right__description__load'></p>
            <p className='banner__right__bottom__load'></p>
        </div>
    </div>
  );
}


export default Album
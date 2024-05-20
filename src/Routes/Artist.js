import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Spotify } from '../Components/Webplayer';
import { myContext } from '../App';
import { ColorExtractor } from 'react-color-extractor';
import { Controls } from './Playlist';
import { Audio } from './Playlist';

function Artist() {
  let {artistId} = useParams();
  let {accessToken} = useContext(myContext);
  let [artistDetails , setArtistDetails] = useState();
  let [artistSongs , setArtistSongs] = useState();

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        let response = await Spotify.getArtist(artistId);
        let songs = await Spotify.getArtistTopTracks(artistId);
        console.clear();
        console.log("Artist Details: ", response);
        console.log("Artist Songs: ", songs);
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

 /*  useEffect(() => {
    if (artistSongs && artistSongs.length > 0) {
      let songDetails = artistSongs.map((song, i) => (<Audio
              key={i}
        trackNumber={i + 1}
      addedOn={song.album.release_date}
      artists={song.artists}
      songName={song.name}
      songDuration={song.duration_ms}
      albumName={song.album.name}
    />));
      console.log("Songs Details: ", songDetails);
    }
  }, [artistSongs]);
    console.log("State: ",artistDetails[0]) */
  return (
    <>
      {artistDetails  ? <ArtistBanner loading={false} coverImage={artistDetails.coverImage} artistName={artistDetails.artistName} followers={artistDetails.followers} id={artistDetails.id}/> : <ArtistBanner loading={true}/>}
      <Controls/>
      <Audio heading={true}/>
      <hr className='songs__hr'/>
      {artistSongs && artistSongs.map((song, i) => (<Audio
        key={i}
        trackNumber={i + 1}
        addedOn={song.album.release_date}
        artists={song.artists}
        songName={song.name}
        songDuration={song.duration_ms}
        albumName={song.album.name}
      />))
}
    </>
  )
}

// {
//   artistDetails &&  artistSongs.map((song, i) => (
    // <Audio
    //     key={i} // It's good practice to add a unique key for each item
    //     trackNumber={i + 1}
    //     addedOn={song.album.release_date}
    //     artists={song.artists}
    //     songName={song.name}
    //     songDuration={song.duration_ms}
    //     albumName={song.album.name}
    //   />
//     /





function ArtistBanner({ coverImage, artistName , followers , id , loading}) {
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
    <div>
      {!loading ? (
        <div className="banner__super">
          <div className="banner__left">
            <ColorExtractor getColors={handleColors}>
              <img src={coverImage} alt="playlist" className="banner__image banner__image__artist" width={250} height={250} />
            </ColorExtractor>
          </div>
          <div className="banner__right">
            <h1 className="banner__right__heading">{artistName}</h1>
            <p className="banner__right__bottom"> &#x2022; {followers} Followers &#x2022;</p>
          </div>
        </div>
      ) : (
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
  )}
  </div>
  );
  
}

export default Artist
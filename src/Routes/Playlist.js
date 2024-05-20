import React , {useEffect, useState}from "react"
import { faPlay , faList , faPause, faHamburger} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../Styles/playlist.css";
import { Spotify } from "../Components/Webplayer";
import { useParams } from "react-router-dom";
import { ColorExtractor } from "react-color-extractor";
import "../Styles/controls.css"
import { faClock } from "@fortawesome/free-solid-svg-icons";
import "../Styles/songs.css"



// {
//   trackNumber: response.tracks.items[0].added_at.split("T")[0],
//   addedOn: response.tracks.items[0].added_at.split("T")[0],
//   artists: response.tracks.items[0].track.artists,
//   songName: response.tracks.items[0].track.album.name,
//   songDuration: response.tracks.items[0].track.duration_ms
// }

function Songs({data}){

  console.log("Data: ",[data][0].map((song)=>song.track.name))
  console.log("Data: ",data.map((song)=>song.track.name));
  console.log(Array.isArray(data) , "Data Checking")
  return (
    <div className="songs__super">
      <Audio heading={true}/>  
      <hr className="songs__hr"/>


     {
      data.map((song, i) => (
        <Audio
            key={i} // It's good practice to add a unique key for each item
            trackNumber={i + 1}
            addedOn={song.added_at.split("T")[0]}
            artists={song.track.artists}
            songName={song.track.name}
            songDuration={song.track.duration_ms}
            albumName={song.track.album.name}
          />
        ))
      }
       

    </div>
  )
}

export function Audio({trackNumber , addedOn , artists , songName , songDuration , coverImage , heading , albumName}){
// console.clear();
  console.log("Front Audio Component")
  console.log("Track Number",trackNumber);
  console.log("Added On",addedOn);
  console.log("Artists: ",artists);
  console.log("Song Name: ",songName);
  console.log("Album Name: ",albumName)
  console.log("Song Duration: ",songDuration);
  console.log("Cover Image: ",coverImage);
  console.log("Heading: ",heading)
  const millisecondsToMinutesAndSeconds = (milliseconds) => {
    // Convert milliseconds to seconds
    const totalSeconds = Math.floor(milliseconds / 1000);
    // Calculate minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    // Return the result as a string
    return `${minutes}:${seconds}`;
  };
  let duration = millisecondsToMinutesAndSeconds(songDuration)

      return(
        <>
          <div className= {heading ? "songs__wrapper" : "songs__wrapper songs__wrapper__audio"}>
            {heading ? 
              <>
                <div className="first__tags">
                    <span className="heading__1">#</span>
                    <span className="heading__2">Title</span>
                </div>
                    <span className="heading__3">Artist</span>
                    <span className="heading__4">Album</span>
                    <span className="heading__5">Date added</span>
                    <span className="heading__6"><FontAwesomeIcon icon={faClock}/></span> 
              </> : 
              <>
                <div className="first__tags first__tags__audio">
                    <span className="track__number">{trackNumber}</span>
                    <span className="song__name">{songName}</span>
                </div>
                    <span className="artist__name">{artists.map((a)=>a.name+" ")}</span>
                    <span className="album__name">{albumName}</span>
                    <span className="song__addedon">{addedOn}</span>
                    <span className="song__duration">{duration}</span> 
              </> 
            }
          </div>
        </>
      )
}
export default function Playlist(){
  
  const {playlistId} = useParams();
  let [playlistDetails , setPlaylistDetails] = useState()
  let [songsData , setSongsData] = useState();
  useEffect(()=>{
    const test = async ()=>{
      let response = await Spotify.getPlaylist(playlistId);
      console.clear();
      console.log("Playlist Details: ",response)
      console.log("Playlist Tracks: ",response.tracks.items[0]);
      console.log("Song Added on: " , response.tracks.items[0].added_at.split("T")[0]);
      console.log("Artists: " , response.tracks.items[0].track.artists)
      console.log("Song name: " , response.tracks.items[0].track.album.name)
      console.log("Song Duration: " , response.tracks.items[0].track.duration_ms);
      setPlaylistDetails(response)
      // setSampleSongsDetails(
      //     {
      //       addedOn: response.tracks.items[0].added_at.split("T")[0],
      //       artists: response.tracks.items[0].track.artists,
      //       songName: response.tracks.items[0].track.album.name,
      //       songDuration: response.tracks.items[0].track.duration_ms,
      //       albumName: response.tracks.items[0].track.album.name
      //     })
          setSongsData(response.tracks.items)
          // console.log(sampleSongsDetails)
      // {trackNumber , addedOn , artists , songName , songDuration , coverImage , heading}
    }
    test()
    // {coverImage , type , name , description , ownerName , totalTracks , likes}
  } , [playlistId]);
    return(
        playlistDetails ? 
        <>
            <PlaylistBanner 
                  coverImage={playlistDetails.images[0].url}
                  type={playlistDetails.type}
                  name={playlistDetails.name}
                  description={playlistDetails.description}
                  ownerName={playlistDetails.owner.display_name}
                  totalTracks={playlistDetails.tracks.total}
                  likes={playlistDetails.followers.total}
                  id={playlistId}
            />
            {<Controls/>}
            {<Songs data = {songsData}/>}
        </> :

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
    )
}




function PlaylistBanner({ coverImage, type, name, description, ownerName, totalTracks, likes , id}) {
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
    <div className="banner__super" >
      <div className="banner__left">
        <ColorExtractor getColors={handleColors}>
          <img src={coverImage} alt="playlist" className='banner__image' width={250} height={250} />
        </ColorExtractor>
      </div>
      <div className="banner__right">
        <p className='banner__right__one'>{type}</p>
        <h1 className='banner__right__heading'>{name}</h1>
        <p className='banner__right__description'>{description}</p>
        <p className='banner__right__bottom'>
          &#x2022; <span>{ownerName}</span> &#x2022; {likes} Likes &#x2022; {totalTracks} Songs &#x2022;
        </p>
      </div>
    </div>
  );
}


export function Controls(){
    let [playing , setPlaying] = useState(false);
    let [showControls , setShowControls] = useState(false);
    let [listType , setListType] = useState('List');
    return(
        <div className="controls__super">
            <FontAwesomeIcon icon={playing ? faPause : faPlay} className='controls__super__play__button' onClick={()=>{setPlaying((status)=> !status)}}/>
            <div style={{display: 'flex' , gap:'10px' , justifyContent: 'center' , alignItems:'center'}}>
                <small>{listType}</small>
                <FontAwesomeIcon icon={listType === 'List' ? faList : faHamburger} className='controls__super__list' onClick={()=>setShowControls(!showControls)}/>
            </div>

            {showControls && <div className="controls__list__song__list">
                <small>View as</small>
                <hr />
                <div className="compact" onClick={()=>{
                    setListType("Compact");
                    setShowControls(false);
                }} style={{color: listType === "Compact" ? "green" : 'white'}}>
                    <FontAwesomeIcon icon={faHamburger}/>
                    Compact
                    {listType === "Compact" &&  "✓"}
                </div>
                <div className="list" onClick={()=>{
                    setListType("List");
                    setShowControls(false);
                }} style={{color: listType === "List" ? "green" : 'white'}}>
                    <FontAwesomeIcon icon={faList}/>
                    List
                    {listType === "List" &&  "✓"}
                </div>
            </div>}
        </div>
    )
}


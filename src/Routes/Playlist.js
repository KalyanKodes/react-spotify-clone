import React , {useEffect, useState}from "react"
import { faPlay , faList , faPause, faHamburger} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../Styles/playlist.css";
import { Spotify } from "../Components/Webplayer";
import { useParams } from "react-router-dom";
import { ColorExtractor } from "react-color-extractor";


export default function Playlist({_playlist}){
  
  const {playlistId} = useParams();
  let [playlistDetails , setPlaylistDetails] = useState()
  useEffect(()=>{
    const test = async ()=>{
      let response = await Spotify.getPlaylist(playlistId);
      console.clear();
      // console.log(response)
      setPlaylistDetails(response)
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
            {/* <Controls/> */}
            {/* <Songs playlistId = {_playlist.id}/> */}
        </> :

    <div className="playlist__banner__super__load">
        <div className="playlist__banner__left__load">
            <div alt="playlist" className='playlist__banner__image__load'></div>
        </div>
        <div className="playlist__banner__right__load">
            <p className='playlist__banner__right__one__load'></p>
            <h1 className='playlist__banner__right__heading__load'> </h1>
            <p className='playlist__banner__right__description__load'></p>
            <p className='playlist__banner__right__bottom__load'></p>
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




  console.log("Background Color: ", backgroundColor);

  return (
    <div className="playlist__banner__super" >
      <div className="playlist__banner__left">
        <ColorExtractor getColors={handleColors}>
          <img src={coverImage} alt="playlist" className='playlist__banner__image' width={300} height={300} />
        </ColorExtractor>
      </div>
      <div className="playlist__banner__right">
        <p className='playlist__banner__right__one'>{type}</p>
        <h1 className='playlist__banner__right__heading'>{name}</h1>
        <p className='playlist__banner__right__description'>{description}</p>
        <p className='playlist__banner__right__bottom'>
          &#x2022; <span>{ownerName}</span> &#x2022; {likes} Likes &#x2022; {totalTracks} Songs &#x2022;
        </p>
      </div>
    </div>
  );
}


function Controls(){
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


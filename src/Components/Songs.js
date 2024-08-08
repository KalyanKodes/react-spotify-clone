import React, { useContext, useEffect, useRef }  from "react";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../Styles/songs.css"
import spotifyLogo from '../Assests/spotifyDiscoverWeeklyLogo.png';
import { songChangeContext } from "./Webplayer";

export default function Songs({data , listType , requestType , albumRealese , albumName , albumCoverImage }){
    return (
      <div className="songs__super">
        <hr className="songs__hr"/>
       {
          data.map((song, i) => (
            <Audio
                key={i} 
                id = {requestType === "artist" || requestType === 'album' ? song.id : song.track.id}
                trackNumber={i + 1}
                addedOn={requestType === "artist" ? song.album.release_date : requestType ===  "album" ? albumRealese : song.added_at.split("T")[0]}
                artists={requestType === "artist" || requestType === "album" ? song.artists : song.track.artists}
                songName={requestType === "artist" || requestType === "album" ? song.name : song.track.name}
                songDuration={requestType === "artist" || requestType === "album" ? song.duration_ms : song.track.duration_ms}
                albumName={requestType === "artist" ? song.album.name : requestType === "album" ? albumName :song.track.album.name}
                listType = {!listType}
                coverImage={requestType === "artist" ? song.album.images[0].url : requestType === "album" ? albumCoverImage : song.track.album.images[0].url}
            />
            ))
        }
      </div> 
    )
  }

export function Audio({trackNumber , addedOn , artists , songName , songDuration , coverImage , heading , albumName , listType , id}){
  let {setTrack} = useContext(songChangeContext);
  let songTag = useRef();

  const millisecondsToMinutesAndSeconds = (milliseconds) => {
      const totalSeconds = Math.floor(milliseconds / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}:${seconds}`;
  };
  let duration = millisecondsToMinutesAndSeconds(songDuration);

  const feedback = (e)=>{
        let wrappers = document.querySelectorAll('.songs__wrapper__audio');
        wrappers.forEach((wrapper)=>{
          wrapper.style.background = "unset";
        })
        songTag.current.style.background = '#636561';
        setTrack(id)
  }
    
  return(<><div className= {heading ? "songs__wrapper" : "songs__wrapper songs__wrapper__audio"} onClick={!heading ? feedback : console.log("")} ref={songTag } id="$songContainer">
            {
                heading ? 
                  <>
                      <div className="no__space">
                        <div className="first__tag">#</div>
                        <div className="song__name__heading">Title</div>
                      </div>
                          {listType && <div className="artist__name__heading">Artist</div>}
                          <div className="album__name__heading">Album</div>
                          <div className="song_-addedon__heading">Date added</div>
                          <div className="song__duration__heading"><FontAwesomeIcon icon={faClock}/></div>
                  </> : 
                  <>
                    <div className="no__space" onClick={()=>{feedback()}}>
                         <div className="track__number first__tag">{trackNumber}</div>
                          <div className= {listType ? "song__name" : "song__name__compact"}>
                          {
                              listType ?
                              songName : 
                              <div className="song__image__artists">
                                  <img src={coverImage} alt={albumName} width={50} onError={()=>{this.src = spotifyLogo}}/>
                                  <div className="song__details__compact">
                                      <p className="song__name">{songName}</p>
                                      <p className="artist__name">{artists.map((artist)=>artist.name + ",")}</p>
                                  </div>
                              </div>
                          }
                      </div>
                      </div>
                          {listType && <div className="artist__name">{artists.map((artist)=>artist.name + " ")}</div>}
                          <div className="album__name">{albumName}</div>
                          <div className="song__addedon">{addedOn}</div>
                          <div className="song__duration">{duration}</div>
                    </> 
              } 
          </div></>
        )
}
import React, { useContext, useEffect, useRef }  from "react";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../Styles/songs.css"
import spotifyLogo from '../Assests/spotifyDiscoverWeeklyLogo.png';
import { songChangeContext } from "./Webplayer";





export default function Songs({data , listType , requestType , albumRealese , albumName , albumCoverImage }){

  

  // console.log("Song Changer Function: ",setTrack)
  // console.clear();
  

  // useEffect(()=>{
  //   const changeSong = ()=>{
  //     console.log("Changing Song")
  //     setTrack("4jfHNGbzF5EGAD3iET0lsd")
  //   }
  //   changeSong();
  // } , [])
  
  data.forEach((song, i) => {
    // console.clear();
    // console.log("Data: ",data)
      // console.log("key=", i);
      // console.log("trackNumber=", i + 1);
      // console.log("addedOn=", requestType === "artist" ? song.album.release_date : requestType ===  "album" ? albumRealese : song.added_at.split("T")[0]);
      // console.log("artists=", requestType === "artist" || requestType === "album" ? song.artists : song.track.artists);
      // console.log("songName=", requestType === "artist" || requestType === "album" ? song.name : song.track.name);
      // console.log("songDuration=", requestType === "artist" || requestType === "album" ? song.duration_ms : song.track.duration_ms);
      // console.log("albumName=", requestType === "artist" ? song.album.name : requestType === "album" ? albumName :song.track.album.name);
      // console.log("listType=", !listType);
      // console.log("coverImage=", requestType === "artist" ? song.album.images[0].url : requestType === "album" ? albumCoverImage : song.track.album.images[0].url);
      // console.log("Preview Track: " , requestType === "artist" || requestType === 'album' ? song.preview_url : song.track.preview_url);
      // console.log("Track Id: " , requestType === "artist" || requestType === 'album' ? song.id : song.track.id);
  });
  
  
  


    return (
      <div className="songs__super">
        <Audio heading={true} listType={!listType}/>  
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
    // console.clear();
    
      // console.log("Front Audio Component")
      // console.log("Track Number",trackNumber);
      // console.log("Added On",addedOn);
      // console.log("Artists: ",artists);
      // console.log("Song Name: ",songName);
      // console.log("Album Name: ",albumName)
      // console.log("Song Duration: ",songDuration);
      // console.log("Cover Image: ",coverImage);
      // console.log("Heading: ",heading)
      // console.log("List Type: " , listType)
      let songTag = useRef();
      const millisecondsToMinutesAndSeconds = (milliseconds) => {
        // Convert milliseconds to seconds
        const totalSeconds = Math.floor(milliseconds / 1000);
        // Calculate minutes and seconds
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        // Return the result as a string
        return `${minutes}:${seconds}`;
      };
      let duration = millisecondsToMinutesAndSeconds(songDuration);

      const feedback = (e)=>{
        // console.log("Song Clicked")
        // console.log(document.getElementById('$songContainer'));
        // console.log(e)
        // console.log(songTag.current);
        let wrappers = document.querySelectorAll('.songs__wrapper__audio');

        wrappers.forEach((wrapper)=>{
          wrapper.style.background = "unset";
        })
        songTag.current.style.background = '#636561';
        setTrack(id)
      }
    
          return(
            <>
              <div className= {heading ? "songs__wrapper" : "songs__wrapper songs__wrapper__audio"} onClick={!heading ? feedback : console.log("")} ref={songTag } id="$songContainer">
                {heading ? 
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
              </div>
            </>
          )
    }


    



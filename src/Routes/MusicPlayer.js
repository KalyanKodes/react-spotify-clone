import React, { useEffect, useRef, useState } from "react";
import "../Styles/musicPlayer.css";
import { Spotify } from "../Components/Webplayer";
import spotifyLogo from '../Assests/spotifyDiscoverWeeklyLogo.png';
import { faPlayCircle , faPauseCircle , faExpand, faVolumeMute, faVolumeHigh, faDownLeftAndUpRightToCenter, faL, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColorExtractor } from "react-color-extractor";

export default function MusicPlayer({track}){
    let [isSongPlaying , setIsSongPlaying] = useState(false);
    let [currentTrack ,setCurrentTrack] = useState()
    let [canPlayStatus , setCanPlayStatus] = useState(true);
    let [error , setError] = useState(false);
    let [isMuted , setIsMuted] = useState(false);
    let [isOnFullScreen , setIsOnFullScreen] = useState(false);
    let [backgroundColor, setBackgroundColor] = useState('#000');
    let audioRef = useRef();
    let superRef = useRef();
    let volumeRef = useRef();
    let musicPlayerSuperRef = useRef();

    useEffect(()=>{
        const getSongInfo = async ()=>{
            setCurrentTrack();
                try{
                    setIsSongPlaying(false)
                    let songResponse = await Spotify.getTrack(track);
                    setCurrentTrack(songResponse)
                }
                catch(e){
                    setError(true)
                    console.log("Something went wrong")
                }
        }
        getSongInfo();
    } , [track]);

    const playSong = ()=>{
        setIsSongPlaying(true);
        audioRef.current.play();
    }

    const pauseSong = ()=>{
        setIsSongPlaying(false);
        audioRef.current.pause();
    }

    const toggleFullScreen = ()=>{
        setIsOnFullScreen(!isOnFullScreen)
        let element = document.getElementById('music__player__super');
        if(!isOnFullScreen){
            changeBackgroundColor();
        }
        else{
            element.style.background =  'black';
        }
    }
    
    // This function is part of extracting the dominent color of the image.
    const handleColors = (colors) => {
      if (colors.length > 0) {
        setBackgroundColor(colors);
      }
    };

    const changeBackgroundColor = ()=>{
        try{
          let element = document.getElementById('music__player__super');
          element.style.background =  `linear-gradient(45deg , ${backgroundColor[2]}  ,  ${backgroundColor[3]} , ${backgroundColor[4]})`;
        }
        catch{
          console.log("error")
        }
    }

    return (
        <div className="music__player__super" id="music__player__super" ref={musicPlayerSuperRef} style={{height: isOnFullScreen ? "100vh" : '80px'}} rel={superRef}>
            { 
                currentTrack ? <>
                    <div className={!isOnFullScreen ? "song__image__artists__music__player" : "song__image__artists__music__player__full__screen"}>
                    <ColorExtractor getColors = {handleColors}>
                        <img src={currentTrack.album.images[0].url} alt={currentTrack.name} width={60} onError={()=>{this.src = spotifyLogo}}/>
                    </ColorExtractor>
                        <div className={!isOnFullScreen ? "song__details__compact__music__player " : "song__details__compact__music__player__full__screen"}>
                            <p className={!isOnFullScreen ? "song__name__music__player" : "song__name__music__player__full__screen"}>{currentTrack.name}</p>
                            <p className={!isOnFullScreen ? "artist__name__music__player" : "artist__name__music__player__full__screen"}>{currentTrack.artists.map((artist)=>artist.name + " ")}</p>
                        </div>
                    </div>
                    <div className="music__player__controls">
                            <div className="control__buttons">
                            {
                                currentTrack.preview_url  ? 
                                    <>
                                        <div>
                                            { 
                                                isSongPlaying ? 
                                                    !isOnFullScreen && <FontAwesomeIcon icon={faPauseCircle} className="play__pause__button" onClick={()=>pauseSong()} /> :   
                                                    !isOnFullScreen && <FontAwesomeIcon icon={faPlayCircle} className="play__pause__button" onClick={()=>playSong()} /> 
                                            }
                                        </div>
                                            {
                                                isSongPlaying && !isOnFullScreen ? 
                                                        <div className="playing__feedback">
                                                            <span style={{ '--height': '10px' }}></span>
                                                            <span style={{ '--height': '20px' }}></span>
                                                            <span style={{ '--height': '10px' }}></span>
                                                            <span style={{ '--height': '30px' }}></span>
                                                            <span style={{ '--height': '10px' }}></span>
                                                            <span style={{ '--height': '20px' }}></span>
                                                            <span style={{ '--height': '10px' }}></span>
                                                            <span style={{ '--height': '20px' }}></span>
                                                            <span style={{ '--height': '50px' }}></span>
                                                        </div> : ""
                                            }
                                            
                                    </> 
                                     : !isOnFullScreen && <h1>Song Not available</h1> 
                            }
                            </div>  
                    </div>
                    <audio src={currentTrack.preview_url} ref={audioRef} onEnded={()=> pauseSong()} onCanPlayThrough={()=>{setCanPlayStatus('yes')}} onError={()=>{setCanPlayStatus("no")}}></audio>
                </> 
                :
                 error ? <h2 style={{color: "red" , translate: "0 20px"}}>Something went wrong</h2> : <h1>Loading...</h1>
            }
            {!error && <div className={isOnFullScreen ? "music__controls__volume__controls__full__screen__triger music__controls__volume__controls__full__screen" : "music__controls__volume__controls__full__screen"}>
                <div className="controls__wrapper">
                        <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeHigh} className="speaker__icon" onClick={()=>{
                                if(isMuted){
                                    setIsMuted(false);
                                    audioRef.current.volume = 1;
                                    volumeRef.current.value = 1;
                                    
                                }
                                else{
                                    setIsMuted(true);
                                    audioRef.current.volume = 0;
                                    volumeRef.current.value = 0;
                                }
                        }}/>
                        <input type="range" className="volume__range" ref={volumeRef} onChange={(e)=>{
                            audioRef.current.volume = e.target.value
                            if(e.target.value === 0){
                                setIsMuted(true)
                            }else{
                                setIsMuted(false)
                            }
                        }} min={0} max={1} step={0.1}/>
                        <FontAwesomeIcon icon={isOnFullScreen ? faDownLeftAndUpRightToCenter : faExpand} className="full__screen__icon" onClick={()=>{toggleFullScreen()}}/>
                </div>
            </div>}
        </div>
    )
}

import React , {useState} from "react";
import { ColorExtractor } from "react-color-extractor";
import "../Styles/banner.css"
import spotifyLogo from '../Assests/spotifyDiscoverWeeklyLogo.png'

export default function Banner({ coverImage, type, name, description, ownerName, totalTracks, likes , id , bannerType , loading , followers , releasedDate}) {
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
    // I Tried to understand this function but no use. 
    // This function is part of extracting the dominent color of the image.
    // console.log("Banner Type: " , bannerType)
    const handleColors = (colors) => {
      if (colors.length > 0) {
        setBackgroundColor(colors);
        changeBackgroundColor();
      }
    };
    
    const changeBackgroundColor = ()=>{
      try{
        let element = document.getElementById('super');
        element.style.background =  `linear-gradient(${backgroundColor[1]}  ,  #131819 , #121212)`
      }
      catch{
        console.log("error")
      }
    }
    changeBackgroundColor();
  
    return (
        loading ? 
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
        </div> : 
        <div className="banner__super" >
          <div className="banner__left">
            <ColorExtractor getColors={handleColors}>
              <img src={coverImage} alt="playlist" className= {bannerType === "Artist" ? "banner__image__artist banner__image" : "banner__image"} width={250} height={250} onError={(e)=> e.target.src = spotifyLogo}/>
            </ColorExtractor>
          </div>
          <div className="banner__right">
            <p className='banner__right__one'>{bannerType}</p>
            <h1 className='banner__right__heading'>{name}</h1>
            <p className='banner__right__description'>{description}</p>
          {
            bannerType === "Artist" ? <p className="banner__right__bottom">&#x2022; {followers} Followers &#x2022;</p> :          bannerType === "Album" ? <p>&#x2022; <span>{ownerName}</span> &#x2022; {releasedDate}  &#x2022; {totalTracks} {totalTracks > 1 ? "Songs" : "Song"} &#x2022;</p> :   <p className="banner__right__bottom">&#x2022; <span>{ownerName}</span> &#x2022; {likes} Likes &#x2022; {totalTracks} Songs &#x2022;</p>
          } 
          </div>
      </div>
    );
  }
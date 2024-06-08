import React, { useContext, useEffect, useState } from 'react'
import "../Styles/sideBar.css";
import { faHome , faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadingImage from '../Assests/loadingBanner.png';
import { myContext } from '../App';
import { topPlaylists } from '../playlistsId';
import { Link } from 'react-router-dom';
import { Spotify } from './Webplayer';




function PlaylistCard({status , imageUrl , playlistName ,ownerName , id}) {
    return (
     
      <div className="webplayer__side__bar__bottom__playlist__item">
      {
          status ? 
          <img src={loadingImage} alt="spotify-loading-banner" className='playlist__item__loading__image'/> : 
          <>
              <div className="playlist__item__image">
              <Link to={`/playlist/${id}`} className='webplayer__side__bar__bottom__playlist__item_a'>
                  <img src={imageUrl} alt="playlist"/>
              </Link>
              
              </div>
              <div className="playlist__item__description">
              <Link to={`/playlist/${id}`} className='webplayer__side__bar__bottom__playlist__item_a'>
                  <p className="playlist__item__name">{playlistName}</p>
              </Link>
                  <p className="playlist__item__owner">Playlist &#x2022; {ownerName}</p>
              </div>
          </>
      }
  </div>
      
    )
  }
  









function SideBar() {
    let [loading , setLoading] = useState(true);
    let [playlists , setPlaylists] = useState()
    let {accessToken} = useContext(myContext)
    let _playlists = [];
    useEffect(
        () =>{
            const getPlaylists = async () =>{
                    Spotify.setAccessToken(accessToken)
                    // console.log("Fetching Side Bar Playlists")
                    let returnedList = await Spotify.getFeaturedPlaylists().then((data) => (data.playlists.items));
                    for(let i = 0; i< returnedList.length; i++){
                        _playlists.push(<PlaylistCard status={false}  imageUrl={returnedList[i].images[0].url} key={returnedList[i].id} ownerName={returnedList[i].owner.display_name} playlistName={returnedList[i].name} id = {returnedList[i].id}/>)
                    }
                    // console.log("Fetching Side Bar Playlists Completed")
                    // console.log("Testing Playlist ID");

                    // Spotify.getPlaylist("73pL7GHExZgUOzqAm1TaRE").then((data)=>console.log(data));

                setLoading(false);
                setPlaylists(_playlists)
            }
            getPlaylists();
        } , [accessToken]
    );




  return (
    <>
        {/* Side Bar */}
        <div className="webplayer__side__bar">
            {/* Side Bar Top */}
            <div className="webplayer__side__bar__top">
                <Link to={"/"} >
                    <div className="webplayer__side__bar__top__home"><FontAwesomeIcon icon={faHome} className='webplayer__side__bar__top__icons'/><p>Home</p></div>
                </Link>
                <Link to={"/search"}>
                    <div className="webplayer__side__bar__top__search"><FontAwesomeIcon icon={faSearch} className='webplayer__side__bar__top__icons'/><p>Search</p></div>
                </Link>
                {/* <Link to={"fav"}>
                    <div className="webplayer__side__bar__top__fav"><FontAwesomeIcon icon={faHeart} className='webplayer__side__bar__top__icons'/>Favorates</div>
                </Link> */}
            </div>
            {/* Side Bar Bottom */}
            <div className="webplayer__side__bar__bottom">
                <div className='trending__playlist__heading'>
                    <p className='webplayer__side__bar__bottom__heading'>TRENDING PLAYLISTS</p>
                    <hr />
                </div>
                

                {
                    loading ? topPlaylists.map((list , i)=>{
                        return (
                            <PlaylistCard status={true} key={i}/>
                        )
                    }) : playlists
                }
            </div>
        </div>


    </>
  )
}

export default SideBar
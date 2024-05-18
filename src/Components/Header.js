import React, { useState, useContext, useEffect } from "react";
// import SpotifyWebApi from 'spotify-web-api-js';
import "../Styles/header.css";
import { faDownload, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { myContext } from "../App";
import { Spotify } from "./Webplayer";

export const Header = () => {
    let [showLogout, setShowLogout] = useState(false);
    let { logoutFunction, accessToken } = useContext(myContext);
    let [userName, setUserName] = useState();

    const logout = () => {
        window.location.hash = ""
        logoutFunction(false);
        // alert();
    }

    useEffect(() => {
        const getName = () => {
            if (accessToken === true) {
                setUserName("Spotify User")
            }
            else {
                Spotify.setAccessToken(accessToken);
                Spotify.getMe().then((data) => setUserName(data.display_name));

                
            }
        }
        getName();
    }, [accessToken]);

    return (
        <div className="home__header">
            <div className="home__header__left">
                <p>&lt;</p>
                <p>&gt;</p>
            </div>
            <div className="home__header__right">
                <a href="https://www.spotify.com/in-en/download/windows/">
                    <FontAwesomeIcon icon={faDownload} className='home__header__download' />
                    Install App
                </a>
                <b className='home__header__right__down__symbol' onMouseOver={() => setShowLogout(true)} onMouseOut={() => setShowLogout(false)}>{userName}<FontAwesomeIcon icon={faAngleDown} /> {showLogout && <span className='home__header__logout' onClick={() => logout()}>LogOut</span>}</b>
            </div>
        </div>
    )
}

import React, { useState, useContext, useEffect,  } from "react";
import "../Styles/header.css";
import { faDownload ,faUser} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { myContext } from "../App";
import { Spotify } from "./Webplayer";
import { Link } from "react-router-dom";

export const Header = () => {
    let { logoutFunction, accessToken } = useContext(myContext);
    let [userName, setUserName] = useState();

    const logout = () => {
        window.location.hash = ""
        localStorage.removeItem('login');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('logedinAt');
        logoutFunction(false);
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
            <div className="home__header__right">
                <a href="https://www.spotify.com/in-en/download/windows/" className="install__app">
                    <FontAwesomeIcon icon={faDownload} className='home__header__download' />
                    Install App
                </a>
                <b className='home__header__right__down__symbol'>
                    {userName}
                    <FontAwesomeIcon icon={faUser} /> 
                    <br />
                    </b>
                    <Link to={""} onClick={logout}>Logout</Link>
            </div> 
        </div>
    )
}

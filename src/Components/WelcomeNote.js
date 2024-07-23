import React, { useState } from 'react'
import spotifyImage from '../Assests/spotifyLogo.png';
import "../Styles/welcomeNote.css";

function WelcomeNote() {
  let [clientId , setClientId] = useState("");
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const _clientId = clientId;
  const testing = false; //For testing purpose to swith easily from github url to local redirect url. When pushing to the repo change to false.
  const githubUrl = "https://kalyankodes.github.io/react-spotify-clone/";
  const testingUrl = "http://localhost:3000/";
  const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
  ];

  const accessUrl = `${authEndpoint}?client_id=${_clientId}&redirect_uri=${testing ? testingUrl : githubUrl}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;

  return (
    <div className='welcome__note__outer'>
            <b>Changes applied<b/>
            <img src={spotifyImage} alt="spotify" className='welcome__note__image'/>
            <h1 className='welcome__note__heading'>Spotify Clone using React.js</h1>
            <br /><br />
            <small>
              Spotify Web API requires a Client ID for Authentication. Follow the steps below to obtain it:
              <ul>
                <li>
                  Go to the <strong><a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener noreferrer">Spotify Developer Dashboard</a></strong> and log in with your Spotify account.
                </li>
                <li>
                  Click on "Create an App" and fill out the required details to create a new app.
                </li>
                <li>
                  Once the app is created, you will find the Client ID on the app dashboard.
                </li>
                <li>
                  Set the redirect URI to <code>https://kalyankodes.github.io/react-spotify-clone/</code> in the app settings.
                </li>
              </ul>
              Ensure your Spotify account email matches the email registered with the Client ID.
            </small>
            <br />
            <form action="#" onSubmit={(e)=>e.preventDefault()} className='clientId__form'>
              <input 
                type="text" 
                placeholder='Enter Client ID' 
                value={clientId} 
                onChange={(e)=>setClientId(e.target.value)} 
                required 
              />
              <button className='welcome__note__button' type='submit'>
                <a href={accessUrl}>Connect Spotify</a>
              </button>
            </form>
    </div>
  )
}

export default WelcomeNote;

import React, { createContext, useState } from 'react'
import "./Styles/app.css";
import WelcomeNote from './Components/WelcomeNote';
import Webplayer from './Components/Webplayer';

let accessToken = ""
const getAccessToken = () => {
  let url = window.location.hash;
  let splitedUrl = url.split("=");
  if(localStorage.getItem("login")){
      accessToken = localStorage.getItem("accessToken");
      let timeLeft = -(localStorage.getItem("logedinAt") - new Date().getTime());
      if(timeLeft >= 2400000){
        console.log("Token expired");
        localStorage.removeItem('login');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('logedinAt');
        localStorage.removeItem('recenttQuery');
        alert("Access Token Expired. Please Login Again");
        window.location.hash = ""
        return false;
      }
      return true;
  }
  else if (splitedUrl[1]) {
      accessToken = splitedUrl[1].split("&")[0];
      window.location.hash = '';
      localStorage.setItem("login" , true);
      localStorage.setItem("accessToken" , accessToken);
      localStorage.setItem("recentQuery" , "Hanuman");
      localStorage.setItem("logedinAt" , new Date().getTime())
      return true;
  } else {
      return false;
  }
};

export let myContext = createContext();

function App() {
    let [loginStatus , setLoginStatus] = useState(getAccessToken())
  return (
    <>
      {
        loginStatus ? 
            <myContext.Provider value={{accessToken: accessToken , logoutFunction: setLoginStatus}}>
              <Webplayer /> 
            </myContext.Provider> : 
          <WelcomeNote />
      }
    </>
  )
}

export default App
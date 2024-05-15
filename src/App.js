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
      return true;
  }
  else if (splitedUrl[1]) {
      accessToken = splitedUrl[1].split("&")[0];
      window.location.hash = "";
      localStorage.setItem("login" , true);
      localStorage.setItem("accessToken" , accessToken)
      return true;
  } else {
      return false;
  }
};

// "BQCeoRpzEFxxaM8qChQq8K8LXcD-3nsjVlyh2W5e7dQCpyxGLGQgtTEPFsnDRgg1bA-NFc50tUSGjAUM29SkTk81lW0QmPpSP3TaVjOiw43pPs4ZP4FgyA_bCufp_ehsWbE0wMXO2uP9x8p2-RMV8VWwYoopJi_MBlSrwfPki8j78W6a7hjeYoL5ITJdEd1ac4WoQnjq2Z_hYXCUSh70&token_type"

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
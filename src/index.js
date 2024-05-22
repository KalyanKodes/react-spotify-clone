import React from "react";
import  ReactDOM  from "react-dom/client";
import App from "./App";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";

const root = ReactDOM.createRoot(document.getElementById('root'));

// console.clear();


console.log("Network Status: " , window.navigator.onLine)

window.addEventListener(onoffline,()=>{
  alert("Check Your Intert")
})


root.render(
  window.navigator.onLine ? 
   <App/> : <NoInternet/>
)


function NoInternet(){
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: 'black',
      color: '#721c24',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    },
    icon: {
      fontSize: '50px',
      marginBottom: '20px'
    },
    message: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    subMessage: {
      fontSize: '16px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.icon}>🚫</div>
      <div style={styles.message}>No Internet Connection</div>
      <div style={styles.subMessage}>Please check your network settings and try again.</div>
    </div>
  );
};

export default NoInternet;
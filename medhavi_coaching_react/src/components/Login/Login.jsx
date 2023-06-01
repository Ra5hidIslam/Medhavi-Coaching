import React, { useState } from 'react'
import LoginCSS from './Login.module.css'
import { useLocation } from 'react-router-dom'
// import LoginCSS from './Login.module.css'



function Login({logState,handleLoginClick}) {


  // const[logState,setLogState] = useState(false);
  // // // function to change the state on click of the login button
  // function handleLoginClick(){
  //   setLogState((logState)=> !logState);
  // }

// when logged out
  function logged_out(logState){
    return (
      <div className={LoginCSS.login_option}>
        <button className={LoginCSS.login_buttons} onClick={handleLoginClick}>
          Signup
        </button>
        <button className={LoginCSS.login_buttons}>
          Login
        </button>
      </div>
    )
  }

// when logged in
  function logged_in(){
    return (
      <div>
        <p>Some Data</p>
      </div>
      
    )
  }
  
  

  return(
    <div>
      {logState ? logged_in() : logged_out(logState)}
      {console.log(logState)}
    </div>
    
  )


  }
export default Login
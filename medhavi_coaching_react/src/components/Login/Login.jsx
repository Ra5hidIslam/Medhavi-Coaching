import React, { useState } from 'react'
import LoginCSS from './Login.module.css'
import { useLocation } from 'react-router-dom'
// import LoginCSS from './Login.module.css'



function Login({handleLoginClick}) {


  // const[logState,setLogState] = useState(false);
  // // // // function to change the state on click of the login button
  // function handleLoginClick(){
  //   setLogState((logState)=> !logState);
  // }

// when logged out
  function logged_out(handleLoginClick){
    return (
      <div className={LoginCSS.login_option}>
        <button className={LoginCSS.login_buttons} onClick={handleLoginClick}>
          Login
        </button>
        {/* add onclick go to signup page in the following line */}
        <button className={LoginCSS.login_buttons} >
          SignUp
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
      {sessionStorage.getItem("userId") ? logged_in() : logged_out(handleLoginClick)}
    </div>
    
  )


  }
export default Login
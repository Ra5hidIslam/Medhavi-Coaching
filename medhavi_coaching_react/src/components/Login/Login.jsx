import React, { useState } from 'react'
import LoginCSS from './Login.module.css'
import { useLocation } from 'react-router-dom'




function Login({logState,handleLoginClick}) {


  // const[logState,setLogState] = useState(false);
  // // function to change the state on click of the login button
  // function handleLoginClick(){
  //   setLogState((logState)=> !logState);
  // }

// when logged out
  function logged_out(logState){
    return (
      <>
        <button onClick={handleLoginClick}>
          Signup
        </button>
        <button>
          Login
        </button>
      </>
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
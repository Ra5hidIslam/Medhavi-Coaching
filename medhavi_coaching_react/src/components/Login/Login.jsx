import React, { useState } from 'react'
import LoginCSS from './Login.module.css'
import { useLocation } from 'react-router-dom'
import { getLogin } from '../client/getLogin';
import {Routes, Route, useNavigate} from 'react-router-dom';
import SignUp from '../../pages/SignUp/SignUp';
import { useAuthContext } from '../hooks/useAuthContext';
import getUser from '../client/getUser';
// import { useNavigate } from 'react-router-dom';


const initialFormData = Object.freeze({
  email:"",
  password:""
});


function Login({logState,handleLoginClick}) {

  
  const context = useAuthContext(); 
  const [formData,updateFormData] = useState(initialFormData);

  const handleChange =(e)=>{
    updateFormData({
      ...formData,
      //Trimming any whitespace
      [e.target.name]:e.target.value.trim(),
    });
    console.log(formData);
  };


  const handleSubmit = async (e)=>{
    const loginstate  = await getLogin(formData);
    const user = await getUser(localStorage.getItem("userId"));
    const userJson = JSON.stringify(user);  
    sessionStorage.setItem("user",userJson);
    // console.log("hello");
    if(loginstate == true && sessionStorage.getItem("user")){
      context.dispatch({type:'LOGIN'})
      console.log("New Context",context);
      // window.location.href = '/Blog';
      // navigate("/Blog");
      
      
    }
    else{
      alert("Login failed");
    }
  };


 

  // const[logState,setLogState] = useState(false);
  // // // // function to change the state on click of the login button
  // function handleLoginClick(){
  //   setLogState((logState)=> !logState);
  // }

// when logged out
  function logged_out(logState,handleLoginClick){
    // console.log(logState);
    return (
      
      <div className = {LoginCSS.loginBody}>
        {/* <SignUp className = {LoginCSS.SignUpElement}
            logState={logState}
            handleLoginClick = {handleLoginClick}
        /> */}
        <div >
          <form>
              <div className={LoginCSS.email}>
                <label className={LoginCSS.labelTags}>Email</label>
                <input name = "email" className={LoginCSS.InputBoxes} value = {formData.value} onChange={handleChange}/>
              </div>
              <div className={LoginCSS.password}>
                <label className={LoginCSS.labelTags}>Password</label>
                <input type = "password" className={LoginCSS.InputBoxes} name = "password" value = {formData.value}  onChange={handleChange}/>
              </div>
              {/* <div>
                  <button onClick={handleSubmit}>Submit</button>
              </div> */}
          </form>
        </div>

        <div className={LoginCSS.login_option}>
          

          <button className={LoginCSS.login_button} onClick={handleSubmit}>
            Login
          </button>
          {/* add onclick go to signup page in the following line */}
          {/* <div onClick={handleLoginClick}>Sign Up</div> */}
          <button className={LoginCSS.signup_button} >
            <div onClick={handleLoginClick}>Sign Up</div>
          </button>
        </div>

      </div>
    )
  }

// when logged in
  // function logged_in(){
  //   return (
  //     <div>
  //       <p>Some Data</p>
  //     </div>
      
  //   )
  // }
  
  

  return(
    <div>
      {/* {sessionStorage.getItem("userId") ? logged_in() : logged_out(handleLoginClick)} */}
      {logged_out(logState,handleLoginClick)}
    </div>
    
  )


  }
export default Login
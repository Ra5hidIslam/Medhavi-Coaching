import React, { useState } from 'react'
import LoginCSS from './Login.module.css'
import { useLocation } from 'react-router-dom'
import { getLogin } from '../client/getLogin';
import {Routes, Route, useNavigate} from 'react-router-dom';
import SignUp from '../../pages/SignUp/SignUp';



const initialFormData = Object.freeze({
  email:"",
  password:""
});


function Login({logState,handleLoginClick}) {


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
    // e.preventDefault();
    // const data = new formData(e.target);
    // console.log(formData);\
    // write code to fetch the api
    const loginstate  = await getLogin(formData);
    if(loginstate){
      // console.log()
      // window.location.reload(true);
      window.location.href = '/home';
      // console.log("Logged In")
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
      <div>
        <div >
              <form>
                <div>
                  <label className={LoginCSS.username}>
                      Username
                      <input name = "email" value = {formData.value} onChange={handleChange}/>
                  </label>
                </div>
                <div>
                  <label className={LoginCSS.password}>
                      Password
                      <input type = "password" name = "password" value = {formData.value}  onChange={handleChange}/>
                  </label>
                </div>
                {/* <div>
                    <button onClick={handleSubmit}>Submit</button>
                </div> */}
            </form>
            </div>
        <div className={LoginCSS.login_option}>
        <SignUp
          logState={logState}
          handleLoginClick = {handleLoginClick}
        />
        <button className={LoginCSS.login_buttons} onClick={handleSubmit}>
          Login
        </button>
        {/* add onclick go to signup page in the following line */}
        <button className={LoginCSS.login_buttons} >
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
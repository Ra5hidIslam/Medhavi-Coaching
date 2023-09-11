import React, { useEffect } from 'react';
import { useState } from 'react';
import SignUp from '../../pages/SignUp/SignUp';
import HomeFeed from '../../components/HomeFeed/HomeFeed'
import Login from '../../components/Login/Login';
import LandingCSS from '../LandingPage/Landing.module.css'
// import LoginForm from '../../components/Login/LoginForm';
import LogOut from '../../components/hooks/LogOut';
import useRefreshToken from '../../components/hooks/useRefreshToken';
import getUser from '../../components/client/getUser';


function Landing(){


    const refreshFunction = useRefreshToken();
    const[logState,setLogState] = useState(false);
    // // function to change the state on click of the login button
    function handleLoginClick(){
        setLogState((logState)=> !logState);
        console.log(logState);
    }  
    
    

    const checkToken = async()=>{
         // log the person in and redirect to home page
         const refreshToken = await refreshFunction();
         sessionStorage.setItem("token",refreshToken);
         const user = await getUser(localStorage.getItem("userId"));
         const userJson = JSON.stringify(user);  
         sessionStorage.setItem("user",userJson);
         window.location.href = '/home';
    }


    const landingElement =()=>{
        if(localStorage.getItem("userId")){
           checkToken();
        }
        else{
            return (
                <Login
                        logState = {logState}
                        handleLoginClick = {handleLoginClick}
                />
            )
        }
    }   
    


    useEffect(()=>{
        console.log(logState);
    },[]);
    return(
        <div>
            <div className={LandingCSS.home_body}>
                <SignUp className = {LandingCSS.SignUpElement}
                    logState={logState}
                    handleLoginClick = {handleLoginClick}
                />
                <div className={LandingCSS.login_section}>
                        {landingElement()}
                </div>
            </div>
        
        </div>
        

    
    )
}

export default Landing;
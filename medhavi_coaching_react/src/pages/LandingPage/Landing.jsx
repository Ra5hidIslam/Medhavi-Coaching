import React, { useEffect } from 'react';
import { useState } from 'react';

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
        if(localStorage.getItem("userId")){
            // log the person in and redirect to home page
            const refreshToken = await refreshFunction();
            sessionStorage.setItem("token",refreshToken);
            const user = getUser(localStorage.getItem("userId"));
            sessionStorage.getItem("user",user);
            window.location.href = '/home';
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
                <div className={LandingCSS.login_section}>
                        {checkToken()}
                </div>
            </div>
        
        </div>
        

    
    )
}

export default Landing;
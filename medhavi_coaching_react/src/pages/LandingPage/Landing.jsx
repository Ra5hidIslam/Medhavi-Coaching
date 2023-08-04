import React, { useEffect } from 'react';
import { useState } from 'react';

import HomeFeed from '../../components/HomeFeed/HomeFeed'
import Login from '../../components/Login/Login';
import LandingCSS from '../LandingPage/Landing.module.css'
// import LoginForm from '../../components/Login/LoginForm';
import LogOut from '../../components/hooks/LogOut';


function Landing(){

    const[logState,setLogState] = useState(false);
    // // function to change the state on click of the login button
    function handleLoginClick(){
        setLogState((logState)=> !logState);
        console.log(logState);
    }   
    useEffect(()=>{
        console.log(logState);
    },[]);
    return(
        <div>
            {/* <div className= {HomeCSS.login_form}>
                <Login_form
                logState={logState}
                />
            </div> */}
            <div className={LandingCSS.home_body}>
            <div className={LandingCSS.login_section}>
                    <Login
                    logState = {logState}
                    handleLoginClick = {handleLoginClick}
                    />
                </div>
            </div>
        
        </div>
        

    
    )
}

export default Landing;
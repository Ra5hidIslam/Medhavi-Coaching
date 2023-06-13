import React, { useEffect } from 'react';
import { useState } from 'react';

import HomeFeed from '../../components/HomeFeed/HomeFeed'
import Login from '../../components/Login/Login';
import HomeCSS from './Home.module.css';
import LoginForm from '../../components/Login/LoginForm';



function Home(){

    const[logState,setLogState] = useState(false);
    // // function to change the state on click of the login button
    function handleLoginClick(){
        setLogState((logState)=> !logState);
    }   
    useEffect(()=>{
        console.log(logState);
    },[logState]);
    return(
        <div>
            {/* <div className= {HomeCSS.login_form}>
                <Login_form
                logState={logState}
                />
            </div> */}
            <div className={HomeCSS.home_body}>
                <div className={HomeCSS.home_feed_section}>
                    <HomeFeed/>
                    <div className= {HomeCSS.loginForm}>
                    <LoginForm
                    logState={logState}
                    />
                    </div>
                </div>
                <div className={HomeCSS.login_section}>
                    <Login
                    // logState = {logState}
                    handleLoginClick = {handleLoginClick}
                    />
                </div>
                
                {/* Hello */}
            </div>
        
        </div>
        

    
    )
}

export default Home;
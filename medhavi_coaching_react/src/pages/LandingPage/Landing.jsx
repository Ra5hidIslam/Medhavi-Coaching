import React, { useEffect } from 'react';
import { useState } from 'react';

import HomeFeed from '../../components/HomeFeed/HomeFeed'
import Login from '../../components/Login/Login';
import LandingCSS from '../LandingPage/Landing.module.css';


function Landing(){

    const[logState,setLogState] = useState(false);
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
                {/* <div className={HomeCSS.home_feed_section}>
                    <HomeFeed/>
                </div> */}
                <div className={LandingCSS.login_section}>
                    <Login
                    logState = {logState}
                    handleLoginClick = {handleLoginClick}
                    />
                </div>
                {/* <div className={HomeCSS.logout} onClick={LogOut()}>
                    Log Out
                </div> */}
                
                {/* Hello */}
            </div>
        
        </div>
        

    
    )
}

export default Landing;
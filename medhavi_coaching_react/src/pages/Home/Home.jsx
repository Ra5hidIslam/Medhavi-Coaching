import React, { useEffect } from 'react';
import { useState } from 'react';

import HomeFeed from '../../components/HomeFeed/HomeFeed'
import Login from '../../components/Login/Login';
import HomeCSS from './Home.module.css';
// import LoginForm from '../../components/Login/LoginForm';
import LogOut from '../../components/hooks/LogOut';


function Home(){

    // const[logState,setLogState] = useState(false);
    // // // function to change the state on click of the login button
    // function handleLoginClick(){
    //     setLogState((logState)=> !logState);
    //     console.log(logState);
    // }   
    // useEffect(()=>{
    //     console.log(logState);
    // },[]);
    // window.location.reload();
    return(
        <div>
            <div className={HomeCSS.home_body}>
                <div>
                    
                </div>
                <div className={HomeCSS.home_feed_section}>
                    <HomeFeed/>
                </div> 
                <div>
                    
                </div>
            </div>
        
        </div>
        

    
    )
}

export default Home;
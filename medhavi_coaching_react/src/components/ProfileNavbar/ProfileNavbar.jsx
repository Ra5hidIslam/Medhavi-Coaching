import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import ProfileNavbarCSS from '../ProfileNavbar/ProfileNavbar.module.css';
import e from 'cors';
import UserFeed from '../Profile_Post/UserPost'




const  Nav_bar=()=> {

 
    const [currentSelection,setCurrentSelection] = useState(1);
    const [userStyle,setUserStyle] = useState("");
    const [interstyle,setInterStyle] = useState("");
    // useEffect(()=>{
    // },[currentSelection]);



    const currentElement = ()=>{
      if(currentSelection == 1){
        return <UserFeed/>
      }
      else if(currentSelection == 2){
        return <div> Interacted Posts</div>
      }
    }

    const changeStyleUser = ()=>{
      setUserStyle(ProfileNavbarCSS.UserPostsActive);
      setInterStyle(ProfileNavbarCSS.InterPostsStandard);
    }

    
    const changeStyleInter = ()=>{
      setInterStyle(ProfileNavbarCSS.InterPostsActive);
      setUserStyle(ProfileNavbarCSS.UserPostsStandard);
     
    }
    
    useEffect(()=>{
    },[userStyle,interstyle])

    
    return (
      <div>
        <div className={ProfileNavbarCSS.navbar}>
          <button className={userStyle} onClick={()=>{
            setCurrentSelection(1)
            changeStyleUser()
            }}>User Posts</button>
          <button className={interstyle} onClick={()=>{
              setCurrentSelection(2)
              changeStyleInter()
            }}> Interacted Posts</button>
        </div>
          <div className={ProfileNavbarCSS.userfeed}>
            {currentElement()}
          </div>
      </div>
      // <UserFeed/>
       
       

    )
}

export default Nav_bar;
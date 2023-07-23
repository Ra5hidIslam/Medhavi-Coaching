import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import NavBarCSS from '../Navbar/nav_bar.module.css'
import e from 'cors';


const handleProfileClick = ()=>{
    
}

function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" >
        {props.children}
      </a>
    );
  }

const ButtonDivElement = (username)=>{
    return(
        <div>
        <DropdownItem>
            {username}
        </DropdownItem>
        <DropdownItem>
            Settings
        </DropdownItem>
        </div>
        
      
    )
}


function Nav_bar() {
    const [profileElement,setProfileElement] = useState();
    useEffect(()=>{
        const showProfileName = ()=>{
            if(sessionStorage.getItem("user")){
                const user =  JSON.parse(sessionStorage.getItem("user"));
                // const button_element = ButtonDivElement(user.username);
                setProfileElement(<div className={NavBarCSS.nav_btn}>{user.username}</div>);
                
            }
        }
        showProfileName();

    },[]);

    
    return (
        <div className={NavBarCSS.nav_bar}>
            <div>
                <Link to="/Home" className={NavBarCSS.nav_btn}>Home</Link>
            </div>
            <div onClick={handleProfileClick()}>
                {profileElement}
            </div>
            {/* <div>
                <Link to="/QuizList" className={NavBarCSS.nav_btn}>Quiz</Link>
            </div>
            <div>
                <Link to="/About" className={NavBarCSS.nav_btn}>About</Link>
            </div>
            <div>
                <Link to="/Prac" className={NavBarCSS.nav_btn}>Prac</Link>
            </div> */}
        </div>

    );
}

export default Nav_bar
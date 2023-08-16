import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import NavBarCSS from '../Navbar/nav_bar.module.css'
import e from 'cors';
import DropdownMenu from '../DropDownMenu/DropDownMenu';





// const handleProfileClick = ()=>{
    
// }

// function DropdownItem(props) {
//     return (
//       <a href="#" className="menu-item" >
//         {props.children}
//       </a>
//     );
//   }

// const ButtonDivElement = (username)=>{
//     return(
//         <div>
//         <DropdownItem>
//             {username}
//         </DropdownItem>
//         <DropdownItem>
//             Settings
//         </DropdownItem>
//         </div>
        
      
//     )
// }

function NavItem(props) {
    const [open, setOpen] = useState(false);
  
    return (
      <div className={NavBarCSS.navItem}>
        <div  className={NavBarCSS.usernameButton} onClick={() => setOpen(!open)}>
          {props.username}
        </div>
        {open && props.children}
      </div>
    );
  }


function Nav_bar() {

  // const [loggedOut,setLoggedOut] = useState(false);
    const getUserElement =()=>{
        if(sessionStorage.getItem("user")){
          if(sessionStorage.getItem("user") != "undefined")
          {
            const user = JSON.parse(sessionStorage.getItem("user"));
            const userElement = <NavItem username ={user.name}><DropdownMenu></DropdownMenu></NavItem>;
            return userElement;
          }
          // else{

          // }
            
        }

    }
    
    const ifLanding =()=>{
      if(sessionStorage.getItem("token")){
        const navElement = <Link to="/Home" className={NavBarCSS.nav_btn}>Home</Link>
        return navElement;
      }else{
        const navElement = <Link to="" className={NavBarCSS.nav_btn}>Medhavi</Link>
        return navElement;
      }
    }

    
    
    return (
        <div className={NavBarCSS.nav_bar}>
            <div className={NavBarCSS.nav_bar_buttons}>
                {/* <Link to="/Home" className={NavBarCSS.nav_btn}>Home</Link> */}
                {ifLanding()}
            </div>
            <div className={NavBarCSS.nav_bar_buttons}>
                {getUserElement()}
            </div>
        </div>

    );
}

export default Nav_bar
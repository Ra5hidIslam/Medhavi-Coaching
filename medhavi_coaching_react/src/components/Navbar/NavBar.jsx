import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link } from "react-router-dom";
import NavBarCSS from '../Navbar/nav_bar.module.css';
import DropdownMenu from '../DropDownMenu/DropDownMenu';
import medhaviLogo from '../../files/icons/medhaviLogo.png';
import { useAuthContext } from '../hooks/useAuthContext';

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={NavBarCSS.navItem}>
      <div className={NavBarCSS.usernameButton} onClick={() => setOpen(!open)}>
        {props.username}
      </div>
      {open && props.children}
    </div>
  );
}

function Nav_bar() {
  const context = useAuthContext();

  const getUserElement = () => {
    if (sessionStorage.getItem("user")) {
      if (sessionStorage.getItem("user") !== "undefined") {
        const user = JSON.parse(sessionStorage.getItem("user"));
        return <NavItem username={user.name}><DropdownMenu></DropdownMenu></NavItem>;
      }
    }
  };



  const ifLanding = () => {
    if (sessionStorage.getItem("token")) {
      return (
        <div className="d-flex align-items-center">
          <img src={medhaviLogo} className={`img-fluid ${NavBarCSS.medhaviLogo}`} alt="Medhavi Logo" onClick={() => { window.location.href = '/Home' }} />
        </div>
      );
    } else {
      return (
        <div className="d-flex align-items-center">
          <Link to="/">
            <img
              src={medhaviLogo}
              className={`img-fluid ${NavBarCSS.medhaviLogo}`}
              alt="Medhavi Logo"
              style={{ maxWidth: '190px', maxHeight: '80px' }} // Adjust these values as needed
            />
          </Link>
        </div>
      );
    }
  };
  
    
  

  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${NavBarCSS.nav_bar}`} style={{ background: 'linear-gradient(90.46deg, #EE6161 27.83%, rgba(253, 219, 40, 0) 100.14%)' }}>
      <span className="navbar-brand">{ifLanding()}</span>
      <div className={`collapse navbar-collapse ${NavBarCSS.nav_bar_buttons}`}>
        {getUserElement()}
      </div>
      <div className={`${NavBarCSS.nav_bar_buttons} ${NavBarCSS.sign_in_button}`} style={{ position: 'relative', left: '-10px', top: '20px' }}>
        <button className={NavBarCSS.sign_in_btn} style={{ backgroundColor: 'green', color: 'white' }} onClick={() => { window.location.href = '/signin' }}>
          Sign In
        </button>
      </div>
    </nav>
  );
}

export default Nav_bar;

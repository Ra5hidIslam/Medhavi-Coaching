import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBarCSS from '../Navbar/nav_bar.module.css';
import medhaviLogo from '../../files/icons/medhaviLogo.png';

function logout() {
  console.log("Logging out");
  sessionStorage.clear();
  window.location.assign('/');
  localStorage.clear();
}

function Nav_bar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem("user");
    setOpen(!!userId); // Set open to true if userId exists, false otherwise
  }, []);

  const ifLanding = () => {
    if (sessionStorage.getItem("token")) {
      return (
        <div className="d-flex align-items-center">
          <img src={medhaviLogo} className={`img-fluid ${NavBarCSS.medhaviLogo}`} alt="Medhavi Logo" onClick={() => { window.location.href = '/Blog' }} style={{ maxWidth: '190px', maxHeight: '80px' }} />
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
              style={{ maxWidth: '190px', maxHeight: '80px' }}
            />
          </Link>
        </div>
      );
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${NavBarCSS.nav_bar}`} style={{ background: 'linear-gradient(90.46deg, #EE6161 27.83%, rgba(253, 219, 40, 0) 100.14%)' }}>
      <span className="navbar-brand">{ifLanding()}</span>
      <div className={`${NavBarCSS.nav_bar_buttons} ${NavBarCSS.sign_in_button}`} style={{ position: 'absolute', left: "75vw", top: '55px', backgroundColor: 'green', color: 'white' }}>
        <button className={NavBarCSS.sign_in_btn} style={{ backgroundColor: 'green', color: 'white' }} onClick={() => {
          if (open) {
            logout();
            setOpen(false); // Set open to false when logging out
          } else {
            window.location.assign('/Signin');
          }
        }}>
          {open ? 'Sign Out' : 'Sign In'}
        </button>
      </div>
    </nav>
  );
}

export default Nav_bar;
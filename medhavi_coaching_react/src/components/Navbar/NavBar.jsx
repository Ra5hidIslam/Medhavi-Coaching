import React from 'react'
import { Link } from "react-router-dom";
import NavBarCSS from '../Navbar/Nav_bar.module.css'

function Nav_bar() {
  return (
    <div className={NavBarCSS.nav_bar}>
        <div>
            <Link to="/Home" className={NavBarCSS.nav_btn}>Home</Link>
        </div>
        <div>
            <Link to="/Courses" className={NavBarCSS.nav_btn}>Courses</Link>
        </div>
        <div>
            <Link to="/Exams" className={NavBarCSS.nav_btn}>Exams</Link>
        </div>
        <div>
            <Link to="/Profile" className={NavBarCSS.nav_btn}>Profile</Link>
        </div>
        <div>
            <Link to="/QuizList" className={NavBarCSS.nav_btn}>Quiz</Link>
        </div>
        <div>
            <Link to="/About" className={NavBarCSS.nav_btn}>About</Link>
        </div>
        <div>
            <Link to="/Prac" className={NavBarCSS.nav_btn}>Prac</Link>
        </div>
    </div>

  );
}

export default Nav_bar
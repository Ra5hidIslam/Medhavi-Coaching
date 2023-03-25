import React from 'react'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavbarElements';

const Navbar = () =>{
    return (
        <>
            <Nav>
                <Bars/>
                <NavMenu>
                <NavLink to ='/Home'>
                        Home
                    </NavLink>
                    <NavLink to ='/Courses'>
                        About
                    </NavLink>
                    <NavLink to ='/Exams'>
                        Exams
                    </NavLink>
                    <NavLink to ='/Quiz'>
                        Quiz
                    </NavLink>
                    <NavLink to ='/Profile'>
                        Profile
                    </NavLink>
                    <NavLink to ='/About'>
                        About
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to = '/signin'>Sign In</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar
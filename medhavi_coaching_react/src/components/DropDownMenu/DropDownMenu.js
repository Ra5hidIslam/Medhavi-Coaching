import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import DropDownMenuCSS from '../DropDownMenu/DropDownMenu.module.css';

function DropdownMenu(username) {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
  
    useEffect(() => {
      setMenuHeight(dropdownRef.current.firstChild.offsetHeight)
    }, [])
  
    function calcHeight(el) {
      const height = el.offsetHeight;
      setMenuHeight(height);
    }
    const handle_drop_down_button_click = (props)=>{
      props.goToMenu && setActiveMenu(props.goToMenu);
      if(props.goToMenu == 'Profile'){
        window.location.assign('/Profile');
      }
      else if(props.goToMenu == 'Logout'){
        // console.log("Logout function clicked");
        sessionStorage.clear();
        window.location.assign('/');
      }
    }
  
    function DropdownItem(props) {
      return (
        <a href="#" className={DropDownMenuCSS.menuItem} onClick={() =>  handle_drop_down_button_click(props)}>
          {/* <span className="icon-button">{props.leftIcon}</span> */}
          {props.children}
          {/* <span className="icon-right">{props.rightIcon}</span> */}
        </a>
      );
    }

   
  
    return (
      <div className={DropDownMenuCSS.dropdown} style={{ height: menuHeight }} ref={dropdownRef}>
  
        <CSSTransition
          in={activeMenu === 'main'}
          timeout={500}
          classNames= {DropDownMenuCSS.menuPrimary}
          unmountOnExit
          onEnter={calcHeight}>
          <div className = {DropDownMenuCSS.menu} >
            <DropdownItem
            //   leftIcon={<CogIcon />}
            //   rightIcon={<ChevronIcon />}
              goToMenu="Logout">
              Log Out
            </DropdownItem>
            <DropdownItem
              goToMenu="Profile">
              {/* <div onClick={logout()}>
                Profile
              </div> */}
              Profile
              
            </DropdownItem>
          </div>
        </CSSTransition>
  
        
      </div>
    );
  }

  export default DropdownMenu;
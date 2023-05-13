import React from 'react';
import profileCSS from '../Profile/profile.module.css'
import EditProfile from './editprofile';

function Popup() {
  return (
    <div className={profileCSS.EditSection}>
        <div className={profileCSS.EditProfileForm}>
            <EditProfile/>
            
        </div>
    </div>
  );
}

export default Popup;
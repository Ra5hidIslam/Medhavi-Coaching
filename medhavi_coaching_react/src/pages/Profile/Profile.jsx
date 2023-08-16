import React from 'react'
import ProfileCSS from './profile.module.css'

function profile() {

  
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div>
      <div className={ProfileCSS.profileBody}>
          <div className={ProfileCSS.profilePhoto}>
            Profile picture
          </div>
          <div className={ProfileCSS.profileUsername}>
            {
              user.name
            }
          </div>
          <div className={ProfileCSS.profileNavbar} name = "navbar">
            Navbar 
          </div>
          <div className = {ProfileCSS.profileContent}>
            Profile Content
          </div>
      </div>
    </div>
  )
}

export default profile
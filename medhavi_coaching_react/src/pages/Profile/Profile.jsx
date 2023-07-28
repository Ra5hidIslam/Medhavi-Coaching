import React from 'react'
import ProfileCSS from './profile.module.css'

function profile() {

  
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div>
      <div className={ProfileCSS.profileBody}>
        <div className={ProfileCSS.profilePhoto}>
          Profile Picture
        </div>
        <div className={ProfileCSS.profileUsername}>
          {
            user.username
          }
        </div>
      </div>
    </div>
  )
}

export default profile
import React from 'react'
import ProfileCSS from './profile.module.css'
import UserFeed from '../../components/Profile_Post/UserPost'
import ProfileNavbar from '../../components/ProfileNavbar/ProfileNavbar'
import Check from '../../components/ProfileNavbar/Check'

function profile() {

  
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div>
      <div className={ProfileCSS.profileBody}>
          <div>
            
          </div>
          <div name = "main">
            {/* <div className={ProfileCSS.profilePhoto}>
              Profile picture
            </div> */}
            <div className={ProfileCSS.usernameBlock}>
              <div className={ProfileCSS.profileUsername}>
              {
                user.name
              }
              </div>
            </div>
            
            
            {/* <div className = {ProfileCSS.profileContent}> */}
              {/* User posts */}
              {/* <UserFeed/> */}
            {/* </div> */}
            
            <div className={ProfileCSS.profileNavbar} >
              <ProfileNavbar/>
            </div>
          </div>
          <div>
            
          </div>
      </div>
      {/* <UserFeed/> */}
    </div>
  )
}

export default profile
import React, { useState } from 'react';
import profileCSS from '../Profile/profile.module.css'
import profilepic from '../Profile/Images/dummyprofilepic.jpeg'
import ReactDOM from 'react-dom';
import Popup from '../Profile/Popup'

function Button(props) {
    const [showPopup, setShowPopup] = useState(false);
  
    function handleClick() {
      setShowPopup(!showPopup);
    }
  
    return (
      <div>
        <button className={profileCSS.EditProfile} onClick={handleClick}>Edit Profile</button>
        {showPopup &&
          ReactDOM.createPortal(
            <Popup />,
            document.getElementById('popup-root')
          )}
      </div>
    );
  }
  
  


function Profile() {
  return (
    <>
    
        <div className={profileCSS.PictureDiv}>
                <div> 
                    <img className={profileCSS.ProfilePic} src={profilepic} alt='name'></img>
                    <div>
                        <Button/>
                        
                    </div>    
                </div>
           
            <div className={profileCSS.aboutdiv}>
                <div className={profileCSS.profilename}>
                    Rohan Alom

                </div>
                <div className={profileCSS.username}>rohan123</div>
                <div className={profileCSS.follower_following}>
                    <div className={profileCSS.follower}>
                        25 Followers

                    </div>
                    <div className={profileCSS.following}>
                        23 Following

                    </div>
                    

                </div>
            </div>
        </div>
        <div className={profileCSS.profilepage_contents}>
          <div id='popup-root'>
          
          </div>

          <div className={profileCSS.horizontaldiv}>
            <div className={profileCSS.leaderboard}>
              leaderboard
            </div>
            <div className={profileCSS.leaderboard}>
              Questions Solved
            </div>
            <div className={profileCSS.leaderboard}>
              Questions Saved.
            </div>
          </div>
          
        </div>
        <div >
          
        </div>
       
    
    </>
  )
}

export default Profile
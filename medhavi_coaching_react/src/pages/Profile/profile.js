import React, { useEffect, useState } from 'react';
import profileCSS from '../Profile/profile.module.css'
import profilepic from '../Profile/Images/rohan.jpeg'
import rashidpic from '../Profile/Images/rashid.jpeg'
import nurpic from '../Profile/Images/nur.jpeg'
import ReactDOM from 'react-dom';
import Popup from '../Profile/Popup'

const dummyData = [
  { name: "Rohan Alom", username: "rohan123", followers: 123, following: 45, profilePic: profilepic },
  { name: "Rashidul Islam", username: "rashid345", followers: 789, following: 321, profilePic: rashidpic },
  { name: "Nur Alom", username: "nur234", followers: 654, following: 987, profilePic: nurpic }

];

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
  
  


  const profile = () => {
    return dummyData[Math.floor(Math.random() * dummyData.length)];
  };
  
  const Profile = () => {
    const [user, setUser] = useState(profile());
  
    useEffect(() => {
      setUser(profile());
    }, []);
  return (
    <div>
      
      {user && (
      
      <>
      
          <div className={profileCSS.PictureDiv}>
                  <div>
                      <img className={profileCSS.ProfilePic} src={user.profilePic} alt={user.name}></img>
                      <div>
                          <Button/>
      
                      </div>
                  </div>
      
              <div className={profileCSS.aboutdiv}>
                  <div className={profileCSS.profilename}>
                      {user.name}
                  </div>
                  <div className={profileCSS.username}>{user.username}</div>
                  <div className={profileCSS.follower_following}>
                      <div className={profileCSS.follower}>
                          {user.followers} Followers
                      </div>
                      <div className={profileCSS.following}>
                          {user.following} Following
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
      )}
    </div>
  );
};

export default Profile
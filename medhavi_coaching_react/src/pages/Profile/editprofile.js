import React, { useState } from 'react';

const EditProfileForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // code for submitting form data to server or updating state
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={handleNameChange} />

      <label htmlFor="username">Username:</label>
      <input type="text" id="username" value={username} onChange={handleUsernameChange} />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" value={password} onChange={handlePasswordChange} />

      <label htmlFor="profile-pic">Profile Picture:</label>
      <input type="file" id="profile-pic" value={profilePic} onChange={handleProfilePicChange} />

      <button type="submit">Save</button>
    </form>
  );
};

export default EditProfileForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Masonry } from "react-masonry";
import { useAuthContext } from "../../components/hooks/useAuthContext";
import { Link } from 'react-router-dom';
import getPosts from '../../components/client/getPosts';
import registerCommentInteraction from "../../components/client/registerCommentInteraction";

// require('dotenv').config();
import { Container, Row, Col, Form, Button,Card, Image, } from "react-bootstrap";
import './blog.css';



const ProfilePage = () => {
  const [user, setUser] = useState(sessionStorage.getItem("user"));
  // const userData = sessionStorage.getItem("user");
  // setUser(userData);

  // useEffect(() => {
    
  //   // Replace the following line with your code to retrieve user data from your database
    
  // }, []);

  function profilePictureElement(){
    if(sessionStorage.getItem('user').image){
      return (
        <img crossorigin="anonymous" src={`http://localhost:8800/profilePhotos/` + user.image} alt="profilePicture" className="rounded-circle profile-image" />
      )
    }
    else{
      return(
        <img crossorigin="anonymous" src={`http://localhost:8800/profilePhotos/defaultProfilePicture.jpg`} alt="profilePicture" className="rounded-circle profile-image" />
      )
      
    }
  }

  return (
    <Container className="profile-container">
      <div className="profile-header">
        {/* user.image && <img crossorigin="anonymous" src={`http://localhost:8800/profilePhotos/defaultProfilePicture.jpg`} alt="profilePicture" className="rounded-circle profile-image" /> */}
        <div>{profilePictureElement()}</div>
        <h2 className="profile-name">
          {sessionStorage.getItem('user').name}
        </h2>
      </div>
      <div className="marks-container">
        <p className="marks-label">PREVIOUS EXAM MARKS</p>
        {/* You can display user marks here */}
      </div>
    </Container>
  );
   
  }






function Notice({ isAdmin }) {
  const [notices, setNotices] = useState([]); // State to store uploaded notices
  const [newNotice, setNewNotice] = useState(""); // State to store the new notice being entered

  // Function to handle the form submission when an admin uploads a notice
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newNotice.trim() !== "") {
      // Add the new notice to the list of notices
      setNotices([...notices, newNotice]);
      // Clear the input field
      setNewNotice("");
    }
  };

  // Render the "Upload Notice" form only if the user is an admin
  const renderUploadForm = () => {
    if (isAdmin) {
      return (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows="4"
              placeholder="Enter your notice here"
              value={newNotice}
              onChange={(e) => setNewNotice(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Upload Notice
          </Button>
        </Form>
      );
    }
    return null;
  };

  return (
    <div className="notice-container">
      <Container fluid>
        <Row>
          <Col lg={20} className="notice">
            <div className="notice-header">
              <div className="header-box">
                <h2 className="header-text">Notice</h2>
              </div>
            </div>
            <div className="notice-content">{renderUploadForm()}</div>
            <div className="notice-list">
              <h2 className="body-text">Uploaded Notices:</h2>
              <ul>
                {notices.map((notice, index) => (
                  <li key={index}>{notice}</li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


function PageComponent() {
  return (
    <div className="link-container">
      <div className="navbar-links">
        <Link to="./post">Post</Link>
        <Link to="./Jee">JEE</Link>
        <Link to="./neet">NEeT</Link>
        <Link to="./books">Books</Link>
      
      <div className=" test">
        <Link to="./test">Test</Link></div>
      </div>
    </div>
  );
}

function Posts({ posts }) {
  console.log(posts)
  return (
    <Masonry columns={3} gutter={20}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Masonry>
  );
}



function Post({ post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);


  function handleLike(e) {
    console.log(e.target);
    setLiked(!liked);
    registerCommentInteraction(localStorage.getItem("userId"),"like",e.target.id);
  }
  function handleComment(e){
    console.log(e.target);
    // setLiked(!liked);
    // registerLike(e.target.id);
  }
  function handleSave(e){
    console.log(e.target);
    setSaved(!saved);
    registerCommentInteraction(localStorage.getItem("userId"),"save",(e.target.id).slice(0,-1));
  }


  return (
    <div className="card">
      {post.image && <img crossorigin="anonymous" src={`http://localhost:8800/postPhotos/` + post.image} alt={post.postTitle} className="card-img-top" /> }
      <div className="card-body">
        <h5 className="card-title">{post.postTitle}</h5>
        {/* <p className="card-text">{post.content}</p> */}
      </div>
      <div className="card-footer">
        <button className="btn btn-primary mr-2" id = {post.postId} onClick={(e)=>handleLike(e)}>
          {liked ? "Unlike" : "Like"}
        </button>
        <button className="btn btn-secondary mr-2" id = {post.postId + 'c'} onClick={(e)=>handleComment(e)} >Comment</button>
        <button className="btn btn-info" id = {post.postId + 's'} onClick={(e)=>handleSave(e)}>
          {saved ? "Saved":"Save"}
          </button>
      </div>
    </div>
  );
}




function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPostText, setNewPostText] = useState(''); // State to store the text of the new post
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected photo file
  const [userComment, setUserComment] = useState(''); // State to store the user's comment

  useEffect(() => {
    async function fetchPosts() {
      const posts = await getPosts(localStorage.getItem("userId"));
      console.log("fetched Posts", posts)
      setPosts(posts);
    }
    fetchPosts();
  }, []);

  // Function to handle the form submission when a user posts a new text or photo
  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (newPostText.trim() !== '' || selectedFile !== null) {
      // Create a FormData object to send text and photo
      const formData = new FormData();
      formData.append('text', newPostText);
      if (selectedFile) {
        formData.append('photo', selectedFile);
      }

      // You can send formData to your server using Axios or any other method
      // Example using Axios:
      try {
        const response = await axios.post('/api/uploadpost', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // Handle success or display a success message to the user
        console.log('Post uploaded successfully:', response.data);

        // Clear the input fields after a successful post
        setNewPostText('');
        setSelectedFile(null);

        // Refresh the list of posts
        // fetchPosts();
      } catch (error) {
        console.error('Error uploading post:', error);
      }
    } else {
      alert('Please enter some content or select a photo before posting.');
    }
  };

  // Function to handle the submission of user comments
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (userComment.trim() !== '') {
      // Implement code to post the user's comment to the server or store it locally
      // For example, you can send the comment using Axios or another API call

      // Clear the comment input field after posting
      setUserComment('');
    } else {
      alert('Please enter something  before posting.');
    }
  };

  return (
    <div className="container" style={{ margin: 0, padding: 0 }}>
      <Notice />
      <header>
        <ProfilePage />
        <PageComponent />
      </header>
      <main>
        {/* Create a form for posting */}
        <Form onSubmit={handlePostSubmit}>
          {/* ... (Existing code for posting text and photos) */}
       <Form.Group>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Write your comment here..."
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Post 
          </Button>
        </Form>

        {/* Display existing posts */}
        <Posts posts={posts} />
      </main>
    </div>
  );
}


    
export default Blog;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Masonry } from "react-masonry";
import { useAuthContext } from "../../components/hooks/useAuthContext";
import { Link } from 'react-router-dom';
import getPosts from '../../components/client/getPosts';
// require('dotenv').config();
import { Container, Row, Col, Form, Button,Card, Image, } from "react-bootstrap";
import './blog.css';



const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    // Replace the following line with your code to retrieve user data from your database
    const userData = sessionStorage.getItem("user");
    setUser(userData);
  }, []);

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
        <div className="profile-name">
          {sessionStorage.getItem('user').name}
        </div>
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

  function handleLike() {
    setLiked(!liked);
  }

  return (
    <div className="card">
      {post.image && <img crossorigin="anonymous" src={`http://localhost:8800/postPhotos/` + post.image} alt={post.postTitle} className="card-img-top" /> }
      <div className="card-body">
        <h5 className="card-title">{post.postTitle}</h5>
        {/* <p className="card-text">{post.content}</p> */}
      </div>
      <div className="card-footer">
        <button className="btn btn-primary mr-2" onClick={handleLike}>
          {liked ? "Unlike" : "Like"}
        </button>
        <button className="btn btn-secondary mr-2">Comment</button>
        <button className="btn btn-info">Save</button>
      </div>
    </div>
  );
}




function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function fetchPosts(){
      const posts = await getPosts(localStorage.getItem("userId"));
      // const postJson = JSON.stringify(posts); 
      console.log("fetched Posts",posts)
      setPosts(posts);
      // return posts;
    }
    fetchPosts();
  },[])
  
  console.log(posts);
  console.log(Array.isArray(posts));
  // posts.map((post)=>{
  //   console.log(Array.isArray(posts))
  // })

  // url = 
  // useEffect(() => {
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       setPosts(response.data);
  //       console.log(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  if(!posts){
    return <div>Loading...</div>;
}


  return (
    <div className="container" style={{ margin: 0, padding: 0 }}>
      
         <Notice />
         <header>
      <ProfilePage/> 
      <PageComponent/>
      </header>
      <main>
        <Posts posts={posts} />
      </main>
    </div>
  );

    }
export default Blog;

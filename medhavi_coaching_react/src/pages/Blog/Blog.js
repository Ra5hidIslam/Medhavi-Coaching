import React, { useState, useEffect } from "react";
import axios from "axios";
import { Masonry } from "react-masonry";
import { useAuthContext } from "../../components/hooks/useAuthContext";
import { Link } from 'react-router-dom';
import getPosts from '../../components/client/getPosts';
import registerPostInteraction from "../../components/client/registerPostInteraction";
import getPostsInteraction from "../../components/client/getPostInteraction";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import './blog.css';
require('dotenv').config();
const ProfilePage = () => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  function profilePictureElement() {
    if (user.image) {
      return (
        <img
          crossorigin="anonymous"
          src={`http://localhost:8800/profilePhotos/` + user.image}
          alt="profilePicture"
          className="rounded-circle profile-image"
        />
      );
    } else {
      return (
        <img
          crossorigin="anonymous"
          src={`http://localhost:8800/profilePhotos/defaultProfilePicture.jpg`}
          alt="profilePicture"
          className="rounded-circle profile-image"/>
        );
    }
  }

  return (
    <Container className="profile-container">
      <div className="profile-header">
        <div>{profilePictureElement()}</div>
        <h2 className="profile-name">{user.name}</h2>
      </div>
      <div className="marks-container">
        <p className="marks-label">PREVIOUS EXAM MARKS</p>
        {/* You can display user marks here */}
      </div>
    </Container>
  );
}

function Notice({ isAdmin }) {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newNotice.trim() !== "") {
      setNotices([...notices, newNotice]);
      setNewNotice("");
    }
  };

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
        <Link to="./neet">NEET</Link>
        <Link to="./books">Books</Link>
        <div className="test">
          <Link to="./test">Test</Link>
        </div>
      </div>
    </div>
  );
}


function Posts({ posts, userComment,postInteraction, setUserComment, comments, setComments }) {
  return (
    <Masonry columns={3} gutter={20}>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          userName={post.userName}  // Pass the userName prop to the Post component
          userComment={userComment}
          postInteraction = {postInteraction.filter(obj=>{return obj.postId === post.postId})}
          setUserComment={setUserComment}
          comments={comments}
          setComments={setComments}
        />
      ))}
    </Masonry>
  );
}


function Post({ post, userName,postInteraction }) {
  let likeStatus = false;
  let likeCountStat = 0;
  let savedStatus = false;
  let commentsFromInter;
  if(postInteraction[0]){
      if(postInteraction[0].likes.includes(post.userId)){
        // console.log("post inter",postInteraction[0].likes.includes(post.userId));
        likeStatus = true;
      }
      if(postInteraction[0].likes.length){
        likeCountStat = postInteraction[0].likes.length;
      }
      if(postInteraction[0].savedBy.includes(post.userId)){
        savedStatus = true;
      }
      if(postInteraction[0].comments.length > 0){
        commentsFromInter = postInteraction[0].comments;
      }

  }
  const [liked, setLiked] = useState(likeStatus);
  const [likeCount, setLikeCount] = useState(likeCountStat);
  const [saved, setSaved] = useState(savedStatus);
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState(commentsFromInter);

  function handleLike(e) {
    // Send a request to your server to like the post
    // On a successful response, update the like count and set liked to true
    if (!liked) {
      // axios.post("YOUR_LIKE_ENDPOINT_URL", { postId: post.postId }).then((response) => {
      //   if (response.data.success) {
      //     setLikeCount(likeCount + 1);
      //     setLiked(true);
      //   }
      // });
      registerPostInteraction(localStorage.getItem("userId"), "like", e.target.id);
      setLikeCount(likeCount + 1);
      setLiked(true);
    }
    else{
      console.log(registerPostInteraction(localStorage.getItem("userId"), "unlike", e.target.id));
      setLikeCount(likeCount - 1);
      setLiked(false);
    }
  }

  // comment:req.body.comment,
  //           userId:req.body.userId,
        //     postId
  //           commentImage:req.file.filename

  function handleComment(postId) {
    console.log("postId",postId)
    if (userComment && userComment.trim() !== "") {
      const commentData = {
        comment: userComment,
        userId:localStorage.getItem("userId"),


      };
      const url =  process.env.REACT_APP_API_URL_SERVER + "/comment/create/" + postId.slice(0, -1);
      // Make a POST request to your server's comment endpoint
      axios
        .post(url, commentData, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          const newComment = {
            id: response.data._id,
            content: userComment,
          };

          const updatedComments = [...comments];
          updatedComments.push(newComment);
          setComments(updatedComments);

          setUserComment("");
        })
        .catch((error) => {
          console.error("Error posting comment:", error);
        });
    } else {
      alert("Please enter a comment before posting.");
    }
  }

  function handleSave(e) {
    
    if(!saved){
      
      registerPostInteraction(localStorage.getItem("userId"), "save", e.target.id.slice(0, -1));
      setSaved(!saved);
      // console.log("saved state",saved);
    }
    else{
      
      registerPostInteraction(localStorage.getItem("userId"), "unsave", e.target.id.slice(0, -1));
      setSaved(!saved);
      // console.log("saved state",saved);
    }
    
  }

  // useEffect(()=>{
  //   console.log("saved State",saved);
  // },[]);

  return (
    <div className="card">
      {post.image && (
        <img
          crossorigin="anonymous"
          src={`http://localhost:8800/postPhotos/` + post.image}
          alt={post.postTitle}
          className="card-img-top"
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{userName}</h5>
        <h5 className="card-title">{post.postTitle}</h5>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary mr-2" id={post.postId} onClick={(e) => handleLike(e)}>
          {liked ? "Unlike" : "Like"}
        </button>
        {likeCount} 
        <input
          type="text"
          placeholder="Write a comment..."
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
        />
        <button className="btn btn-secondary mr-2" id={post.postId + 'c'} onClick={() => handleComment(post.postId)}>
          Comment
        </button>
        <button className="btn btn-info" id={post.postId + "s"} onClick={(e) => handleSave(e)}>
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}

async function getAllPostInteraction(posts){
  if(posts.length < 1){return}
  const postInters = [];
  for(let i = 0; i< posts.length;i++){
    const currentInter = await getPostsInteraction(posts[i].postId);
    if(currentInter) postInters.push(currentInter);
  }
  console.log(postInters);
  return postInters;
  
}

function Blog() {
  const [posts, setPosts] = useState([]);
  const[postInteraction,setPostInteraction] = useState([]);
  const [newPostText, setNewPostText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [userComment, setUserComment] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    async function fetchPosts() {
      const posts = await getPosts(localStorage.getItem("userId"));
      const postInter =await getAllPostInteraction(posts);
      setPostInteraction(postInter);
      // posts.push({})
      setPosts(posts);
    }
    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (newPostText.trim() !== "" || selectedFile !== null) {
      const formData = new FormData();
      formData.append("postTitle", newPostText);
      formData.append("userId", localStorage.getItem("userId"));
      formData.append("userName", user.name);

      if (selectedFile) {
        formData.append("postImage", selectedFile);
      }

      try {
        const url = process.env.REACT_APP_API_URL_SERVER + "/post/create";
        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        setNewPostText("");
        setSelectedFile(null);
      } catch (error) {
        console.error("Error uploading post:", error);
      }
    } else {
      alert("Please enter some content or select a photo before posting.");
    }
  }

  return (
    <div className="container" style={{ margin: 0, padding: 0 }}>
      <Notice />
      <header>
        <ProfilePage />
        <PageComponent />
      </header>
      <main>
        <Form onSubmit={handlePostSubmit}>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Write your thoughts here..."
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Post
          </Button>
        </Form>
        <Posts
          userName={user.name}
          posts={posts}
          postInteraction = {postInteraction}
          userComment={userComment}
          setUserComment={setUserComment}
       
        />
      </main>
    </div>
  );
}

export default Blog;
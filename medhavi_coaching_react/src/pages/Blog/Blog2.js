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
          crossOrigin="anonymous"
          src={`http://localhost:8800/profilePhotos/` + user.image}
          alt="profilePicture"
          className="rounded-circle profile-image"
        />
      );
    } else {
      return (
        <img
          crossOrigin="anonymous"
          src={`http://localhost:8800/profilePhotos/defaultProfilePicture.jpg`}
          alt="profilePicture"
          className="rounded-circle profile-image"
        />);
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

function Posts({ posts, setPosts ,postInteraction, comments, setComments }) {
  // const [newComments, setNewComments] = useState([]); // For new comments
  // const [olderComments, setOlderComments] = useState([]);
  // async function fetchOlderComments(postId) {
  //   try {
  //     const response = await axios.get(`/comments/${postId}`);
  //     const olderCommentsData = response.data;
  //     setOlderComments(olderCommentsData);
  //   } catch (error) {
  //     console.error("Error fetching older comments:", error);
  //   }
  // }
  
  return (
    <Masonry columns={3} gutter={20}>
      {posts.map((post) => {
        // Find the relevant post interaction and comments
        // console.log("post inter before",postInteraction);
        const postInteractions = postInteraction.filter((obj) => obj.postId === post.postId);
        // setComments(postInteraction.filter((comment) => comment.postId === post.postId).comments);
        // const postComments = postInteraction.filter((comment) => comment.postId === post.postId).comments;
        // const olderPostComments = []; // You need to fetch these from your backend
        // fetchOlderComments(post.postId);
        return (
          <Post
            key={post.id}
            post={post}
            userName={post.userName}
            // userComment={userComment}
            postInteraction={postInteractions}
            comments = {comments}
            // setUserComment={setUserComment}
            // comments={newPostComments} // Pass the new comments
            setComments={setComments}
            // newComments={newComments}
            // olderComments={olderPostComments} // Pass the older comments
            // setNewComments={setNewComments} // Set new comments
          />
        );
      })}
    </Masonry>
  );
}

function Post({ post, userName, postInteraction, comments,setComments }) {
  let likeStatus = false;
  let likeCountStat = 0;
  let savedStatus = false;
  let commentsFromInter;
  console.log("Post Interaction of ",userName,postInteraction);
  
  if (postInteraction[0]) {
    if (postInteraction[0].likes.includes(post.userId)) {
      likeStatus = true;
    }
    if (postInteraction[0].likes.length) {
      likeCountStat = postInteraction[0].likes.length;
    }
    if (postInteraction[0].savedBy.includes(post.userId)) {
      savedStatus = true;
    }
    if (postInteraction[0].comments.length > 0) {
      commentsFromInter = postInteraction[0].comments;
    }
  }

  const [liked, setLiked] = useState(likeStatus);
  const [likeCount, setLikeCount] = useState(likeCountStat);
  const [saved, setSaved] = useState(savedStatus);
  const [userComment, setUserComment] = useState("");
  const [olderComments, setOlderComments] = useState(commentsFromInter);
  
  
//   console.log(timestamp);
  
  const user = JSON.parse(sessionStorage.getItem("user"));

  function handleLike(e) {
    if (!liked) {
      registerPostInteraction(localStorage.getItem("userId"), "like", e.target.id);
      setLikeCount(likeCount + 1);
      setLiked(true);
    } else {
      registerPostInteraction(localStorage.getItem("userId"), "unlike", e.target.id);
      setLikeCount(likeCount - 1);
      setLiked(false);
    }
  }

  function handleComment(postId) {
    if (userComment && userComment.trim() !== "") {
      const commentData = {
        comment: userComment,
        userId: localStorage.getItem("userId"),
        userName: user.name, // Include the user's name
      };

      const url = process.env.REACT_APP_API_URL_SERVER + "/comment/create/" + postId;

      axios
        .post(url, commentData, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          const newComment = {
            id: response.data._id, // You may need to adjust this to match your API response
            // postId:postId,
            userName: user.name,
            content: userComment,
          };
          if(comments[postId]){
            console.log("Im here")
            let newCommentState = {...comments};
            newCommentState[postId].push(newComment);
            setComments(newCommentState);
          }
          else{
            setComments(...comments, {[postId]:[newComment]}); // Update new comments
          }

          
          setUserComment("");
          console.log(response);
        })
        .catch((error) => {
          console.error("Error posting comment:", error);
        });
    } else {
      alert("Please enter a comment before posting.");
    }
  }

  function handleSave(e) {
    if (!saved) {
      registerPostInteraction(localStorage.getItem("userId"), "save", e.target.id.slice(0, -1));
      setSaved(!saved);
    } else {
      registerPostInteraction(localStorage.getItem("userId"), "unsave", e.target.id.slice(0, -1));
      setSaved(!saved);
    }
  }

  const renderComments = (postId) => {
    console.log(comments);
    return (
      <div className="comments">
        <h4>Comments</h4>
        {olderComments && olderComments.map((comment, index) => (
          <div key={index}>
            <strong>{comment.userName}:</strong> {comment.comment}
          </div>
        ))}
        {comments[postId] && comments[postId].map((comment, index) => (
          <div key={index}>
            <strong>{comment.userName}:</strong> {comment.content}
          </div>
        ))}
      </div>
    );
  };

  const timestamp = post.createdAt;
  console.log(timestamp)
//   function formatTime(posts) {
//     console.log("post = ",posts);
//     if (posts && Array.isArray(posts)) {
//       return posts.map((post) => {
//         if (post.createdAt) {
//           // Attempt to parse the createdAt attribute into a Date object
//           const createdAt = new Date(post.createdAt);
  
//           if (!isNaN(createdAt)) {
//             // If createdAt is a valid Date object, proceed with timestamp formatting
//             const options = {
//               year: 'numeric',
//               month: 'short',
//               day: 'numeric',
//               hour: '2-digit',
//               minute: '2-digit',
//             };
//             timestamp = createdAt.toLocaleDateString(undefined, options);
//           } else {
//             // If createdAt is not a valid date, handle it as needed (e.g., set timestamp to an error message)
//             timestamp = 'Invalid Date';
//           }
//         } else {
//           timestamp = 'Date Missing'; // Handle the case where createdAt is missing
//         }
  
//         return timestamp;
//       });
//     } else {
//       return "invalid" ; // Return an empty array if posts is not defined
//     }
//   }

  function formatTime(post) {
    // console.log("post = ",posts);
    let timestamp;
    if (post) {
        if (post.createdAt) {
          // Attempt to parse the createdAt attribute into a Date object
          const createdAt = new Date(post.createdAt);
          if (!isNaN(createdAt)) {
            // If createdAt is a valid Date object, proceed with timestamp formatting
            const options = {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            };
            timestamp = createdAt.toLocaleDateString(undefined, options);
          } else {
            // If createdAt is not a valid date, handle it as needed (e.g., set timestamp to an error message)
            timestamp = 'Invalid Date';
          }
        } else {
          timestamp = 'Date Missing'; // Handle the case where createdAt is missing
        }
  
        return timestamp;
    } else {
      return "invalid" ; // Return an empty array if posts is not defined
    }
  }


  return (
    <div className="card">
      {post.image && (
        <img
          crossOrigin="anonymous"
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
      <p className="timestamp">{formatTime(post)}</p>
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
      {renderComments(post.postId)}
    </div>
  );
}

async function getAllPostInteraction(posts) {
  if (posts.length < 1) {
    return [];
  }

  const postInters = [];
  for (let i = 0; i < posts.length; i++) {
    const currentInter = await getPostsInteraction(posts[i].postId);
    if (currentInter) {
      postInters.push(currentInter);
    }
  }
  console.log(postInters);
  return postInters;
}


function Blog() {
    const [posts, setPosts] = useState([]);
    const [postInteraction, setPostInteraction] = useState([]);
    const [newPostText, setNewPostText] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [userComment, setUserComment] = useState("");
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const[numberOfPosts,setNumberOfPosts] = useState(10);
    // const [newComments, setNewComments] = useState([]); // Define newComments
    // const [olderComments, setOlderComments] = useState([]);
  
    // async function fetchOlderComments(postId) {
    //   // Make an API call to fetch older comments for the specified postId
    //   try {
    //     const response = await axios.get(`/comments/${postId}`);
    //     const olderCommentsData = response.data;
    //     // Update the state with the older comments
    //     setOlderComments(olderCommentsData);
    //   } catch (error) {
    //     console.error("Error fetching older comments:", error);
    //   }
    // }
  
    useEffect(() => {
      async function fetchPosts() {
        const postsData = await getPosts(localStorage.getItem("userId"),numberOfPosts);
        console.log("posts = ",postsData);
        const postInteractions = await getAllPostInteraction(postsData);
        setPostInteraction(postInteractions);
        setPosts(postsData);
        setLoading(false); // Data has been loaded, set loading to false
      }
      fetchPosts();
    }, []);
  
    if (loading) {
      // Data is still loading
      return <div>Loading...</div>;
    }
  
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
          console.log(response);
          const newPost = {
            postTitle:newPostText,
            userId:localStorage.getItem("userId"),
            userName:user.name,
            postId:response.data._id,
            createdAt:response.data.createdAt,
          }
          console.log("posts",posts);
          setPosts(current => [newPost,...current]);
          // console.log("posts after updating",posts);
          
          // setPosts((prev) => ({
          //   [...prev,newPost]
          // }));
        } catch (error) {
          console.error("Error uploading post:", error);
        }
      } else {
        alert("Please enter some content or select a photo before posting.");
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
  
          {postInteraction && postInteraction.length > 0 ? (
            <Posts
              posts={posts}
              setPosts = {setPosts}
              userComment={userComment}
              setUserComment={setUserComment}
              comments={comments}
              setComments={setComments}
              postInteraction={postInteraction}
            />
          ) : (
            <div>Loading post interactions...</div>
          )}
        </main>
      </div>
    );
  }

export default Blog;
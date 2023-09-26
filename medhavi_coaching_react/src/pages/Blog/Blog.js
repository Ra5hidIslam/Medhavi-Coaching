import React, { useState, useEffect } from "react";
import axios from "axios";
import { Masonry } from "react-masonry";

function Notice() {
  return (
    <div className="notice">
      <div className="notice-header">
        <span>PREVIOUS EXAM MARKS</span>
        <span>25 mins ago</span>
      </div>
      <div className="notice-content">
        <p>
          Sohail Hassan Choudhury
          <br />
          Post: JEE NEET  Books
          <br />
          
        </p>
      </div>
    </div>
  );
}

function Posts({ posts }) {
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
      <img src={post.image} alt={post.title} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content}</p>
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

  useEffect(() => {
    axios
      .get("https://medhayi-api.com/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <header>
         <Notice />
      </header>
      <main>
        <Posts posts={posts} />
      </main>
    </div>
  );
}

export default Blog;

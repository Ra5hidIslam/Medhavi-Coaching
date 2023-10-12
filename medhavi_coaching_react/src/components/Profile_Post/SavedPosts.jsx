import React, { useState,useEffect } from 'react';
// import QuestionsCSS from '../../components/Profile_Post/UserPosts.module.css'
// import the library to fetch homefeed
// import { loadHomeFeed } from '../client/loadHomeFeed';
// import getUser from '../client/getUser';
import { loadSavedPosts } from '../client/loadSavedPosts';
import { Masonry } from "react-masonry";
// import post from '../posts/Posts';
// import { getAndLoadHomeFeed } from '../helper/getAndLoadHomefeed';
// import getPosts from '../client/getPosts';




function Posts({ posts }) {
    console.log(posts)
    if(posts.length == 0){
        return (
            <div>Loading...</div>
        )
    }

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
  

const savedPosts=()=>{
    const [posts,setPost] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const posts = await loadSavedPosts(localStorage.getItem("userId"));
            console.log("fetched Posts", posts)
            setPost(posts);
        }
        fetchPosts();
        }, []);

    return (
        <Posts posts={posts} />
    )

}

export default savedPosts;


import React from 'react'
import { useState,useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
require('dotenv').config();


function toArray(posts){
    const arr = []
    for(let i = 0; i < posts.length; i++){
        const temp = {image:posts[i].postImage,
                      postTitle:posts[i].postTitle,
                      postContent:posts[i].postContent,
                      userId:posts[i].userId,
                      userName:posts[i].userName,
                      postId:posts[i]._id,
                      createdAt:posts[i].createdAt,
                    }
        arr.push(temp);
    }
    return arr
}

const fetchPosts = async (userID,numberOfPosts) =>{
    try{
        const axiosPrivate = useAxiosPrivate;
        const response = await axiosPrivate.get('/post/getPostFeed/'+ userID + '/' + numberOfPosts,{
            // signal:controller.signal
            headers:{'Authorization':`Bearer ${sessionStorage.getItem("token")}`},
        });
        // console.log(response);
        // console.log(response.data);
        const posts = await response.data;
        return toArray(posts);
    } catch(err){
        console.log(err.message);
    }
}

const getPosts = async (userID,numberOfPosts)=>{
    let user;
    try{
        user = await fetchPosts(userID,numberOfPosts);
    }catch(err){
        console.log(err.message);
    }
    return user;
}

export default getPosts
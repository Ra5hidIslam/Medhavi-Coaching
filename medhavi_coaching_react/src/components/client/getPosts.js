
import React from 'react'
import { useState,useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
require('dotenv').config();


function toArray(posts){
    const arr = []
    for(let i = 0; i < posts.length; i++){
        const temp = {image:posts[i].postImage,
                      postTitle:posts[i].postTitle,
                      userId:posts[i].userId,
                      userName:posts[i].userName}
        arr.push(temp);
    }
    return arr
}

const fetchPosts = async (userID) =>{
    try{
        const axiosPrivate = useAxiosPrivate;
        const response = await axiosPrivate.get('/post/getPostFeed/'+ userID,{
            // signal:controller.signal
            headers:{'Authorization':`Bearer ${sessionStorage.getItem("token")}`},
        });
        console.log(response);
        console.log(response.data);
        const posts = await response.data;
        return toArray(posts);
    } catch(err){
        console.log(err.message);
    }
}

const getPosts = async (userID)=>{
    let user;
    try{
        user = await fetchPosts(userID);
    }catch(err){
        console.log(err.message);
    }
    return user;
}

export default getPosts
import React from 'react'
import { useState,useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import getUser from './getUser';
require('dotenv').config();


const postUserImages =async(userId)=>{
    const user = await getUser(userId);
    const image = user.image ? user.image : undefined;
    return image;
}

async function toArray(posts){
    const arr = []
    for(let i = 0; i < posts.length; i++){
        const image = await postUserImages(posts[i].userId);
        const temp = {image:posts[i].postImage,
                      postTitle:posts[i].postTitle,
                      postContent:posts[i].postContent,
                      userId:posts[i].userId,
                      userName:posts[i].userName,
                      postId:posts[i]._id,
                      createdAt:posts[i].createdAt,
                      postUserImage:image,
                    }
        arr.push(temp);
    }
    console.log(arr);
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
        // const postUserImages = await getImages(posts);
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
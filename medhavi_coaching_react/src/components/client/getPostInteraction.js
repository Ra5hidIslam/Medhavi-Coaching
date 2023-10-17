
import React from 'react'
import { useState,useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
require('dotenv').config();


// function toArray(inter){
//     const arr = []
//     for(let i = 0; i < posts.length; i++){
//         const temp = {interId:inter[i].postImage,
//                       postTitle:posts[i].postTitle,
//                       postContent:posts[i].postContent,
//                       userId:posts[i].userId,
//                       userName:posts[i].userName,
//                       postId:posts[i]._id,
//                     }
//         arr.push(temp);
//     }
//     return arr
// }

const fetchPostsInteraction = async (userID) =>{
    try{
        const axiosPrivate = useAxiosPrivate;
        const response = await axiosPrivate.get('/post/getPostInteraction/'+ userID,{
            // signal:controller.signal
            headers:{'Authorization':`Bearer ${sessionStorage.getItem("token")}`},
        });
        // console.log(response);
        // console.log(response.data);
        const postsInter = await response.data;
        return postsInter;
        // return toArray(postsInter.json());
    } catch(err){
        console.log(err.message);
    }
}

const getPostsInteraction = async (userID)=>{
    let user;
    try{
        user = await fetchPostsInteraction(userID);
    }catch(err){
        console.log(err.message);
    }
    return user;
}

export default getPostsInteraction
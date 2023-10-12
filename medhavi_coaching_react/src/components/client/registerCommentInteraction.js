
import React from 'react'
import { useState,useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
require('dotenv').config();

const sendLike = async (userId,button,post_id) =>{
    try{
        // const axiosPrivate = useAxiosPrivate;
        // console.log("questionId",question_id);
        const url = process.env.REACT_APP_API_URL_SERVER + "/post/postInteraction/" + post_id;
        // console.log(sessionStorage.getItem("token"));
        const data = {
            "userId":userId,
            button:button,
        }
        const response = await fetch(url,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                'Authorization':`Bearer ${sessionStorage.getItem("token")}`
            },
            body:JSON.stringify(data),
            credentials:'include',
        }); 
        console.log(response);
        // console.log(response.data);
        const user = await response.json();
        return user;
        
    } catch(err){
        console.log(err.message);
    }
}

const registerCommentInteraction = async (userID,button,postId)=>{
    let user;
    try{
        user = await sendLike(userID,button,postId);
    }catch(err){
        console.log(err.message);
    }
    return user;
}

export default registerCommentInteraction



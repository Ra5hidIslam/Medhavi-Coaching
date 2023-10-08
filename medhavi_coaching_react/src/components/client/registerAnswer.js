
import React from 'react'
import { useState,useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
require('dotenv').config();

const sendAnswers = async (userId,selection,question_id,questionType) =>{
    try{
        const axiosPrivate = useAxiosPrivate;
        console.log("questionId",question_id);
        const url = process.env.REACT_APP_API_URL_SERVER + "/feed/feedresult/" + question_id;
        // console.log(sessionStorage.getItem("token"));
        
        if(questionType == 'NUM'){
            let data = {
                "userId":userId,
                "userAnswer":selection,
            }
            // const response = await axiosPrivate.post('/feed/feedresult/'+ question_id,{
            //     // signal:controller.signal
            //     headers:{'Authorization':`Bearer ${sessionStorage.getItem("token")}`},
            //     data:{
            //         "userId":userId,
            //         "userAnswer":selection,
            //     }
            // });   
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
        }
        else{
            let data = {
                "userId":userId,
                "userSelection":selection,
            }
            // const response = await axiosPrivate.post('/feed/feedresult/'+ question_id,{
        //     // signal:controller.signal
        //     headers:{'Authorization':`Bearer ${sessionStorage.getItem("token")}`},
        //     data:{
        //         "userId":userId,
        //         "userSelection":selection,
        //     }
        // });
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
        }
        
    } catch(err){
        console.log(err.message);
    }
}

const registerAnswer = async (userID,selection,question_id,questionType)=>{
    let user;
    try{
        user = await sendAnswers(userID,selection,question_id,questionType);
    }catch(err){
        console.log(err.message);
    }
    return user;
}

export default registerAnswer



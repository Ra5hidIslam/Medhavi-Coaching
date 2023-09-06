import { useEffect, useState } from "react";
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const fetchQuestions= async (fetchedQuestions)=>{
    // const fetchedQuestions = await loadHomeFeed(user_id)
    // console.log("result from loadHomeFeed",fetchedQuestions);
    // if(!fetchedQuestions) return "not able to load home feed";
    const fetchedQuestionArray = [];
    for(let i = 0;i<fetchedQuestions.length;i++){
        let title = fetchedQuestions[i].questionTitle;
        let questionId = fetchedQuestions[i]._id;
        // let username = fetchedQuestions[i].username;
        let userId = fetchedQuestions[i].userId;
        let userName = fetchedQuestions[i].userName;
        let answerOptions = [];
        for(let j = 0;j<fetchedQuestions[i].questionOptions.length;j++){
            let tempAnswer = {
                answerText:fetchedQuestions[i].questionOptions[j],
                // isCorrect:(Number(fetchedQuestions[i].questionAnswer) - 1) == Number(i) ? true:false,
                isCorrect:Number(fetchedQuestions[i].questionAnswer) - 1 === j,
                // answerId:String(fetchedQuestions[i]._id) + "a" + j,
                answerId:String(fetchedQuestions[i]._id) + "a" + j,
            }
            answerOptions.push(tempAnswer);
        }
        fetchedQuestionArray.push({
            questionText:title,
            questionID:questionId,
            // username:username,
            userID:userId,
            userName:userName,
            answerOptions:answerOptions,
        })

    }
    return fetchedQuestionArray;
}



export const loadHomeFeed = async (user_id)=>{
    // const [questionArray,setQuestionArray] = useState([]);
    // const [loadingState,setLoadingState] = useState(true);
    // var questionArray;
    console.log("I am here");
    try{

        const axiosPrivate = useAxiosPrivate;
        const url = "http://54.200.184.88:8800/api/feed/getHomeFeed/" + String(user_id);
        // const response  = await fetch(url,{
        //         method:"GET",
        //         headers:{
        //             "Content-Type":"application/json",
        //         },
        //         // body:JSON.stringify(data),
        //     });
         const response = await axiosPrivate.get(url,{
            // signal:controller.signal
            headers:{'Authorization':`Bearer ${sessionStorage.getItem("token")}`},
        });
        // const result = await response.json();
        const result = response.data;
        console.log("result of api call",result);
        const preparedQuestions = await fetchQuestions(result);
        // setQuestionArray(preparedQuestions);
        // sessionStorage.setItem("userData",result);
        return preparedQuestions;
        // return result;
    }catch(err){
        console.error("Error:",err.message);
    }
   
}
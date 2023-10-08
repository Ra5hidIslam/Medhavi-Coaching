import { useEffect, useState } from "react";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
require('dotenv').config();



const fetchQuestions= async (fetchedQuestions)=>{
    // const fetchedQuestions = await loadHomeFeed(user_id)
    // console.log("result from loadHomeFeed",fetchedQuestions);
    // if(!fetchedQuestions) return "not able to load home feed";

    // console.log(fetchedQuestions[0].questionAnswerNum);
    const fetchedQuestionArray = [];
    for(let i = 0;i<fetchedQuestions.length;i++){
        // console.log(fetchQuestions);
        const title = fetchedQuestions[i].questionTitle;
        const questionId = fetchedQuestions[i]._id;
        const questionType = fetchedQuestions[i].questionType;
        const examType = fetchedQuestions[i].examType;
        const subType = fetchedQuestions[i].subType;
        if(fetchedQuestions[i].questionType == 'NUM'){
            // let username = fetchedQuestions[i].username;
            fetchedQuestionArray.push({
                questionText:title,
                questionID:questionId,
                questionType:questionType,
                examType:examType,
                subType:subType,
                correctAnswer:fetchedQuestions[i].questionAnswerNum,
            })
        }
        else{
            // correctStatus = ;
            let answerOptions = [];
            const answer = fetchedQuestions[i].questionAnswer;
            for(let j = 0;j<fetchedQuestions[i].questionOptions.length;j++){
                // checkAnswerStatus(j,fetchedQuestions[i].questionAnswer);
                let tempAnswer = {
                    answerText:fetchedQuestions[i].questionOptions[j],
                    // isCorrect:(Number(fetchedQuestions[i].questionAnswer) - 1) == Number(i) ? true:false,
                    // answerId:String(fetchedQuestions[i]._id) + "a" + j,
                    answerId:String(fetchedQuestions[i]._id) + "a" + j,
                }
                answerOptions.push(tempAnswer);
            }
            fetchedQuestionArray.push({
                questionText:title,
                questionID:questionId,
                questionType:questionType,
                answer:answer,
                examType:examType,
                subType:subType,
                answerOptions:answerOptions,
            })
        
        }
        

    }
    return fetchedQuestionArray;
}



export const loadQuestions = async (user_id,examType,subType)=>{
    // const [questionArray,setQuestionArray] = useState([]);
    // const [loadingState,setLoadingState] = useState(true);
    // var questionArray;
    console.log("I am here");
    try{
        let data = {
                examType:examType,
                subType:subType,
            };
        const axiosPrivate = useAxiosPrivate;
        const url = process.env.REACT_APP_API_URL_SERVER+"/feed/getHomeFeed/" + String(user_id) + '/' + examType +'/'+ subType;
        // const response  = await fetch(url,{
        //         method:"POST",
        //         headers:{
        //             "Content-Type":"application/json",
        //             'Authorization':`Bearer ${sessionStorage.getItem("token")}`,
        //         },
        //         body:JSON.stringify(data),
        //         credentials:'include',
        //     });
        const response = await axiosPrivate.get(url,{
            // signal:controller.signal
            headers:{'Authorization':`Bearer ${sessionStorage.getItem("token")}`},
            
        });
        
        // const result = await response.data;
        console.log(response);
        if(response.status == 200){
            const result = response.data.feed;
            // console.log("result of api call",result);
            if(result.length == 0){
                return;
            }
            const preparedQuestions = await fetchQuestions(result);
            // // setQuestionArray(preparedQuestions);
            // // sessionStorage.setItem("userData",result);
            console.log(preparedQuestions);
            return preparedQuestions;    
        }
        return false;
        // return result;
    }catch(err){
        console.error("Error:",err.message);
    }
   
}

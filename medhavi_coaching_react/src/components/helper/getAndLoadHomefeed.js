import { useState } from "react";
import loadHomeFeed
 from "../client/loadHomeFeed";

const fetchQuestions = async(user_id)=>{
    const fetchedQuestions = await loadHomeFeed(user_id)
    // console.log(fetchedQuestions);
    if(!fetchedQuestions) return "not able to load home feed";
    const fetchedQuestionArray = [];
    for(let i = 0;i<fetchedQuestions.length;i++){
        let title = fetchedQuestions[i].questionTitle;
        let questionId = fetchedQuestions[i]._id;
        let username = fetchedQuestions[i].username;
        let userId = fetchedQuestions[i].userId;
        let answerOptions = [];
        for(let j = 0;j<fetchedQuestions[i].questionOptions.length;j++){
            let tempAnswer = {
                answerText:fetchedQuestions[i].questionOptions[j],
                // isCorrect:(Number(fetchedQuestions[i].questionAnswer) - 1) == Number(i) ? true:false,
                isCorrect:Number(fetchedQuestions[i].questionAnswer) - 1 === j,
                answerId:String(fetchedQuestions[i]._id) + "a" + i,
            }
            answerOptions.push(tempAnswer);
        }
        fetchedQuestionArray.push({
            questionText:title,
            questionID:questionId,
            username:username,
            userID:userId,
            answerOptions:answerOptions,
        })

    }
    return fetchedQuestionArray;
}
// var newArray;
// console.log("repeating!");
var questionArray = {
    val:{},
};

export const getAndLoadHomeFeed=()=>{
    // const [tempArray,setTempArray] = useState({});
    const getNewArray = async ()=>{
        var newArr = await fetchQuestions(sessionStorage.getItem("userId")); 
        return newArr;
    }
    if(sessionStorage.getItem("userId")){
        function assignNewArray(newarr){
            // newArray = newarr;
            // setTempArray(newarr);
            questionArray.val = newarr;
            console.log(questionArray.val);
        }
        getNewArray().then(response=> assignNewArray(response));
    }
    console.log(questionArray.val);
    if(questionArray.val.length != 0){
        return questionArray.val;
    }
    else{
        return null;
    }
}
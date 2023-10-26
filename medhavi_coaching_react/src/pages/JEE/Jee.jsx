import React from 'react';
import {Link} from 'react-router-dom';
import "./jee.css"
import { useState,useEffect } from 'react';
import QuestionsCSS from '../JEE/HomeFeed.module.css';
// import the library to fetch homefeed
import { loadQuestions } from '../../components/client/loadQuestions';
// import getUser from '../client/getUser';
import { useAuthContext } from '../../components/hooks/useAxiosPrivate'
import registerAnswer from '../../components/client/registerAnswer';
// import { AuthContext } from "../../context/AuthContext";
// import { useContext } from "react";
// import post from '../posts/Posts';
// import { getAndLoadHomeFeed } from '../helper/getAndLoadHomefeed';





// GetQuestion is used to get the questions from the db and render them accordingly
const GetQuestionAnswers =()=>{
    // Creating state variable which_answer which is used to store the states of the submit buttons pressed,
    //  if a button is pressed, this state will show if its pressed or not.
    const [which_answer,setAnswer] = useState({});
    const [which_button,setButton] = useState({});

    const [questionArray,setQuestionArray] = useState(null);    

    const [isMounted,setIsMounted] = useState(false);

    // Create another state to see the radio button options and based on that modify the show_answer function
    

    const [statCounter, setStateCounter] = useState(0);

    const [defaultExamType,setdefaultExamType] = useState("JEE");
    const [defaultSubType,setdefaultSubType] = useState("Physics");




    // This function provoked when we click the submit button, using the button pressed and the radio button selected
    // we will render the if the answer is correct or wrong.
    function select_answer(e,questionType,questionAnswer){
        // console.log(else);
        let typedAnswer;
        const ID = e.currentTarget.id;
        // let selected_button = event.
        // console.log(questionType);
        if(questionType == 'NUM'){
            let questionID = String(e.target.id);
            console.log("id",questionID);
            let textboxId = questionID.slice(0, - 1);
            console.log("id",textboxId);
            typedAnswer = (document.getElementsByName(textboxId))[0] != undefined ?  (document.getElementsByName(textboxId))[0].value:'';
            setButton((prev)=>{
                let radio_button_clicked;
                radio_button_clicked = {[questionID]:String(typedAnswer)};
                return {...prev,...radio_button_clicked};
            });
           

            
    
        }
        else if(questionType == 'MCQ'){
            const question_array_length = questionAnswer.length;
            // console.log(e.currentTarget.id);
            // console.log("question length = ",question_array_length);
            // Get the selected button id 
            let selected_button = [];
            for(let i = 0;i<question_array_length;i++){
                selected_button[i] = 0;
            }
            let button_value;
            for(let i = 0;i<question_array_length;i++){
                const button_id = e.currentTarget.name + 'a' + i;
                const r_button = document.getElementById(button_id);
                
                // console.log("button id",button_id);
                // console.log("button ",r_button.value);
                if(r_button.checked){
                    console.log("question id: " + e.currentTarget.name + " selected option = :" + r_button.value)
                    selected_button[i] = 1;
                }
            }    
            setButton((prev)=>{
                let radio_button_clicked;
                radio_button_clicked = {[ID]:selected_button};
                return {...prev,...radio_button_clicked};
            });            
        }
        
        
        // [id_of_clicked_button] = true
        setAnswer((prev)=>{
            let toggleId;
            if(prev[ID]){
                toggleId = {[ID]:false};
            }else{
                toggleId = {[ID]:true};
            }
            return {...prev,...toggleId};
        });
    }


    

    // Based on the states we are showing the 
    // result, whether the option is correct or not.
    function show_answer(question_id,answer,questionType,which_button,which_answer){
        let result;
        // console.log(question_id);
        // console.log(answer);
        // console.log(questionType);
        if(questionType == 'MCQ' || questionType == 'MSQ'){
            console.log("received answer",answer);
            console.log("selected answer",which_button);
            if (which_answer[question_id] === true) {
                const result = JSON.stringify(which_button[question_id]) === JSON.stringify(answer);
                const originalQuestionId = question_id.slice(0, -1);
            
                // Register the answer
                registerAnswer(localStorage.getItem("userId"), which_button[question_id], originalQuestionId, questionType);
            
                // Determine the CSS class based on the result
                const buttonClass = result ? 'correct-button' : 'wrong-button';
            
                return (
                  <button className={buttonClass}>
                    {result ? 'Correct Answer' : 'Wrong Answer'}
                  </button>
                );
              } else {
                return (
                  <button className="check-result-button">
                    Check Result
                  </button>
                );
              }
            }
        
        // if(which_answer[question_id] === true){
        //     let correct_answer;
        //     for(let i = 0;i<answer.length;i++){
        //         if(answer[i].isCorrect === true){
        //             correct_answer = answer[i].answerText;
        //             console.log(answer[i].answerText)
        //         }
        //     }
        //     // console.log(correct_answer);
        //     if(which_button[question_id] === correct_answer){
        //         return(
        //             <p>Correct Answer</p>
        //         )
        //     }
        //     else{
        //         return(
        //             <p>Wrong Answer</p>
        //         )
        //     }
        // }
        // else{
        //     return(
        //         <p>Check Result</p>
        //     )
        // }
    }
    

    // Call the function that fetches the api, and set a isLoading to true while it is getting fetched.
    // When the fetching is done, the state of isLoading should change and then the page should re render with 
    // new data.
    // var myArr = temp_array;
    useEffect(()=>{
        async function getData(){
            try{
                if(localStorage.getItem("userId") ){
                    console.log("repeating");
                    const response = await loadQuestions(localStorage.getItem("userId"),defaultExamType,defaultSubType);
                    
                    if(response == false)
                    {
                        console.log("server error");
                    }
                    else{
                        setQuestionArray(response);
                        // console.log("response",questionArray);
                    }
                    
                }
            }catch(err){
                console.log(err.message);
            }
            
        }
        getData();
    },[]);


    

    useEffect(()=>{
        console.log(which_answer);
        console.log(which_button);
    },[which_answer,which_button]);


    console.log("question array",questionArray);
    if(!questionArray){
        return <div>Loading...</div>;
    }

   function optionElement(questionType,q){
        if(questionType ==  'NUM'){
            return(
                <div>
                    <input name={q.questionID} 
                        id={q.quesitonID} 
                        value={q.questionAnswerNum}
                        type="text"
                        // onChange={this.handleChange}
                    />
                </div>
            )
            
        }
        else if(questionType == 'MSQ'){
            return(
                q.answerOptions.map((ao) => (
                    <div>
                        <input name={q.questionID} id={ao.answerId} type="radio" value={ao.answerText}></input>
                        <label className={QuestionsCSS.options}>{ao.answerText}</label>
                    </div>
                ))
            )
            
        }
        else if(questionType == 'MCQ'){
            return(
                q.answerOptions.map((ao) => (
                    <div>
                        <input name={q.questionID} id={ao.answerId} type="radio" value={ao.answerText}></input>
                        <label className={QuestionsCSS.options}>{ao.answerText}</label>
                    </div>
                ))
            )
    
   }
   
    
}


   function showAnswerElement(q,questionType){
        if(questionType == 'MCQ'){
            return(
                <button id = {q.questionID + 'b'} className={QuestionsCSS.sub_btn} name={q.questionID } onClick={(e) => {select_answer(e,questionType,q.answerOptions)}}>
                {show_answer(q.questionID + 'b',q.answer,q.questionType)}
                {/* {console.log("q length",q)} */}
                </button>
            )
        }
        else if(questionType == 'NUM'){
            return(
                <button id = {q.questionID + 'b'} className={QuestionsCSS.sub_btn} name={q.questionID } onClick={(e) => {select_answer(e,questionType,q.questionAnswerNum)}}>
                {show_answer(q.questionID + 'b',q.correctAnswer,q.questionType)}
                {/* {console.log("q length",q)} */}
                </button>
            )
        }
        else if(questionType == 'MSQ'){
            return(
                <button id = {q.questionID + 'b'} className={QuestionsCSS.sub_btn} name={q.questionID } onClick={(e) => {select_answer(e,questionType,q.answerOptions)}}>
                {show_answer(q.questionID + 'b',q.answerOptions)}
                {/* {console.log("q length",q)} */}
                </button>
            )
        }
        
        
   }


    return (
        // lets fetch the feed and then print it in the console.
            localStorage.getItem("userId") && questionArray.map((q) => (
            <div className={QuestionsCSS.question_block}>
                <div className={QuestionsCSS.question_title} id={q.questionID}>
                    {q.questionText}
                </div>
                <div className="answer-options">
                    {optionElement(q.questionType,q)}
                </div>
                <div>
                    {/* i want this whole div to be replaced with a new div consistingg of the answer */}
                    {showAnswerElement(q,q.questionType)}
                </div>
            </div>
        ))
    )

}
// export default GetQuestionAnswers;


function PageComponent() {
  return (
    <div className="link-contain">
      <div className="navbar-links">
        <Link to="/post">Post</Link>
        <Link to="/Blog/JEE">JEE</Link>
        <Link to="/Blog/NEET">NEET</Link>
        <Link to="/books">Books</Link>
      
      <div className=" test">
        <Link to="/test">Test</Link></div>
      </div>
    </div>
  );
}




const Jee = () => {
  return (
    <div>
        <PageComponent/>
        <GetQuestionAnswers/>
    </div>
  )
}

export default Jee;
import React, { useState,useEffect } from 'react'
import TestQuestionsCSS from './TestQuestions.module.css'


function TestQuestions({questions}) {
    // console.log(questions)
    const [questionnumber,setQuestionnumber] = useState(1);
    const [score,setScore] = useState({});
    function question_number(){
        let t = questionnumber;
        t = t+1;
        setQuestionnumber(t)
        console.log(questionnumber)
        return 2;
    }

    // update score based on click
    function updateScore(questionID,isCorrect){
        // console.log("button clicked");
        // const option_id = event.currentTarget.id;
        setScore((prev)=>{
            let answer_state;
            answer_state = {[questionID]:isCorrect};
            return {...prev,...answer_state};
        })
       
        
    }

    // show_score prompt
    function showScore(){
        console.log(score);
    }

    useEffect(()=>{
        // console.log("state:",which_answer)
        console.log("score:",score)
    },[score])

    return (
        <>
        {
            questions.map((q) => (
                <div className={TestQuestionsCSS.question_block}>
                    <div className={TestQuestionsCSS.question_title} id={q.questionID}>
                        { q.questionText}
                    </div>
                    <div className="answer-options">
                        {q.answerOptions.map((ao) => (
                            <div>
                                <input className={TestQuestionsCSS.radio_button} name={q.questionID} id={ao.answerId} type="radio" value={ao.answerText} onclick={()=>{updateScore(q.questionID,ao.isCorrect)}}></input>
                                <label className={TestQuestionsCSS.options}>{ao.answerText}</label>
                            </div>
                        ))}
                    </div>
                </div>
                
            ))
        }
        <button onclick ={showScore}>
            Submit
        </button>
        </>
        
        
    )
}

export default TestQuestions
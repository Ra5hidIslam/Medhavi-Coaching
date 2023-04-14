import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';

import Timer from '../../components/Timer/Timer'
import QuizCSS from './Quiz.module.css'


// import TestQuestions from '../../components/TestQuestions/TestQuestions';


// import QuizCSS from '../../pages/Quiz/Quiz.module.css'


// function Quiz() {
//   const { state } = useLocation();
//   const { qna } = state || {};


//   console.log(qna.questions);
//   return (
//     <div>
//       <Timer
//       time_limit = {60}
//       />
//       <TestQuestions
//       questions = {qna}
//       />
//     </div>
    
    
//   )
// }




function Quiz() {
  // console.log(questions)

  const { state } = useLocation();
  const { qna } = state || {};

  const questions = qna;

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
    let current_score = 0;
    for(let i = 0;i<Object.keys(score).length;i++){
      console.log();
      if(Object.values(score)[i]){
        current_score = current_score+ 1;
      }
    }
    alert("Your quiz has been submitted and your score is:" + current_score)
  }

  useEffect(()=>{
      // console.log("state:",which_answer)
      console.log("score:",score)
  },[score])

  return (
      <>
      {
          questions.map((q) => (
              <div className={QuizCSS.question_block}>
                  <div className={QuizCSS.question_title} id={q.questionID}>
                      { q.questionText}
                  </div>
                  <div className="answer-options">
                      {q.answerOptions.map((ao) => (
                          <div>
                              <input className={QuizCSS.radio_button} name={q.questionID} id={ao.answerId} type="radio" value={ao.answerText} onClick={()=>{updateScore(q.questionID,ao.isCorrect)}}></input>
                              <label className={QuizCSS.options}>{ao.answerText}</label>
                          </div>
                      ))}
                  </div>
              </div>
              
          ))
      }
      <button onClick ={showScore}>
          Submit
      </button>
      </>
      
      
  )
}

// setInterval(Quiz,1000);
export default Quiz;
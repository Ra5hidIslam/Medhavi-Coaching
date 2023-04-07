import React, { useEffect, useState } from 'react'
import { Link, Route ,Routes, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function QuizStartPage() {

  // get the data fromt the quiz list page
  const { state } = useLocation();
  const{ quiz_id,quiz_no_questions,quiz_time,quizes} = state;


  // Get the questions and pass to quiz when the
  //user presses the start button
  const [start,setStart] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if(start){
      navigate('/Quiz',{ state: {qna:quizes} }); 
      // console.log(start);
    }
  },[start])


  // function StartQuiz(){
  //   if(state){
  //     navigate('/Quiz',{ state: {name:'Rashidul'} }); 
  //   }
    
  // }


  return (
    <div className='Quiz-links'>
    <div className='start-button'>
      <div className='Quiz-id'>
          {quiz_id}
      </div>
      <div className='Quiz-questions'>
          {"No. of Questions:" + quiz_no_questions}
      </div>
      <div className='Quiz-time'>
          {"Time Limit:" + quiz_time}
      </div>
      <div className='Quiz-Start-Button'>
          <button onClick={()=>{setStart(!start)}}>
              START
          </button>
      </div>
    </div>
  </div>
  )
}

export default QuizStartPage
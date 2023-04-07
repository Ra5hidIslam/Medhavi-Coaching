import React from 'react';
import { useLocation } from 'react-router-dom';

// import Timer from '../../components/Timer/Timer'
import TestQuestions from '../../components/TestQuestions/TestQuestions';
// import QuizCSS from '../../pages/Quiz/Quiz.module.css'


function Quiz() {
  const { state } = useLocation();
  const { qna } = state || {};


  console.log(qna.questions);
  return (
    <TestQuestions
      questions = {qna}
    />
    // <p>
    //   Hello
    // </p>
  )
}

// setInterval(Quiz,1000);
export default Quiz;
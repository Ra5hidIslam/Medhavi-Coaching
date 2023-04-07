import React from 'react';
import { Link, Route ,Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import QuizStartPage from './QuizStartPage';

const quiz_array = [{
  quiz_id:'quiz1',
  quiz_time:15,
  quiz_qna:[
    {
      questionText: 'What is the capital of France?',
      questionID: 'q1',
      answerOptions: [
          { answerText: 'New York', isCorrect: false, answerId: 'q1a1' },
          { answerText: 'London', isCorrect: false, answerId: 'q1a2' },
          { answerText: 'Paris', isCorrect: true, answerId: 'q1a3' },
          { answerText: 'Dublin', isCorrect: false, answerId: 'q1a4' },
      ],
  },
  {
      questionText: 'Who is CEO of Tesla?',
      questionID: 'q2',
      answerOptions: [
          { answerText: 'Jeff Bezos', isCorrect: false, answerId: 'q2a1' },
          { answerText: 'Elon Musk', isCorrect: true, answerId: 'q2a2' },
          { answerText: 'Bill Gates', isCorrect: false, answerId: 'q2a3' },
          { answerText: 'Tony Stark', isCorrect: false, answerId: 'q2a4' },
      ],
  },
  {
      questionText: 'The iPhone was created by which company?',
      questionID: 'q3',
      answerOptions: [
          { answerText: 'Apple', isCorrect: true, answerId: 'q3a1' },
          { answerText: 'Intel', isCorrect: false, answerId: 'q3a2' },
          { answerText: 'Amazon', isCorrect: false, answerId: 'q3a3' },
          { answerText: 'Microsoft', isCorrect: false, answerId: 'q3a4' },
      ],
  },
  {
      questionText: 'How many Harry Potter books are there?',
      questionID: 'q4',
      answerOptions: [
          { answerText: '1', isCorrect: false, answerId: 'q4a1' },
          { answerText: '4', isCorrect: false, answerId: 'q4a2' },
          { answerText: '6', isCorrect: false, answerId: 'q4a3' },
          { answerText: '7', isCorrect: true, answerId: 'q4a4' },
      ],
  },
  ],
},
{
  quiz_id:'quiz2',
  quiz_time:10,
  quiz_qna:[
    {
      questionText: 'In thermodynamic process, which of the following statements is not true?',
      questionID: 'q1',
      answerOptions: [
          { answerText: 'In an adiabatic process, the system is insulated from the surroundings', isCorrect: false, answerId: 'q1a1' },
          { answerText: 'In an isochori process the pressure remains constant', isCorrect: true, answerId: 'q1a2' },
          { answerText: 'In an isothermal process the temperature remains constant.', isCorrect: false, answerId: 'q1a3' },
          { answerText: 'In an adaibatic process, PVy = constant', isCorrect: false, answerId: 'q1a4' },
      ],
  },
  {
      questionText: 'Which one of the following process is reversible?',
      questionID: 'q2',
      answerOptions: [
          { answerText: 'Transfer of heat by radiation', isCorrect: false, answerId: 'q2a1' },
          { answerText: 'Transfer of head by conduction', isCorrect: false, answerId: 'q2a2' },
          { answerText: 'Isothermal compression', isCorrect: true, answerId: 'q2a3' },
          { answerText: 'Electrical heating of a nichrome wire', isCorrect: false, answerId: 'q2a4' },
      ],
  },
  {
      questionText: 'Can two isotherm curves cut each other?',
      questionID: 'q3',
      answerOptions: [
          { answerText: 'Never', isCorrect: true, answerId: 'q3a1' },
          { answerText: 'Yes', isCorrect: false, answerId: 'q3a2' },
          { answerText: 'They will cut when the temperature is 0 degree celcius.', isCorrect: false, answerId: 'q3a3' },
          { answerText: 'Yes, when the pressure is equal to the critical pressure.', isCorrect: false, answerId: 'q3a4' },
      ],
  },
  {
      questionText: 'The first law of thermodynamics is based on?',
      questionID: 'q4',
      answerOptions: [
          { answerText: 'The concept of temperature.', isCorrect: false, answerId: 'q4a1' },
          { answerText: 'The concept of conservation of energy.', isCorrect: true, answerId: 'q4a2' },
          { answerText: 'The concept of working of heat engine.', isCorrect: false, answerId: 'q4a3' },
          { answerText: 'The concept of entropy.', isCorrect: false, answerId: 'q4a4' },
      ],
  },
  ],

},
]

//Rendering of question done(heer we have manually created them)

//After rendering we will get the response from the user and then 
//render the quiz which will be selected

function QuizList() {

  const navigate = useNavigate();

  console.log(quiz_array[1].quiz_qna)
  function renderQuiz(event){
    const quiz_id = event.currentTarget.id;
    console.log(quiz_id);
    quiz_array.forEach((q)=>{
      if(q.quiz_id === quiz_id){
        navigate('/QuizStartPage',{ state: {quiz_id:q.quiz_id, quiz_no_questions:q.length, quiz_time:q.quiz_time, quizes:q.quiz_qna}});
        // console.log(q.quiz_id)
      }
    })
    
  }

  return (
    quiz_array.map((quiz)=>(
      <p id = {quiz.quiz_id} onClick={(e)=>{renderQuiz(e)}}>
        {"Quiz No: " + quiz.quiz_id + " Time: " + quiz.quiz_time}
        {/* Hello */}
      </p> 
    ))
  );

}

// setInterval(Quiz,1000);
export default QuizList;
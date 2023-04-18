import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';

// import Timer from '../../components/Timer/Timer'
import QuizCSS from './Quiz.module.css'


// import TestQuestions from '../../components/TestQuestions/TestQuestions';


// import QuizCSS from '../../pages/Quiz/Quiz.module.css'


// function Quiz() {
//   const { state } = useLocation();;
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
    

    // code for the questions
    // getting the data passed from the quizstartpage
    const { state } = useLocation();
    const { qna,quiz_time } = state || {};
    const [showanswer,setShowanswer] = useState(false);
    // console.log("deadline" + quiz_time)

    
    // const [questionnumber,setQuestionnumber] = useState(1);

    let question_number =0;

    // Using one state variable score to get the score and update it
    // according to the button selected, when the user submits then we
    // we find the score and send it back to the db
    const [score,setScore] = useState({});

    function GetQuestionNumber(){
        question_number ++;
        return question_number;
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
    // CODE FOR GETTING THE QUESTION'S ANSWER THAT WILL BE
    // HIDDEN BELOW THE OPTIONS
    function getAnswer(question_id){
        let answer_of_question = '';
        for(let i = 0;i<qna.length;i++){
            if(qna[i].questionID === question_id){
                for(let j = 0;j<qna[i].answerOptions.length;j++){
                    if(qna[i].answerOptions[j].isCorrect === true){
                        answer_of_question = qna[i].answerOptions[j].answerText;
                        break;
                    }
                }
                break;

            }
        }
        return answer_of_question;
        // console.log(answer_of_question);
    }



    // show_score prompt
    function showScore(){
        setStop(true);
        setShowanswer(true);
        let current_score = 0;
        for(let i = 0;i<Object.keys(score).length;i++){
            console.log();
            if(Object.values(score)[i]){
            current_score = current_score+ 1;
            }
        }
        // if(confirm("Your quiz has been submitted and your score is:" + current_score)){
        //     console.log("Go to quiz list page");
        // }
        // else{
        //     console.log("stay on same page");
        // }
        window.confirm("Your quiz has been submitted and your score is:" + current_score); 
    }

    useEffect(()=>{
        // console.log("state:",which_answer)
        console.log("score:",score)
    },[score])






    // CODE FOR TIMER
    const deadline = quiz_time;
    const [time, setTime] = useState(deadline);
    const [stop,setStop] = useState(false);
    // const time = 15;
    // const currentDate = new Date.now()
    // const deadline = new Date(currentDate.getTime() + 15*60000);

    const getTime =()=>{
        if(time != 0){
        // console.log(time);
        // setDeadline(deadline-1)
        setTime(time-1);
        
        }
        else{
        setStop(true);
        // showScore();
        }
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
        if(stop == false){
            getTime(deadline)
        }},1000);
        return ()=>{
        clearInterval(interval);
        };
    },[time]);






    return (
        <>
        <div className={QuizCSS.show_timer}>Time Left:{time}</div>
        {
            qna.map((q) => (
                <div className={QuizCSS.question_block}>
                    <div className={QuizCSS.question_title} id={q.questionID}>
                        {"Q." + GetQuestionNumber() + " "+  q.questionText}
                    </div>
                    <div className="answer-options">
                        {q.answerOptions.map((ao) => (
                            <div>
                                <input className={QuizCSS.radio_button} name={q.questionID} id={ao.answerId} type="radio" value={ao.answerText} onClick={()=>{updateScore(q.questionID,ao.isCorrect)}}></input>
                                <label className={QuizCSS.options}>{ao.answerText}</label>
                            </div>
                        ))}
                    </div>
                    <div>
                        {
                        showanswer &&
                        <div className={QuizCSS.showanswer_btn}>Correct Answer: {getAnswer(q.questionID)}</div>
                        }
                    </div>
                    
                </div>
                
            ))
        }
        <button className={QuizCSS.sub_btn} onClick ={showScore}>
            Submit
        </button>
        </>
        
        
    )
}

// setInterval(Quiz,1000);
export default Quiz;
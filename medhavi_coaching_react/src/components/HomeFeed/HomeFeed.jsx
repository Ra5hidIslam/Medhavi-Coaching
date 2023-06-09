import React, { useState,useEffect } from 'react';
import QuestionsCSS from '../HomeFeed/HomeFeed.module.css'
// import the library to fetch homefeed
import loadHomeFeed from '../client/loadHomeFeed';




const questions_array = [
    {
        questionText: 'What is the capital of France?',
        questionID: 'q1',
        username:'Rashid',
        userID:'r_123',
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
        username:'Nur',
        userID:'N_123',
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
        username:'Rohan',
        userID:'Ro_123',
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
        username:'Sohail',
        userID:'S_123',
        answerOptions: [
            { answerText: '1', isCorrect: false, answerId: 'q4a1' },
            { answerText: '4', isCorrect: false, answerId: 'q4a2' },
            { answerText: '6', isCorrect: false, answerId: 'q4a3' },
            { answerText: '7', isCorrect: true, answerId: 'q4a4' },
        ],
    },
];



// function render_answer(question_id, answer_text){
//     // const question_object = questions_array.find(question => question.answerOptions);
//     // const answer_result = question_object.find(answer_text => answer_text.isCorrect);
//     // if (true){
//     //     return (
//     //         "Submit"
//     //     )
//     // }
//     // else{
//     //     return (
//     //         "Answer"
//     //     )
//     // }
//     return "Answer"
// }


// GetQuestion is used to get the questions from the db and render them accordingly
function GetQuestionAnswers(){
    // Creating state variable which_answer which is used to store the states of the submit buttons pressed,
    //  if a button is pressed, this state will show if its pressed or not.
    const [which_answer,setAnswer] = useState({});


    // Create another state to see the radio button options and based on that modify the show_answer function
    const [which_button,setButton] = useState({});


    // This function provoked when we click the submit button, using the button pressed and the radio button selected
    // we will render the if the answer is correct or wrong.
    function select_answer(event,question_array_length){
        const ID = event.currentTarget.id;
        // console.log(event.currentTarget.id);

        // Get the selected button id 
        let selected_button;
        let button_value;
        for(let i = 1;i<=question_array_length;i++){
            const button_id = event.currentTarget.name + 'a' + i;
            const r_button = document.getElementById(button_id);
            if(r_button.checked){
                // console.log("question id: " + event.currentTarget.name + " selected option = :" + r_button.value)
                selected_button  = ID;
                button_value = r_button.value;
            }
        }
        // 
        // call the api and the answer and set the feed interaction accordingly

        
        // using the selected button id, add it to the state variable.
        setButton((prev)=>{
            let radio_button_clicked;
            radio_button_clicked = {[selected_button]:button_value};
            return {...prev,...radio_button_clicked};
        });

        // Setting the submit button, if clicked
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
    function show_answer(question_id,answer){
        if(which_answer[question_id] === true){
            let correct_answer;
            for(let i = 0;i<answer.length;i++){
                console.log(answer[i].answerText)
                if(answer[i].isCorrect === true){
                    correct_answer = answer[i].answerText;
                }
            }
            // console.log(correct_answer);
            if(which_button[question_id] === correct_answer){
                return(
                    <p>Correct Answer</p>
                )
            }
            else{
                return(
                    <p>Wrong Answer</p>
                )
            }
        }
        else{
            return(
                <p>Check Result</p>
            )
        }
    }
    useEffect(()=>{
        // console.log("state:",which_answer)
        console.log("state:",which_button)
    },[which_answer,which_button])


    // const fetchedQuestions = await loadHomeFeed();
    const fetchQuestions = async (user_id)=>{
        const fetchedQuestions = await loadHomeFeed(user_id);
        if(!fetchedQuestions) return "not able to load home feed";
        else{
            return fetchedQuestions;
        }
        // const fetchedQuestionArray = [];
        // for(let i = 0;i<fetchedQuestions.length();i++){
        //     const title = fetchedQuestions.questionTitle;
        //     const questionId = fetchedQuestions._id;
        //     const userID = fetchedQuestions.userId;
        //     const answerOptions = [];
        //     for(let j = 0;j<fetchedQuestions.questionOptions;j++){
        //         let tempAnswer = {
        //             answerText:fetchedQuestions.questionOptions[i],
        //             isCorrect:((fetchedQuestions.questionAnswer - 1) === i) ? true:false,
        //             answerId:String(fetchedQuestions._id) + "a" + i,
        //         }
        //         answerOptions.push(tempAnswer);
        //     }
        //     fetchedQuestionArray.push({
        //         questionText:title,
        //         questionId:questionId,
        //         userId:userID,
        //         answerOptions:answerOptions,
        //     })

        // }
        // return fetchedQuestionArray;
    }
    console.log(fetchQuestions(sessionStorage.getItem("userId")));
    // console.log(sessionStorage.getItem("userId"));
    return (
        // lets fetch the feed and then print it in the console.
        questions_array.map((q) => (
            
            <div className={QuestionsCSS.question_block}>
                <div className={QuestionsCSS.username_element}>
                    {q.username}
                </div>
                <div className={QuestionsCSS.userID_element}>
                    {q.userID}
                </div>
                <div className={QuestionsCSS.question_title} id={q.questionID}>
                    {q.questionText}
                </div>
                <div className="answer-options">
                    {q.answerOptions.map((ao) => (
                        <div>
                            <input name={q.questionID} id={ao.answerId} type="radio" value={ao.answerText}></input>
                            <label className={QuestionsCSS.options}>{ao.answerText}</label>
                        </div>
                    ))}
                </div>
                <div>
                    {/* i want this whole div to be replaced with a new div consistingg of the answer */}
                    <button id = {q.questionID + 'b'} className={QuestionsCSS.sub_btn} name={q.questionID} onClick={(e) => {select_answer(e,questions_array.length)}}>
                    {show_answer(q.questionID + 'b',q.answerOptions)}
                    </button>
                </div>
                {/* Creating upvote,share and save button*/}
                <div className={QuestionsCSS.up_share_div}>
                    <button className={QuestionsCSS.up_share_btn}>
                        Upvote
                    </button>
                    <button className={QuestionsCSS.up_share_btn}>
                        Save
                    </button>
                    <button className={QuestionsCSS.up_share_btn}>
                        Share
                    </button>
                </div>
            </div>
        ))
    )
   
}

export default GetQuestionAnswers;

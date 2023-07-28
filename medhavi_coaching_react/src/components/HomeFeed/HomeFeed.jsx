import React, { useState,useEffect } from 'react';
import QuestionsCSS from '../HomeFeed/HomeFeed.module.css'
// import the library to fetch homefeed
import { loadHomeFeed } from '../client/loadHomeFeed';
import getUser from '../client/getUser';
// import { getAndLoadHomeFeed } from '../helper/getAndLoadHomefeed';


// var temp_array = [
//     {
//         questionText: 'What is the capital of France?',
//         questionID: 'q1',
//         username:'Rashid',
//         userID:'r_123',
//         answerOptions: [
//             { answerText: 'New York', isCorrect: false, answerId: 'q1a1' },
//             { answerText: 'London', isCorrect: false, answerId: 'q1a2' },
//             { answerText: 'Paris', isCorrect: true, answerId: 'q1a3' },
//             { answerText: 'Dublin', isCorrect: false, answerId: 'q1a4' },
//         ],
//     },
//     {
//         questionText: 'Who is CEO of Tesla?',
//         questionID: 'q2',
//         username:'Nur',
//         userID:'N_123',
//         answerOptions: [
//             { answerText: 'Jeff Bezos', isCorrect: false, answerId: 'q2a1' },
//             { answerText: 'Elon Musk', isCorrect: true, answerId: 'q2a2' },
//             { answerText: 'Bill Gates', isCorrect: false, answerId: 'q2a3' },
//             { answerText: 'Tony Stark', isCorrect: false, answerId: 'q2a4' },
//         ],
//     },
//     {
//         questionText: 'The iPhone was created by which company?',
//         questionID: 'q3',
//         username:'Rohan',
//         userID:'Ro_123',
//         answerOptions: [
//             { answerText: 'Apple', isCorrect: true, answerId: 'q3a1' },
//             { answerText: 'Intel', isCorrect: false, answerId: 'q3a2' },
//             { answerText: 'Amazon', isCorrect: false, answerId: 'q3a3' },
//             { answerText: 'Microsoft', isCorrect: false, answerId: 'q3a4' },
//         ],
//     },
//     {
//         questionText: 'How many Harry Potter books are there?',
//         questionID: 'q4',
//         username:'Sohail',
//         userID:'S_123',
//         answerOptions: [
//             { answerText: '1', isCorrect: false, answerId: 'q4a1' },
//             { answerText: '4', isCorrect: false, answerId: 'q4a2' },
//             { answerText: '6', isCorrect: false, answerId: 'q4a3' },
//             { answerText: '7', isCorrect: true, answerId: 'q4a4' },
//         ],
//     },
// ];


// const newArray = getAndLoadHomeFeed();



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
const GetQuestionAnswers =()=>{
    // Creating state variable which_answer which is used to store the states of the submit buttons pressed,
    //  if a button is pressed, this state will show if its pressed or not.
    const [which_answer,setAnswer] = useState({});
    const [questionArray,setQuestionArray] = useState(null);    

    const [isMounted,setIsMounted] = useState(false);

    // Create another state to see the radio button options and based on that modify the show_answer function
    const [which_button,setButton] = useState({});

    const [statCounter, setStateCounter] = useState(0);


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
                if(answer[i].isCorrect === true){
                    // correct_answer = answer[i].answerText;
                    console.log(answer[i].answerText)
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
    

    // Call the function that fetches the api, and set a isLoading to true while it is getting fetched.
    // When the fetching is done, the state of isLoading should change and then the page should re render with 
    // new data.
    // var myArr = temp_array;
    useEffect(()=>{
        async function getData(){
            try{
                if(sessionStorage.getItem("userId")){
                    const response = await loadHomeFeed(sessionStorage.getItem("userId"));
                    // // Get the profile data too  
                    const user = await getUser(sessionStorage.getItem("userId"));
                    console.log("user:",user);
                    // set the sessionStorage user id to the extracted userID
                    // Since storing object directly is not possible so we need to convert it into json and then save it
                    const userJson = JSON.stringify(user);  
                    sessionStorage.setItem("user",userJson);
                    // const data = await response.json();
                    setQuestionArray(response);
                    // myArr = response;
                }
            }catch(err){
                // console.log(err.message);
            }
            
        }
        getData();
    },[]);

    useEffect(()=>{
        console.log(which_answer);
        console.log(which_button);
    },[which_answer,which_button]);


    if(!questionArray){
        return <div>Loading...</div>;
    }

    
    // setQuestionArray(temp_array);

    // console.log("I am repeating");

    // console.log("final questions array",questionArray);
    return (
        // lets fetch the feed and then print it in the console.
            sessionStorage.getItem("userId") && questionArray.map((q) => (
            <div className={QuestionsCSS.question_block}>
                {/* <div className={QuestionsCSS.username_element}>
                    {q.userName}
                </div> */}
                <div className={QuestionsCSS.userID_element}>
                    {q.userName}
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
                    <button id = {q.questionID + 'b'} className={QuestionsCSS.sub_btn} name={q.questionID} onClick={(e) => {select_answer(e,questionArray.length)}}>
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

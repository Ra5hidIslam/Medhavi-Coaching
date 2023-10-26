import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './jee.css';
import QuestionsCSS from '../JEE/HomeFeed.module.css';
import { loadQuestions } from '../../components/client/loadQuestions';
import registerAnswer from '../../components/client/registerAnswer';

const GetQuestionAnswers = ({questionArray, setQuestionArray, selectedSubject,setSelectedSubject }) => {
    const arr = questionArray;
  const [which_answer, setAnswer] = useState({});
  const [which_button, setButton] = useState({});
  useEffect(()=>{
        console.log(which_answer);
        console.log(which_button);
  },[which_answer,which_button])
//   const [selectedSubject, setSelectedSubject] = useState('Physics');
//   const [filteredQuestions, setFilteredQuestions] = useState(arr);
//   setFilteredQuestions(questionArray);
//   console.log("filtered q =",filteredQuestions,"/t","question arr",questionArray);

//   const filterQuestionsBySubject = (subject) => {
//     if (questionArray && questionArray.length > 0) {
//       const filtered = questionArray.filter((question) => question.subject === subject);
//       setFilteredQuestions(filtered);
//       setSelectedSubject(subject);
//     } else {
//       // Handle the case when questionArray is empty
//       setFilteredQuestions([]);
//       setSelectedSubject(subject);
//     }
//   };

const getQuestions = async(userId,defaultExamType,defaultSubType) => {
    const questions = await loadQuestions(userId,defaultExamType,defaultSubType);
    return questions;
}


  function optionElement(questionType, q) {
    if (questionType === 'NUM') {
      return (
        <div>
          <input name={q.questionID} id={q.questionID} value={q.questionAnswerNum} type="text" onChange={(e)=>{setButton((prev)=>{let radio_button_clicked;radio_button_clicked = {[q.questionID]:e.target.value};
                                                                                                                            return {...prev,...radio_button_clicked}})}}/>
        </div>

      );
    } else if (questionType === 'MSQ' || questionType === 'MCQ') {
      return q.answerOptions.map((ao) => (
        <div key={ao.answerId}>
          <input name={q.questionID} id={ao.answerId} type="radio" value={ao.answerText}></input>
          <label className={QuestionsCSS.options}>{ao.answerText}</label>
        </div>
      ));
    }
  }

  function showAnswerElement(q, questionType) {
    // console.log("quesiton object",q);
    const answer = questionType=="NUM" ? q.correctAnswer : q.answer;
    return (
      <button
        id={q.questionID + 'b'}
        className={QuestionsCSS.sub_btn}
        name={q.questionID}
        onClick={(e) => {
          select_answer(e, questionType, q);
        }}
      >
        {show_answer(q.questionID, answer, questionType)}
      </button>
    );
  }

  function select_answer(e, questionType, question) {
    const ID = e.currentTarget.id.slice(0,-1);
    // console.log("Button clicked",ID);
    // if (questionType === 'NUM') {
      // const questionID = String(e.target.id);
      // console.log("ID= ",ID,"questionID = ",questionID);
      // const textboxId = ID;
    //   var elements = document.getElementsByName(textboxId);
    //   var typedAnswer = elements.length > 0 ? elements[0].value : '';
    // const typedAnswer = (document.getElementsByName(textboxId))[0] != undefined ?  (document.getElementsByName(textboxId))[0].value:'';
    // setButton((prev) => ({
    // ...prev,
    // [questionID]: typedAnswer,
    // }));
    // setButton((prev)=>{
    //     let radio_button_clicked;
    //     radio_button_clicked = {[questionID]:String(typedAnswer)};
    //     return {...prev,...radio_button_clicked};
    // });
    // } else 
    if(questionType === 'MSQ' || questionType === 'MCQ') {
      const selected_button = [];
      for (let i = 0; i < question.answerOptions.length; i++) {
        const button_id = e.currentTarget.name + 'a' + i;
        const r_button = document.getElementById(button_id);
        selected_button.push(r_button.checked ? 1 : 0);
      }
      setButton((prev) => ({
        ...prev,
        [ID]: selected_button,
      }));
    }

    setAnswer((prev) => ({
      ...prev,
      [ID]: !prev[ID],
    }));
  }

  function show_answer(question_id, answer, questionType) {
    if (which_answer[question_id] === true) {
      const isCorrect = questionType === 'NUM'
        ? String(answer) === which_button[question_id]
        : JSON.stringify(which_button[question_id]) === JSON.stringify(answer);
  
      const originalQuestionId = question_id.slice(0, -1);
      registerAnswer(localStorage.getItem('userId'), which_button[question_id], originalQuestionId, questionType);
  
      if (isCorrect) {
        return (
          <p style={{ color: 'green'}}>
            Correct Answer
          </p>
        );
      } else {
        return (
          <p style={{ color: 'red', padding: '0' ,}}>
            Wrong Answer
          </p>
        );
      }
    } else {
      return <p style={{ color: 'black', padding: '0' }}>Check Result</p>;
    }
  }

//   setQuestionArray(getQuestions(localStorage.getItem('userId'),'JEE','Physics'))

  return (
    <div>
      <div className="subject-buttons">
        <button className='Physics' onClick={() => {setSelectedSubject('Physics')}}>Physics</button>
        <button className='Chemistry' onClick={() => {setSelectedSubject('Chemistry')}}>Chemistry</button>
        <button className= "Mathematics" onClick={() => {setSelectedSubject('Mathematics')}}>Mathematics</button>
      </div>
        <div>
            {!questionArray.length>0 ? <div>Loading..</div>:questionArray.map((q) => (
                <div className={QuestionsCSS.question_block} key={q.questionID}>
                <div className={QuestionsCSS.question_title} id={q.questionID}>
                    {q.questionText}
                </div>
                <div className="answer-options">{optionElement(q.questionType, q)}</div>
                <div>{showAnswerElement(q, q.questionType)}</div>
                </div>
            ))}
        </div>
    </div>
  );
};

function PageComponent() {
  return (
    <div className="link-contain">
      <div className="navbar-links">
        <Link to="/post">Post</Link>
        <Link to="/Blog/JEE">JEE</Link>
        <Link to="/Blog/NEET">NEET</Link>
        <Link to="/books">Books</Link>
        <div className="test">
          <Link to="/test">Test</Link>
        </div>
      </div>
    </div>
  )
}

const Jee = () => {
  const [questionArray, setQuestionArray] = useState([]);
  const [selectedSubject,setSelectedSubject] = useState('Physics'); // Set the initial subject

  useEffect(() => {
    async function getData() {
      try {
        if (localStorage.getItem('userId')) {
          const response = await loadQuestions(localStorage.getItem('userId'),'JEE',selectedSubject);
          if (response === false) {
            console.log('server error');
          } else {
            console.log(response);
            if(response == undefined){
                setQuestionArray([]);
            }
            else{
                setQuestionArray(response);
            }
            
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
  }, [selectedSubject]);


  console.log("q ar",questionArray);
  return (
    <div>
      <PageComponent />
      <GetQuestionAnswers questionArray={questionArray} setQuestionArray={setQuestionArray} selectedSubject = {selectedSubject} setSelectedSubject={setSelectedSubject}/>
    </div>
  );
};

export default Jee;
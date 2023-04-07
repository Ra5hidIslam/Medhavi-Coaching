import React from 'react'
import TestQuestionsCSS from './TestQuestions.module.css'


function TestQuestions({questions}) {
    // console.log(questions)
    return (
        questions.map((q) => (
            <div className={TestQuestionsCSS.question_block}>
                <div className={TestQuestionsCSS.question_title} id={q.questionID}>
                    {q.questionText}
                </div>
                <div className="answer-options">
                    {q.answerOptions.map((ao) => (
                        <div>
                            <input name={q.questionID} id={ao.answerId} type="radio" value={ao.answerText}></input>
                            <label className={TestQuestionsCSS.options}>{ao.answerText}</label>
                        </div>
                    ))}
                </div>
            </div>
        ))
    )
}

export default TestQuestions
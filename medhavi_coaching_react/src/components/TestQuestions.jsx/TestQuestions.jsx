import React from 'react'
import TestQuestionsCSS from './TestQuestions.module.css'


const questions_array = [
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
];


function TestQuestions() {
    return (
        questions_array.map((q) => (
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
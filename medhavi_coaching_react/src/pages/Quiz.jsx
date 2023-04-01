import React from 'react';
import Timer from '../components/Timer/Timer'
import TestQuestions from '../components/TestQuestions.jsx/TestQuestions';

function Quiz() {
  return (
    <div>
      <div className='Timer'>
        <Timer/>
      </div>
      <div>
        <TestQuestions/>
      </div>
    </div>
    
  )
}

// setInterval(Quiz,1000);
export default Quiz;
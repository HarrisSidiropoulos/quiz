import React from 'react';
import Question from './question'

const Quiz = ()=> {
  return (
    <div className="container">
      <div className="quiz page active">
        <header>
          <div className="col-md-12">
            <div className="score">
              <span className="score-name">ΒΑΘΜΟΛΟΓΙΑ</span>
              <span>&nbsp;&nbsp;</span>
              <span className="score-value">0/35</span>
            </div>
          </div>
        </header>
        <div className="quiz-container">
          <Question />
        </div>
      </div>
    </div>
  );
}

export default Quiz;

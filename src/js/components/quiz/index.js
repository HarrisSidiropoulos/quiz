import React from 'react';
const images = [
  require('./images/Q1.jpg'),
  require('./images/Q2.jpg'),
  require('./images/Q3.jpg'),
  require('./images/Q4.jpg'),
  require('./images/Q5.jpg'),
  require('./images/Q6.jpg'),
  require('./images/Q7.jpg')
]
const Quiz = ()=> {
  return (
    <div className="container">
      <div className="quiz page active">
        <header>
          <div className="col-md-12">
            <div className="score">
              <span className="score-name">ΒΑΘΜΟΛΟΓΙΑ&nbsp;&nbsp;</span>
              <span className="score-value">0/35</span>
            </div>
          </div>
        </header>
        <div className="quiz-container">
          <div className="question-container active">
            <div className="left-panel">
              <h4 className="question-heading">
                <span className="question-name">ΕΡΩΤΗΣΗ</span>
                <span className="question-value">( 1 / 7 )</span>
              </h4>
              <div className="question">Ποιό χαρακτηριστικό καθορίζει την κοινωνικοπολιτισμική πρακτική των πανηγυριών;</div>
              <ul className="answers">
                <li>
                  <a className="btn">Α. Μουσική</a>
                </li>
                <li>
                  <a className="btn">Γ. Παρέα</a>
                </li>
                <li>
                  <a className="btn">Δ. Φαγοπότι</a>
                </li>
                <li>
                  <a className="btn">Ε. Τραγούδι</a>
                </li>
              </ul>
            </div>
            <div className="right-panel">
              <div className="image-container">
                <img src={images[0]} alt="q1" width="560" height="555" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import Question from './question'
import QUIZ_DATA from 'data'
import acc from 'utils/acc'
import AnswerDialog from './question/answer-dialog'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Sound from 'react-sound'

const successSound = require('./sounds/success.mp3')

class Quiz extends Component {
  render() {
    const {
      score, totalAnswers, currentQuestion,
      showAnswer, isAnswerCorrect, currentQuestionScore
    } = this.props;
    return (
      <div className="quiz page active">
        <header>
          <div className="col-md-12">
            <div className="score">
              <span className="score-name">{acc(QUIZ_DATA['score-label']).toUpperCase()}</span>
              <span>&nbsp;&nbsp;</span>
              <span className="score-value">{score} / {totalAnswers}</span>
            </div>
          </div>
        </header>
        <div className="quiz-container">
          <ReactCSSTransitionGroup
            transitionName="left"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            <Question test={currentQuestion} key={currentQuestion} {...this.props} />
          </ReactCSSTransitionGroup>
          <div className={`current-score ${showAnswer && isAnswerCorrect ? 'visible' : 'hidden'}`}>+{currentQuestionScore}</div>
          <AnswerDialog {...this.props}/>
          <Sound url={successSound} playStatus={`${showAnswer && isAnswerCorrect ? Sound.status.PLAYING : Sound.status.STOPPED}`}/>
          <audio src={successSound} preload="true"/>
        </div>
      </div>
    );
  }
}
Quiz.propTypes = {
  score: PropTypes.number.isRequired,
  totalAnswers: PropTypes.number.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  showAnswer: PropTypes.bool.isRequired,
  isAnswerCorrect: PropTypes.bool.isRequired,
  currentQuestionScore: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ quiz } ) => quiz;
export default connect(mapStateToProps)(Quiz);

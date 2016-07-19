import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Question from './question'
import {getNextQuestion, hideAnswer, checkAnswer} from 'actions'
import QUIZ_DATA from 'data'
import acc from 'utils/acc'
import AnswerDialog from './answer-dialog'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Sound from 'react-sound'

const successSound = require('./sounds/success.mp3')

class Quiz extends Component {
  render() {
    const {
      score, totalAnswers, currentQuestion,
      showAnswer, isAnswerCorrect, isQuizCompleted,
      currentQuestionScore,
      checkAnswer, hideModal
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
            <Question test={currentQuestion} key={currentQuestion} checkAnswer={(index)=> checkAnswer(index)} {...this.props} />
          </ReactCSSTransitionGroup>
          <div className={`current-score ${showAnswer && isAnswerCorrect ? 'visible' : 'hidden'}`}>+{currentQuestionScore}</div>
          <AnswerDialog {...this.props} hideModal={()=> hideModal(isAnswerCorrect, isQuizCompleted)}/>
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
  isQuizCompleted: PropTypes.bool.isRequired,
  currentQuestionScore: PropTypes.number.isRequired,
  hideModal: PropTypes.func.isRequired,
  checkAnswer: PropTypes.func.isRequired
};

const mapStateToProps = ({ quiz } ) => quiz;
const mapDispatchToProps = (dispatch) => ({
  hideModal: (isAnswerCorrect, isQuizCompleted) => {
    if (isAnswerCorrect) {
      if (isQuizCompleted) {
        browserHistory.push('/')
      }
      dispatch(getNextQuestion())
    } else {
      dispatch(hideAnswer())
    }
  },
  checkAnswer: (index)=> dispatch(checkAnswer(index))
})
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

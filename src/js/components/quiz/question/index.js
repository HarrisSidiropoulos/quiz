import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {checkAnswer, getNextQuestion, hideAnswer} from 'actions'
import QUIZ_DATA from 'data'
import acc from 'utils/acc'
import AnswerDialog from './answer-dialog'

const images = [
  require('./images/Q1.jpg'),
  require('./images/Q2.jpg'),
  require('./images/Q3.jpg'),
  require('./images/Q4.jpg'),
  require('./images/Q5.jpg'),
  require('./images/Q6.jpg'),
  require('./images/Q7.jpg')
];

class Question extends Component {
    render() {
      const {
        dispatch, question, totalQuestions, currentQuestion, currentQuestionScore,
        answers, image, showAnswer, isAnswerCorrect, currentAnswer
      } = this.props;

      const img = parseInt(image.replace('Q', ''), 10) - 1;
      const _answers = answers.map((item, index)=> {
        item.text = QUIZ_DATA.letters[index].toUpperCase() + '. ' +item.label;
        if (item.answered && item["is-correct"]) {
          return {...item, classes: 'btn success disabled'}
        } else if (item.answered) {
          return {...item, classes: 'btn error disabled'}
        }
        return {...item, classes: 'btn'}
      })
      return (
        <div className="question-container active">
          <div className="left-panel">
            <h4 className="question-heading">
              <span className="question-name">{acc(QUIZ_DATA['question-label']).toUpperCase()}</span>&nbsp;
              <span className="question-value">( {currentQuestion} / {totalQuestions} )</span>
            </h4>
            <div className="question">{question}</div>
            <ul className="answers">
              {
                _answers.map(({description, text, classes}, index)=> (
                  <li key={index}>
                    <a className={classes} onClick={()=> dispatch(checkAnswer(index))}>{text}</a>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="right-panel">
            <div className="image-container">
              <img src={images[img]} alt={img} width="560" height="555" />
            </div>
          </div>
          <div className={`current-score ${showAnswer && isAnswerCorrect ? 'visible' : 'hidden'}`}>+{currentQuestionScore}</div>
          <AnswerDialog {...this.props}/>
        </div>
      );
    }
}
Question.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  image: PropTypes.string.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  totalAnswers: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  isQuizCompleted: PropTypes.bool.isRequired,
  showAnswer: PropTypes.bool.isRequired,
  isAnswerCorrect: PropTypes.bool.isRequired,
  currentQuestionScore: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ quiz } ) => quiz;
export default connect(mapStateToProps)(Question);

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import Question from './question'
import QUIZ_DATA from 'data'
import acc from 'utils/acc'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Quiz extends Component {
  render() {
    const {score, totalAnswers, currentQuestion} = this.props;
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
            <Question key={currentQuestion} />
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}
Quiz.propTypes = {
  score: PropTypes.number.isRequired,
  totalAnswers: PropTypes.number.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ quiz } ) => quiz;
export default connect(mapStateToProps)(Quiz);

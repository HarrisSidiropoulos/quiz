import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import Question from './question'
import QUIZ_DATA from '../../data'
import acc from '../../utils/acc'

class Quiz extends Component {
  render() {
    const {score, totalAnswers} = this.props;
    return (
      <div className="container">
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
            <Question />
          </div>
        </div>
      </div>
    );
  }
}
Quiz.propTypes = {
  score: PropTypes.number.isRequired,
  totalAnswers: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ quiz } ) => quiz;
export default connect(mapStateToProps)(Quiz);

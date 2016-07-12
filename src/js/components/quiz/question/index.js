import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'

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
      const {question} = this.props;
      const img = parseInt(question.image.replace('Q', ''), 10) - 1;
      return (
        <div className="question-container active">
          <div className="left-panel">
            <h4 className="question-heading">
              <span className="question-name">ΕΡΩΤΗΣΗ</span>&nbsp;
              <span className="question-value">( 1 / 7 )</span>
            </h4>
            <div className="question">{question.question}</div>
            <ul className="answers">
              {
                question.answers.map(({description, label}, index)=> (
                  <li key={index}><a className="btn">{label}</a></li>
                ))
              }
            </ul>
          </div>
          <div className="right-panel">
            <div className="image-container">
              <img src={images[img]} alt={img} width="560" height="555" />
            </div>
          </div>
        </div>
      );
    }
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  isQuizCompleted: PropTypes.bool.isRequired
};

const mapStateToProps = ({ quiz } ) => ( quiz );
export default connect(mapStateToProps)(Question);

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {getNextQuestion, hideAnswer} from '../../../../actions'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import QUIZ_DATA from '../../../../data'

class AnswerDialog extends Component {
  hideModal() {
    const {dispatch, currentAnswer, answers} = this.props;
    const isAnswerCorrect = currentAnswer>=0 && answers[currentAnswer]["is-correct"];
    if (isAnswerCorrect) {
      dispatch(getNextQuestion())
    } else {
      dispatch(hideAnswer(true))
    }
  }
  render() {
    const {
      dispatch, question, totalQuestions, currentQuestion,
      answers, image, showAnswer, currentAnswer
    } = this.props;

    const isAnswerCorrect = currentAnswer>=0 && answers[currentAnswer]["is-correct"];
    const answerDialogBtnLabel = isAnswerCorrect ? QUIZ_DATA["next-question-button-label"] : QUIZ_DATA["error-button-label"];
    const answerDialogDescription = currentAnswer<0 ? '' : answers[currentAnswer].description;
    const answerDialogType = isAnswerCorrect ? "success" : "danger";

    return (
      <Modal show={showAnswer} animation={true} onHide={(()=>this.hideModal())}>
        <Modal.Header closeButton />
        <Modal.Body dangerouslySetInnerHTML={{__html:answerDialogDescription}}>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle={answerDialogType} onClick={()=>this.hideModal()}>{answerDialogBtnLabel}</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

AnswerDialog.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  image: PropTypes.string.isRequired,
  currentAnswer: PropTypes.number.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  totalAnswers: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  isQuizCompleted: PropTypes.bool.isRequired,
  showAnswer: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ quiz } ) => quiz;
export default connect(mapStateToProps)(AnswerDialog);

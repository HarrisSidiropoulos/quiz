import React, {Component, PropTypes} from 'react';
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'

class AnswerDialog extends Component {
  render() {
    const {
      isAnswerCorrect, showAnswer, answerDialogBtnLabel,
      answerDialogDescription, answerDialogType, hideModal
    } = this.props;

    return (
      <Modal className={isAnswerCorrect && 'success'} show={showAnswer} animation={true} onHide={(()=>hideModal())}>
        <Modal.Header closeButton={!isAnswerCorrect} />
        <Modal.Body dangerouslySetInnerHTML={{__html:answerDialogDescription}} />
        <Modal.Footer>
          <Button bsStyle={answerDialogType} onClick={()=>hideModal()}>{answerDialogBtnLabel}</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

AnswerDialog.propTypes = {
  showAnswer: PropTypes.bool.isRequired,
  isAnswerCorrect: PropTypes.bool.isRequired,
  answerDialogBtnLabel: PropTypes.string.isRequired,
  answerDialogDescription: PropTypes.string.isRequired,
  answerDialogType: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired
};

export default AnswerDialog;

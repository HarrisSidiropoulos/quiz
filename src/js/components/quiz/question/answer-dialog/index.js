import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {getNextQuestion, hideAnswer} from '../../../../actions'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import QUIZ_DATA from '../../../../data'

class AnswerDialog extends Component {
  hideModal() {
    const {dispatch, isAnswerCorrect} = this.props;
    if (isAnswerCorrect) {
      dispatch(getNextQuestion())
    } else {
      dispatch(hideAnswer())
    }
  }
  render() {
    const {
      showAnswer, answerDialogBtnLabel,answerDialogDescription, answerDialogType
    } = this.props;

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
  showAnswer: PropTypes.bool.isRequired,
  isAnswerCorrect: PropTypes.bool.isRequired,
  answerDialogBtnLabel: PropTypes.string.isRequired,
  answerDialogDescription: PropTypes.string.isRequired,
  answerDialogType: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ quiz } ) => quiz;
export default connect(mapStateToProps)(AnswerDialog);

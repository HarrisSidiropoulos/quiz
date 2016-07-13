import React from 'react';
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'

const AnswerDialog = (props)=> (
  <Modal show={props.show} animation={true} onHide={props.hideModal}>
    <Modal.Header closeButton />
    <Modal.Body dangerouslySetInnerHTML={{__html:props.description?props.description:''}}>
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle={props.type} onClick={props.hideModal}>{props.btnLabel}</Button>
    </Modal.Footer>
  </Modal>
)

export default AnswerDialog

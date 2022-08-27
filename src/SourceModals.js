import React from "react";
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import { Button } from 'react-bootstrap';

class SourceModals extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        };

        this.onSubmit = this.onSubmit.bind(this);
      };

      onSubmit(ev) {
        ev.preventDefault();
        this.props.handleClose();
    }
    
    render() {
    const { onSubmit } = this;
    const { handleClose, isShowModal } = this.props;
        return(
       
        <Modal animation={false} show={isShowModal} onHide={handleClose}>
            <ModalHeader>
              <ModalTitle>Sources</ModalTitle>
            </ModalHeader>
            <ModalBody>
                   APIS: IGBD, Stripe, Github
                   <br></br>
                   Special Thanks to @edmundojr_ for the CSS Zelda Heart!
                   <br></br>
                   Huge Thanks to Prof, Colton and Jonathan!!!!!!!!!
            </ModalBody>
            <ModalFooter>
              <Button variant="primary" onClick={onSubmit}>
                Back 
              </Button>
            </ModalFooter>
         </Modal>
        
      )
    }
  }


export default connect(null)(SourceModals);
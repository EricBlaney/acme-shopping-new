import React from "react";
import { updateProducts } from '../../../store';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import {Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

class ProductModals extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          id: this.props.product.id,
          name: this.props.product.name,
          summary: this.props.product.summary,
          imageUrl: this.props.product.imageUrl,
          rating: this.props.product.rating,
          releaseDate: this.props.product.releaseDate,
          price: this.props.product.price,
          theme: this.props.product.theme,
          condition: this.props.product.condition
        };
        console.log(this.props.handleClose)
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      };

            handleChange(ev){
               this.setState({ [ev.target.name]: ev.target.value });
            }
    
            onSubmit(ev) {
                ev.preventDefault();
                this.props.handleClose();
                this.props.updateProducts(this.state);
            }
    
    render() {
    const { onSubmit  } = this;
    const { handleClose, isShowModal } = this.props;
     const {name, summary, price} = this.state;
        return(
       
        <Modal animation={false} show={isShowModal} onHide={handleClose}>
            <ModalHeader>
              <ModalTitle>Update {this.props.product.name}'s details:</ModalTitle>
            </ModalHeader>
            <ModalBody>
            <Form.Group >
              <Form.Label>Game/Console Name: </Form.Label>
              <Form.Control type="text" name='name' onChange={this.handleChange} defaultValue={name} placeholder="enter a name"/>     
              <Form.Label>Game Summary: </Form.Label>
              <Form.Control type="text" name='summary' onChange={this.handleChange} defaultValue={summary} placeholder="enter a summary"/> 
              <Form.Label>Price: </Form.Label>
              <Form.Control type="text" name='price' onChange={this.handleChange} defaultValue={price} placeholder="enter a price"/>          
            </Form.Group>            
            </ModalBody>
            <ModalFooter>
              <Button variant="primary" onClick={onSubmit}>
                Submit 
              </Button>
            </ModalFooter>
         </Modal>
        
      )
    }
  }

  const mapDispatch = (dispatch) => {
    return{
        updateProducts: (product) =>  dispatch(updateProducts(product)),
    }
}

export default connect(null, mapDispatch)(ProductModals);
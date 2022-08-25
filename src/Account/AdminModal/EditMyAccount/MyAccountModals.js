import React from "react";
import { updateUsers } from '../../../store';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Button from 'react-bootstrap/button';
import Form from 'react-bootstrap/Form';

class MyAccountModals extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          id: this.props.user.id,
          username: this.props.user.username,
          email: this.props.user.email,
          street: '',
          city: '',
          zipcode: '',
          avatar: '',
          isAdmin: this.props.user.isAdmin
        };
        this.onChangeAdmin = this.onChangeAdmin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      };

      componentDidMount() {
        this.el.addEventListener('change', (ev) => {
            const file = ev.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                this.setState({avatar: reader.result})
            });
            reader.readAsDataURL(file);
        })
    }

            handleChange(ev){
               this.setState({ [ev.target.name]: ev.target.value });
            }

            onChangeAdmin(ev){
            if(ev.target.checked) {
                this.setState({[ev.target.name]: true})
            } else {
                this.setState({[ev.target.name]: false})
            }
            }
    
            onSubmit(ev) {
                ev.preventDefault();
                this.props.handleClose();
                this.props.updateUsers(this.state);
            }
    
    render() {
    const { onSubmit  } = this;
    const { handleClose, isShowModal } = this.props;
     const {avatar, username, email, street, city, zipcode, isAdmin} = this.state;
        return(
       
        <Modal animation={false} show={isShowModal} onHide={handleClose}>
            <ModalHeader>
              <ModalTitle>Update {this.props.user.username}'s details:</ModalTitle>
            </ModalHeader>
            <ModalBody>
            <Form.Group >
            <Form.Label>Avatar: </Form.Label>
              <Form.Control type="file" ref={ el => this.el = el } name='avatar' onChange={this.handleChange} defaultValue={avatar} />     
              <Form.Label>Username: </Form.Label>
              <Form.Control type="text" name='username' onChange={this.handleChange} defaultValue={username} placeholder="enter a username"/>     
              <Form.Label>Email: </Form.Label>
              <Form.Control type="text" name='email' onChange={this.handleChange} defaultValue={email} placeholder="enter valid email (eg. example@example.com)"/>
              <Form.Label>Street Address: </Form.Label>
              <Form.Control type="text" name='street' onChange={this.handleChange} defaultValue={street} placeholder="enter street address"/>
              <Form.Label>City: </Form.Label>
              <Form.Control type="text" name='city' onChange={this.handleChange} defaultValue={city} placeholder="enter city"/>     
              <Form.Label>Zipcode: </Form.Label>
              <Form.Control type="text" name='zipcode' onChange={this.handleChange} defaultValue={zipcode} placeholder="enter zipcode"/>
              <Form.Label>Set Admin Privilege: </Form.Label>
              <Form.Control type="checkbox" checked={isAdmin} name='isAdmin' onChange={this.onChangeAdmin} defaultValue={isAdmin} />            
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
        updateUsers: (user) =>  dispatch(updateUsers(user)),
    }
}

export default connect(null, mapDispatch)(MyAccountModals);
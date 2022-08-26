import React, { Component } from 'react';
import { createUser, login } from '../store';
import { connect } from 'react-redux';
import SignIn from '../SignIn/index.js';

class SignUp extends Component{
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
      showSignIn: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderSignIn = this.renderSignIn.bind(this)
  }
  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSubmit(ev){
    ev.preventDefault();
    this.props.createUser(this.state);
    setTimeout(() => {
      this.props.login(this.state)}, 1000) ;
  }
  renderSignIn() {
    this.setState({showSignIn: true});
  }
  
  submitButton(){
    if (this.state.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ) {
        return false
    } else {
        return true
    }
  }

  render(){
    const { onChange, onSubmit, renderSignIn} = this;
    const { username, password, email, showSignIn } = this.state;
    return(
     <div>

      { showSignIn ? <SignIn onSubmit={onSubmit} /> :
      <div>
        <form onSubmit={ onSubmit }>
          <div className='signup'>Sign-Up</div> <br></br>
          <div class='username'>Username:
          <input name='username' onChange={ onChange } value={ username }/>
          Email:
          <input name='email' value={email} onChange={onChange}/>
          Password:
          <input type='password' name='password' value={ password } onChange={ onChange }/>
          </div> 
          <button class='createuser' disabled={this.submitButton() || !username || !password || !email}>Create User</button>
          {!username ? "Missing Username" : ""} <br></br>
          {!password ? "Missing Password" : ""} <br></br>
          {this.submitButton() || !email ? "Invalid Email" : ""}
          <button class='alreadyuser' onClick={renderSignIn}> Already a user?  Sign in.</button>
        </form>
      </div> }

     </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      state
    }
}

const mapDispatch = (dispatch)=> {
  return {
    createUser: (user)=> {
      dispatch(createUser(user));
    },
    login: (credentials)=> {
      dispatch(login(credentials));
    }
  };
};

export default connect(mapStateToProps, mapDispatch)(SignUp);

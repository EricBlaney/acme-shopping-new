import React, { Component } from 'react';
import { createUser } from './store';
import { connect } from 'react-redux';

class SignUp extends Component{
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      email: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSubmit(ev){
    ev.preventDefault();
    this.props.createUser(this.state);
  }

  submitButton(){
    if (this.state.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ) {
        return false
    } else {
        return true
    }
  }

  render(){
    const { onChange, onSubmit } = this;
    const { username, password, email } = this.state;
    return (
      <form onSubmit={ onSubmit }>
        Username:
        <input name='username' onChange={ onChange } value={ username }/>
        Email:
        <input name='email' value={email} onChange={onChange}/>
        Password:
        <input type='password' name='password' value={ password } onChange={ onChange }/>
        <button disabled={this.submitButton() || !username || !password || !email}>Create User</button>
        {!username ? "Missing Username" : ""} <br></br>
        {!password ? "Missing Password" : ""} <br></br>
        {this.submitButton() || !email ? "Invalid Email" : ""}
        {this.state.error}
      </form>
    );
  }
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatch = (dispatch)=> {
  return {
    createUser: (user)=> {
      dispatch(createUser(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatch)(SignUp);

import React, { Component } from 'react';
import { login } from './store';
import { connect } from 'react-redux';

class SignIn extends Component{
  constructor(){
    super();
    this.state = {
      username: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSubmit(ev){
    ev.preventDefault();
    this.props.login(this.state);
  }
  render(){
    const { onChange, onSubmit } = this;
    const { username, password } = this.state;
    const { auth } = this.props;
    return (
      (auth.id ? ( <div> You're Signed In Already! </div>) : (
      <form onSubmit={ onSubmit }>
        Username: 
        <input name='username' onChange={ onChange } value={ username }/>
        Password:
        <input type='password' name='password' value={ password } onChange={ onChange }/>
        <button>Login</button>
      </form>
      )
    )
    )
  }
}

const mapDispatch = (dispatch)=> {
  return {
    login: (credentials)=> {
      dispatch(login(credentials));
    }
  };
};

const mapState = ({ auth }) => {
  return {
    auth
  }
}
export default connect(mapState, mapDispatch)(SignIn);

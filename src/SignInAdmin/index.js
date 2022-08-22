import React, { Component } from 'react';
import { login } from '../store';
import { connect } from 'react-redux';
import SignIn from '../SignIn';

class AdminSignIn extends Component{
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
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
    this.props.login(this.state);
  }

  renderSignIn() {
    this.setState({showSignIn: true});
  }

  render(){
    const { onChange, onSubmit, renderSignIn } = this;
    const { username, password, showSignIn } = this.state;
    return (
      <div>
      { showSignIn ? <SignIn onSubmit={onSubmit}/> : 
      <form onSubmit={ onSubmit }>
        Admin Sign-In: <br></br>
        Username: 
        <input name='username' onChange={ onChange } value={ username }/>
        Password:
        <input type='password' name='password' value={ password } onChange={ onChange }/>
        <button>Login</button>
        <button onClick={renderSignIn}> Not an admin? Click here.</button>
      </form>
      }
      </div>
    );
  }
}

const mapDispatch = (dispatch)=> {
  return {
    login: (credentials)=> {
      dispatch(login(credentials));
    }
  };
};

export default connect(null, mapDispatch)(AdminSignIn);

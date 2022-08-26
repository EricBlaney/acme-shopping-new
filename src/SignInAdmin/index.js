import React, { Component } from 'react';
import { adminLogin } from '../store';
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
    this.props.adminLogin(this.state);
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
        <input required name='username' onChange={ onChange } value={ username }/>
        Password:
        <input required type='password' name='password' value={ password } onChange={ onChange }/>
        <button>Login</button>
        <button onClick={renderSignIn}> Not an admin? Click here.</button>
        <div className='signup'>Admin Sign-In</div> <br></br>
        <div class='username'>Username: 
        <input name='username' onChange={ onChange } value={ username }/>
        Password:
        <input type='password' name='password' value={ password } onChange={ onChange }/>
        </div>
        <button class='login'>Login</button>
        <button class='adminlogin'  onClick={renderSignIn}> Not an admin?</button>
      </form>
      }
      </div>
    );
  }
}

const mapDispatch = (dispatch)=> {
  return {
    adminLogin: (credentials)=> {
      dispatch(adminLogin(credentials));
    }
  };
};

export default connect(null, mapDispatch)(AdminSignIn);

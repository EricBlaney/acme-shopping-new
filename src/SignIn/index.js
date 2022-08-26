import React, { Component } from 'react';
import { login } from '../store';
import { connect } from 'react-redux';
import SignInAdmin from '../SignInAdmin';
import axios from 'axios';

class SignIn extends Component{
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      showAdminSignIn: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderAdminSignIn = this.renderAdminSignIn.bind(this);
    this.updatepassword = this.updatepassword.bind(this);
    this.flag_email_input = this.flag_email_input.bind(this);

  }
  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSubmit(ev){
    ev.preventDefault();
    this.props.login(this.state);
  }

  renderAdminSignIn() {
    this.setState({showAdminSignIn: true});
  }
  async updatepassword(ev) {
    try{
      ev.preventDefault();
      await axios.post('/api/passwordResetRequest', this.state);
      this.setState({password_email_sent: true});
      this.setState({password_reset: false})
    }
    catch(ex){
      alert("No user found with that email")
      console.log(ex);
    }
}
flag_email_input(){
  this.setState({password_reset: true})
}

  render(){
    const { onChange, onSubmit, renderAdminSignIn, updatepassword, flag_email_input } = this;
    const { username, password, showAdminSignIn, password_reset, password_email_sent, email } = this.state;
    return (
      <div>

      { showAdminSignIn ? <SignInAdmin onSubmit={onSubmit} /> :
      <div>

      <form onSubmit={ onSubmit }>
       <div class='signup'> Sign-In</div>  <br></br>
        <div class='username'>Username:
        <input name='username' onChange={ onChange } value={ username }/>
       Password:
        <input type='password' name='password' value={ password } onChange={ onChange }/>
        </div> 
        <button class='login'>Login</button>
        <button class='adminlogin' onClick={renderAdminSignIn}> Admin? Click Here</button>

      </form>

      <a href="/api/sessions/github" className="github_button">

      <svg height="18" viewBox="0 0 16 16" width="40px" className='github_logo'>
      <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
      0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01
      1.08.58 1.23.82.72 1.21 1.87.87
      2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
      0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08
      2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0
      .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
      </svg>
      Sign in with GitHub
      </a> <br></br>

      { password_email_sent ? <div>Check your email to continue with password reset.</div> : null }
      { password_reset ? 
            <form onSubmit={ updatepassword }>
            Password Reset: What is the email associated with your account? <br></br>
            Email:
            <input name='email' onChange={ onChange } value={ email }/>
            <button>Reset Password</button>
            </form>
            : <a className="reset-password" onClick={flag_email_input}>Forgot your password? Reset here.</a> }
                  </div>}

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

export default connect(null, mapDispatch)(SignIn);

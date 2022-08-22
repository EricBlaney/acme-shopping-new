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
      <form onSubmit={ onSubmit }>
        Sign-In: <br></br>
        Username: 
        <input name='username' onChange={ onChange } value={ username }/>
        Password:
        <input type='password' name='password' value={ password } onChange={ onChange }/>
        <button>Login</button>
        <button onClick={renderAdminSignIn}> Admin? Click here to sign in.</button>

      </form>
      }
            { password_email_sent ? <div>Check your email to continue with password reset.</div> : null }
      { password_reset ? 
      <form onSubmit={ updatepassword }>
      Password Reset: What is the email associated with your account? <br></br>
      Email:
      <input name='email' onChange={ onChange } value={ email }/>
      <button>Reset Password</button>
      </form>
      : <a className="reset-password" onClick={flag_email_input}>Forgot your password? Reset here.</a> }
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

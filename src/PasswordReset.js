import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

class PasswordReset extends Component{
  constructor(){
    super();
    this.state = {
      userId: '',
      username: '',
      token: '',
      password: '',
      success: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount(){
    this.setState({userId: this.props.id,
        username: this.props.username,
        token: this.props.token})
  }

  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }
  async onSubmit(ev){
    ev.preventDefault();
    try{
        await axios.post('/api/passwordReset', this.state);
        this.setState({success: true});
    }
    catch(ex){
        alert("Password reset link invalid.")
        console.log(ex);
    }
  }
  render(){
    const { onChange, onSubmit } = this;
    const { username, password } = this.state;
    return (
        <div>
        {this.state.success ? <div className="reset-password-text"> "Thank you for resetting your password" </div> :
        <form onSubmit={ onSubmit }>
        <div className="reset-password-text">Change Password for {username}</div> 
        <div className="reset-password-text">New Password:</div>
        <input type='password' name='password' value={ password } onChange={ onChange }/>
        <button type="submit">Change Password</button>
      </form>}
        </div>
    );
  }
}

const mapState = () => {
    const {token, username, id} = useParams();
    return {
        token,
        username,
        id
    }
}



export default connect(mapState, null)(PasswordReset);

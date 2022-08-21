import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import SignUpContainer from './SignUp/SignUpContainer';
import SignInContainer from './SignIn/SignInContainer';
import {exchangeToken, logout} from './store/auth';
import { fetchProducts } from './store';
import GenreDropdown from './Dropdown/GenreDropdown';
import PlatformDropDown from './Dropdown/PlatformDropdown';

class Nav extends Component {
    componentDidMount(){
        this.props.fetchProducts();
        this.props.exchangeToken();
    }

    render() {
        const {logout, auth} = this.props;
        const signUpTriggerText = 'Sign Up';
        const signInTriggerText = 'Sign In';


    return (
        <main>
        <nav>
        <header>
        <div className="topnav">
            <NavLink exact to='/'>Home</NavLink>
            <NavLink exact to='/api/genre'>Genre <GenreDropdown /></NavLink>
            <NavLink exact to='/api/platform'>Platform <PlatformDropDown /></NavLink>
            <NavLink exact to='/api/games'>Games A-Z</NavLink>
            <NavLink exact to='/api/popular'>Popular</NavLink>
        <div className="topnav-right">
            <NavLink exact to='/myaccount'>My Account </NavLink>
            
        {
          auth.id ? <button onClick={ logout }>Logout</button> : <SignInContainer triggerText={signInTriggerText} />
        }
            { auth.id ? null : <SignUpContainer triggerText={signUpTriggerText} />  }
            <NavLink to='/cart'>Cart</NavLink>
        </div>
        
        <div className="footer">
          <a href="instagram">Instagram</a>
          <a href="facebook">Facebook</a>
          <a href="twitter">Twitter</a>
          <a href="contact">Contact</a>
        <div className="footer-right">
          Sources
        </div>
       </div>
    
       </div>
       
        </header>
        </nav>
        </main>
    )
}
};

const mapState = ({ auth }) => {
    return {
        auth
    }
};

const mapDispatch = (dispatch) => {
    return {
        exchangeToken: ()=> dispatch(exchangeToken()),
        fetchProducts: ()=> dispatch(fetchProducts()),
        logout: () => dispatch(logout())
    }
};

export default connect(mapState, mapDispatch)(Nav);
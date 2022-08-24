import React, { Component, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import SignUpContainer from './SignUp/SignUpContainer';
import SignInContainer from './SignIn/SignInContainer';
import auth from './store/auth';
import { fetchProducts } from './store';
import { logout } from './store';
import GenreDropdown from './Dropdown/GenreDropdown';
import PlatformDropDown from './Dropdown/PlatformDropdown';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';


class Nav extends Component {
    componentDidMount(){
        this.props.fetchProducts();
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
            <NavLink exact to='/myaccount'>My Account</NavLink>
            
        {
          auth.id ? <button onClick={ logout }>Logout</button> : <SignInContainer triggerText={signInTriggerText} />
        }
            { auth.id ? null : <SignUpContainer triggerText={signUpTriggerText} />  }

            <NavLink to='/cart'>
                <Badge count={this.props.cart.lineItems.length} size="small">
                    <ShoppingCartOutlined style={{fontSize:20}} />
                </Badge>
                </NavLink>
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

const mapState = ({ auth, cart }) => {
    return {
        auth,
        cart,
    }
};

const mapDispatch = (dispatch) => {
    return {
        fetchProducts: ()=> dispatch(fetchProducts()),
        logout: () => dispatch(logout())
    }
};

export default connect(mapState, mapDispatch)(Nav);
import React, { Component, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignUpContainer from './SignUp/SignUpContainer';
import SignInContainer from './SignIn/SignInContainer';
import auth from './store/auth';
import { fetchProducts } from './store';
import { logout } from './store';
import { use } from 'chai';
import Platformdropdown from './Dropdown/Platformdropdown'
import Genredropdown from './Dropdown/Genredropdown'


class Nav extends Component {
 constructor() {
 super()
 this.state = {
     showPlatform: false
 }
 }
    componentDidMount(){
        this.props.fetchProducts();
    }

    render() {
        const {logout, auth } = this.props;
        const signUpTriggerText = 'Sign Up';
        const signInTriggerText = 'Sign In';
        // const [dropdown, setDropdown] = useState(false);


    return (

        <main>
        <nav>
        <header>
        <div className="topnav">

            <NavLink exact to='/'>Home</NavLink>
            <NavLink exact to='/api/genre'>Genre<Genredropdown /> </NavLink>
             
             <NavLink exact to='/api/platform'
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
                >Platform
                {/*dropdown &&*/ <Platformdropdown />}
                </NavLink>

            <NavLink exact to='/api/gamesbyyear'>Games By Year</NavLink>
            <NavLink exact to='/api/console'>Console</NavLink>
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
        auth,
        
    }
};

const mapDispatch = (dispatch) => {
    return {
        fetchProducts: ()=> dispatch(fetchProducts()),
        logout: () => dispatch(logout())
    }
};

export default connect(mapState, mapDispatch)(Nav);
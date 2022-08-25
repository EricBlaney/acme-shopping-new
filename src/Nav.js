import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignUpContainer from './SignUp/SignUpContainer';
import SignInContainer from './SignIn/SignInContainer';
import auth from './store/auth';
import { fetchProducts } from './store';
import { logout, exchangeToken, fetchCart, setUsers } from './store';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';


class Nav extends Component {

    componentDidMount(){
        this.props.fetchProducts();
        this.props.exchangeToken();
        this.props.fetchCart();
        this.props.setUsers();
    }

    componentDidUpdate(prevProps){
        if(!prevProps.auth.id && this.props.auth.id){
          this.props.fetchCart();
          this.props.exchangeToken();
          this.props.fetchProducts();
          this.props.setUsers();
        }
      }

    render() {
        const {logout, auth } = this.props;
        const signUpTriggerText = 'Sign Up';
        const signInTriggerText = 'Sign In';


    return (

        <main>
        <nav>
        <header>
        <div className="topnav">

            <NavLink exact to='/'>Home</NavLink>
             
            <div className="dropdown">
            <NavLink exact to='/api/genre'> By Genre </NavLink>
  <div className="dropdown-content">
  <Link to={`/api/genre/topFightingGames`}>  Top Fighting Games
</Link>

    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
</div>
             <div className="dropdown">
  <NavLink exact to='/api/platform'> By Platform </NavLink>
  <div className="dropdown-content">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
</div>

        <div className="dropdown">
<NavLink exact to='/api/gamesbyyear'>By Year</NavLink>
  <div className="dropdown-content">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
</div>
          

            <NavLink exact to='/api/console'>Consoles</NavLink>
        <div className="topnav-right">
            <NavLink exact to='/api/myaccount'> Account </NavLink>
            <NavLink to='/cart'>Cart</NavLink>
        
        {
          auth.id ? <Link to='/'><button onClick={ logout }>Logout</button></Link> : <SignInContainer triggerText={signInTriggerText} />
        }
            { auth.id ? null : <SignUpContainer triggerText={signUpTriggerText} />  }

            <NavLink to='/cart'>
                <Badge count={this.props.cart.lineItems.length} size="small">
                    <ShoppingCartOutlined style={{fontSize:20}} />
                </Badge>
                </NavLink>
        </div>
        
        <div className="footer">

          <a href="https://www.instagram.com/fsseniorproject/">Instagram</a>
          <a href="https://www.facebook.com/profile.php?id=100085008934837">Facebook</a>
          <a href="https://twitter.com/fullstack2022">Twitter</a>
          <a href="contact">Contact</a>
  
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
        fetchCart: ()=> dispatch(fetchCart()),
        exchangeToken: ()=> dispatch(exchangeToken()),
        fetchProducts: ()=> dispatch(fetchProducts()),
        setUsers: ()=> dispatch(setUsers()),
        logout: () => dispatch(logout())
    }
};

export default connect(mapState, mapDispatch)(Nav);
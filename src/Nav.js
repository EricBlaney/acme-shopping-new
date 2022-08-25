import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignUpContainer from './SignUp/SignUpContainer';
import SignInContainer from './SignIn/SignInContainer';
import auth from './store/auth';
import { use } from 'chai';
import './Nav.css';
import './Footer.css';
import { logout, exchangeToken, fetchCart, setUsers, fetchProducts } from './store';
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
            <button class="dropbtn"> <NavLink exact to='/'>Home</NavLink></button>
            <button class="dropbtn"><NavLink exact to='/api/console'>Consoles</NavLink></button>

                 
                <div className="dropdown">
               <button class="dropbtn"><NavLink exact to='/api/genre'> By Genre </NavLink></button>
      <div  className="dropdown-content">
          <ul>
      <Link exact to={`/api/genre/topFightingGames`}>Fighting </Link>
      <Link exact to={`/api/genre/topRPGGames`}>RPG</Link>
      <Link exact to={`/api/genre/topSportsGames`}>Sports</Link>
      <Link exact to={`/api/genre/topAdventureGames`}>Adventure</Link>
      <Link exact to={`/api/genre/topPlatformGames`}>Platform</Link>
        </ul>
      </div>
    </div>
                 <div className="dropdown">
     <button class="dropbtn"> <NavLink exact to='/api/platform'> By Platform </NavLink></button>
      <div className="dropdown-content">
        <a href="#">NES</a>
        <a href="#">SNES</a>
        <a href="#">PlayStation</a>
        <a href="#">XBox</a>
        <a href="#">Sega</a>
      </div>
    </div>
    
            <div className="dropdown">
            <button class="dropbtn"><NavLink exact to='/api/gamesbyyear'>By Year</NavLink></button>
      <div className="dropdown-content">
        <a href="#">1985</a>
        <a href="#">1987</a>
        <a href="#">1989</a>
        <a href="#">1990</a>
        <a href="#">1992</a>
        <a href="#">1994</a>
      </div>
    </div>
              
    
            <div className="topnav-right">
               <NavLink exact to='/myaccount' ><i class="fas fa-user-alt"></i> </NavLink> 
                <NavLink to='/cart'><i class="fas fa-shopping-cart"></i></NavLink>
            {
              auth.id ? <Link to='/'><button onClick={ logout }><i class="fa fa-sign-out"></i></button></Link> : <SignInContainer triggerText={signInTriggerText} />
            }
                
            { auth.id ? null : <SignUpContainer triggerText={signUpTriggerText} />  }
            </div>

            <h1 className='mainlogo'><img src='https://blog.lootcrate.com/wp-content/uploads/2018/02/pacman_ghosts_header.gif'></img>
RETROS </h1>

          
           <div class="footer">
    <li><a href="https://www.facebook.com/profile.php?id=100085008934837"><i class="fa fa-facebook"></i></a></li>
    <li><a href="https://twitter.com/fullstack2022"><i class="fa fa-twitter"></i></a></li>
    <li><a href="https://www.instagram.com/fsseniorproject/"><i class="fa fa-instagram"></i></a></li>
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
            fetchCart: ()=> dispatch(fetchCart()),
            exchangeToken: ()=> dispatch(exchangeToken()),
            fetchProducts: ()=> dispatch(fetchProducts()),
            setUsers: ()=> dispatch(setUsers()),

            logout: () => dispatch(logout())
        }
    };
    
    export default connect(mapState, mapDispatch)(Nav);

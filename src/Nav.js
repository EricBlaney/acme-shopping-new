import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignUpContainer from './SignUp/SignUpContainer';
import SignInContainer from './SignIn/SignInContainer';
import './Nav.css';
import './Footer.css';
import { logout } from './store'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import Search from './Search/Search';



class Nav extends Component {

    render() {
        const {logout, auth } = this.props;
        const signUpTriggerText = 'Sign Up';
        const signInTriggerText = 'Sign In';

        return (

                <main>
                    <nav>
                      <header>
                          <div className="topnav">
                            <button className="dropbtn"> <Link exact to='/'>Home</Link></button>
                            <button className="dropbtn"> <Link exact to={`/api/console`}>Consoles</Link></button>

                 
                <div className="dropdown">
               <button className="dropbtn"><Link exact to='/api/genre'> By Genre </Link></button>
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
     <button className="dropbtn"> <Link exact to='/api/platform'> By Platform </Link></button>
      <div className="dropdown-content">
      <Link exact to={`/api/platform/nes`}>NES </Link>
      <Link exact to={`/api/platform/snes`}>SNES </Link>
      <Link exact to={`/api/platform/playstation`}>PlayStation </Link>
      <Link exact to={`/api/platform/xbox`}>XBox </Link>
      <Link exact to={`/api/platform/sega`}>Sega </Link>
      </div>
    </div>
    
            <div className="dropdown">
            <button className="dropbtn"><Link exact to='/api/gamesbyyear'>By Year</Link></button>
      <div className="dropdown-content">
      <Link exact to={`/api/gamesbyyear/1985`}>1985 </Link>
      <Link exact to={`/api/gamesbyyear/1987`}>1987 </Link>
      <Link exact to={`/api/gamesbyyear/1989`}>1989 </Link>
      <Link exact to={`/api/gamesbyyear/1990`}>1990 </Link>
      <Link exact to={`/api/gamesbyyear/1992`}>1992 </Link>
      <Link exact to={`/api/gamesbyyear/1994`}>1994 </Link>
      </div>
    </div>
              
    
            <div className="topnav-right">
            {/* <Route component={ Search }/>

<Search /> */}
               <NavLink exact to='/api/myaccount' ><i className="fas fa-user-alt"></i> </NavLink> 
                <NavLink to='/cart'><i className="fas fa-shopping-cart"></i></NavLink>
            {
              auth.id ? <Link to='/'><button className='logout' onClick={ logout }>logout</button></Link> : <SignInContainer triggerText={signInTriggerText} />
            }
                
            { auth.id ? null : <SignUpContainer triggerText={signUpTriggerText} />  }
            </div>


            <h1 className='mainlogo'><img src='https://blog.lootcrate.com/wp-content/uploads/2018/02/pacman_ghosts_header.gif'></img>RETROS </h1>
                              

                        
                        <div className="footer">
                            <li><a href="https://www.facebook.com/profile.php?id=100085008934837"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="https://twitter.com/fullstack2022"><i className="fa fa-twitter"></i></a></li>
                            <li><a href="https://www.instagram.com/fsseniorproject/"><i className="fa fa-instagram"></i></a></li>
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
            logout: () => dispatch(logout())
        }
    };
    
    export default connect(mapState, mapDispatch)(Nav);

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends Component {
    

    render() {
    return (
        
        <nav>
        <header>
        <div class="topnav">
        <NavLink className="nav" activeClassName="current" exact to='/'>Home</NavLink>
            <NavLink className="nav" activeClassName="current" exact to='/api/genre'>Genre</NavLink>
            <NavLink className="nav" activeClassName="current" to='/api/platform'>Platform </NavLink>
            <NavLink className="nav" activeClassName="current" to='/api/games'>Games A-Z</NavLink>
            <NavLink className="nav" activeClassName="current" to='/api/popular'>Popular</NavLink>

      
        <div class="topnav-right">
          <a href="myaccount">My Account</a>
          <a href="signin">Sign In</a>
          <a href="cart">Cart</a>
          {/* <form class="example" action="/action_page.php" style="margin:auto;max-width:200px;"> */}
            {/* <input type="text" placeholder="Search.." name="search2"> */}
          {/* </form> */}
        </div>
        <div class="footer">
          <a href="instagram">Instagram</a>
          <a href="facebook">Facebook</a>
          <a href="twitter">Twitter</a>
          <a href="contact">Contact</a>
        <div class="footer-right">
          Sources
        </div>
       </div>
       </div>
        </header>
        </nav>
    )
}
};

const mapState = ({students, campuses}) => {
    return {
        students,
        campuses
    }
};

const mapDispatch = (dispatch) => {
    return {
        loadStudentsAndCampuses: ()=>{
            dispatch(setCampuses());
            dispatch(setStudents())
        }
    }
};

export default connect(mapState, mapDispatch)(Nav);
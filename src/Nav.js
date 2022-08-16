import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends Component {
    

    render() {
    return (
        
        <nav>
        <header>
        <div class="topnav">
            <NavLink exact to='/'>Home</NavLink>
            <NavLink exact to='/api/genre'>Genre</NavLink>
            <NavLink exact to='/api/platform'>Platform </NavLink>
            <NavLink exact to='/api/games'>Games A-Z</NavLink>
            <NavLink exact to='/api/popular'>Popular</NavLink>
        <div class="topnav-right">
            <NavLink exact to='/myaccount'>My Account </NavLink>
            <NavLink exact to='/signin'>Sign In</NavLink>
            <NavLink to='/cart'>Cart</NavLink>
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
import React from 'react';
import { connect } from 'react-redux';
import { updateUser, deleteUser, exchangeToken} from './store'
import { NavLink } from 'react-router-dom';

class MyAccount extends React.Component{
    constructor(){
        super();
        this.state = {
        };
      }
    componentDidMount() {
        try{
            this.props.exchangeToken();
        }
        catch(ex){
            console.log(ex);
        }
    }
    render() {
        const {auth} = this.props;
        console.log(this.props.auth)
        return(
            <main>
            <h1>
            {auth.username}'s Profile
            </h1>
            <h2>{auth.username}'s details:</h2>
            <div>Email: {auth.email}</div>
            <div>Address: {auth.street || "None Listed"}</div>
            <div>City: {auth.city || "None listed."}</div>
            <div>Zipcode: {auth.zipcode || 'None listed.'}</div>
            <NavLink exact to='/updatemyaccount'>Edit account details</NavLink>
            </main>
        )
    }
}

const mapState = (state) => {
    const user = state.auth || {};
    return {
        auth: state.auth,
        user: user
    }
}

const mapDispatch = (dispatch) => {
    return{
        exchangeToken: () => dispatch(exchangeToken()),
        updateUser: (user) =>  dispatch(updateUser(user)),
        deleteUser: (user) => dispatch(deleteUser(user))
    }
}

export default connect(mapState, mapDispatch)(MyAccount);
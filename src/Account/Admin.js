import React from 'react';
import { connect } from 'react-redux';
import { fetchWishList, setUsers, deleteUser } from '../store'
import { Link, NavLink } from 'react-router-dom';
import './Admin.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

//Carousel responsiveness

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

class Admin extends React.Component{
    constructor(){
        super();
        this.state = {
            username: '',
            email: '',
            street: '',
            city: '',
            zipcode: '',
            avatar: ''
        };
      }

    componentDidMount() {
        this.props.getWishList();
        this.props.setUsers();
    }

    componentDidUpdate(prevProps){
        if(!prevProps.adminAuth.id && this.props.adminAuth.id){
          this.props.getWishList();
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.adminAuth !== prevState){
        return { id: nextProps.adminAuth.id,
        username: nextProps.adminAuth.username, 
        email: nextProps.adminAuth.email,
        street: nextProps.adminAuth.street || '',
        city: nextProps.adminAuth.city || '',
        zipcode: nextProps.adminAuth.zipcode || '',
        avatar: nextProps.adminAuth.avatar  || ''
        };
        }
        else return null;
      }

    render() {
        const {wishlist, adminAuth, users, deleteUser} = this.props;
        const {avatar, username, email, street, city, zipcode} = this.state;
        return(
            <div>
    
            <h1>
            {username}'s Admin Profile
            </h1>
            { avatar ? <img src={avatar} className="avatar"/> : null}
            <h3>{username}'s details:</h3>
            <div>Email: {email}</div>
            <div>Address: {adminAuth.street || "None Listed"}</div>
            <div>City: {adminAuth.city || "None listed."}</div>
            <div>Zipcode: {adminAuth.zipcode || 'None listed.'}</div>
            <NavLink exact to='/updatemyaccount'>Edit account details</NavLink>
            <br></br>
            <br></br>
            Your Wish List:
            <br></br>
            <br></br>

            {
                        wishlist ? 
                        <Carousel responsive={responsive} ssr={true}> 
                        { 
                        wishlist.wishListItems.map(wishListItem=>{
                            if(wishListItem.product.imageUrl.length > 10 && wishListItem.product.theme !== 'consoles') {
                            wishListItem.product.imageUrl = wishListItem.product.imageUrl.substring(44, 100)
                                }
                        return (
                            <div className="wrapper" key={wishListItem.product.id}>
                            <div className="card">
                            <Link className='link' to={`/api/product/${wishListItem.product.id}`}>
                            <div className="picture">{wishListItem.product.theme === 'consoles' ? <img src={`${wishListItem.product.imageUrl}`} width="170" height="170" /> : <img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${wishListItem.product.imageUrl}`} width="170" height="170" />}</div>  
                            </Link>

                                <div className='info'>
                                    <h3>{wishListItem.product.name}</h3>
                                    <p>{`$${wishListItem.product.price}`}</p>
                                    <button  onClick={() => this.props.addCart(product, 1)}>Add To Cart</button>
                                </div>
                            </div>
                            </div>   
                            
                        )
                        }) }</Carousel>
                        
                        : 'You have nothing in your Wish List! Go add something!'
                    }
            <br></br>
            <h3>Admin Tools</h3>
            <br></br>
            <h4>Current Users</h4>
            <button>Create New User!</button>
            <br></br>
            <br></br>
            <table>
            <thead>
                <tr>
                    <th>Username </th>
                    <th>Email</th>
                    <th>Delete User</th>
                    <th>Edit User</th>
                </tr>
                
                </thead>
                <tbody>
                    {
                    users.map(user=>{
                        return(
                           
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td><button onClick={()=>{ deleteUser(user) }}>X</button></td>
                                    <td><button>X</button></td>
                                </tr>
                        )
                    })
                    }
                </tbody>
              
                </table>
                
            </div>
        )
    }
}

const mapState = (state) => {
    const users = state.user;
    const user = state.auth || {};
    return {
        adminAuth: state.adminAuth,
        user: user,
        users: users,
        wishlist: state.wishlist
    }
}

const mapDispatch = (dispatch) => {
    return{
        getWishList: ()=> dispatch(fetchWishList()),
        addCart: (product, quantity) => dispatch(addCart(product, quantity)),
        setUsers: ()=> dispatch(setUsers()),
        deleteUser: (user)=> dispatch(deleteUser(user))
    }
}

export default connect(mapState, mapDispatch)(Admin);
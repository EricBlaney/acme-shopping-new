import React from 'react';
import { connect } from 'react-redux';
import { updateUser, deleteUser, fetchWishList, addCart } from './store'
import { Link, NavLink } from 'react-router-dom';

class MyAccount extends React.Component{
    componentDidMount(){
        this.props.getWishList();
    }

    componentDidUpdate(prevProps){
        if(!prevProps.auth.id && this.props.auth.id){
          this.props.getWishList();
        }
      }
   
    render() {
        const {auth, wishlist} = this.props;
    
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
            <br></br>
            Your Wish List:
            <br></br>
            <br></br>

            <div className="games">

            {
                wishlist ? wishlist.wishListItems.map(wishListItem=>{
                    if(wishListItem.product.imageUrl.length > 10) {
                        wishListItem.product.imageUrl = wishListItem.product.imageUrl.substring(44, 100)
                        };

                        return (
                            <div className='games' key={wishListItem.product.id}>
                            <li >
                                <Link to={`/api/product/${wishListItem.product.id}`}>
                                    <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${wishListItem.product.imageUrl}`}width="170" 
                                    height="170" /></div><div className='name'>{wishListItem.product.name}</div> 
                                </Link>
                                <div className='price'>{`$${wishListItem.product.price}`}</div>
                                <button className='addtocart' onClick={() => this.props.addCart(wishListItem.product, 1)}>Add To Cart</button>
                            </li>
                            </div>
                        )
                
                }) : 'You have nothing in your Wish List! Go add something!'
            }
            </div>
            </main>
        )
    }
}

const mapState = (state) => {
    console.log(state.wishlist)
    const user = state.auth || {};
    return {
        auth: state.auth,
        user: user,
        wishlist: state.wishlist
    }
}

const mapDispatch = (dispatch) => {
    return{
        getWishList: ()=> dispatch(fetchWishList()),
        addCart: (product, quantity) => dispatch(addCart(product, quantity)),
        updateUser: (user) =>  dispatch(updateUser(user)),
        deleteUser: (user) => dispatch(deleteUser(user))
    }
}

export default connect(mapState, mapDispatch)(MyAccount);
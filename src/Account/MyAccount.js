import React from 'react';
import { connect } from 'react-redux';
import { fetchWishList } from '../store'
import { Link, NavLink } from 'react-router-dom';
import Admin from './Admin';
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


class MyAccount extends React.Component{
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
   
    }
    componentDidUpdate(prevProps){
        if(!prevProps.auth.id && this.props.auth.id){
          this.props.getWishList();
        }
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.auth !== prevState){
        return { id: nextProps.auth.id,
        username: nextProps.auth.username, 
        email: nextProps.auth.email,
        street: nextProps.auth.street || '',
        city: nextProps.auth.city || '',
        zipcode: nextProps.auth.zipcode || '',
        avatar: nextProps.auth.avatar  || ''
        };
        }
        else return null;
      }

    render() {
        const {auth, wishlist, adminAuth} = this.props;
        const {avatar, username, email, street, city, zipcode} = this.state;
        return(
            <div>
            { adminAuth.isAdmin ? <Admin/> :

                <main className='user-details'>
                    <h1>
                    {username}'s Profile
                    </h1>
                    { avatar ? <img src={avatar} className="avatar"/> : null}
                    <h2>{username}'s details:</h2>
                    <div>Email: {email}</div>
                    <div>Address: {auth.street || "None Listed"}</div>
                    <div>City: {auth.city || "None listed."}</div>
                    <div>Zipcode: {auth.zipcode || 'None listed.'}</div>
                    <NavLink exact to='/updatemyaccount'>Edit account details</NavLink>
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
                </main> }

            </div>
        )
    }
}

const mapState = (state) => {
    const user = state.auth || {};
    return {
        auth: state.auth,
        adminAuth: state.adminAuth,
        user: user,
        wishlist: state.wishlist
    }
}

const mapDispatch = (dispatch) => {
    return{
        getWishList: ()=> dispatch(fetchWishList()),
        addCart: (product, quantity) => dispatch(addCart(product, quantity))
    }
}

export default connect(mapState, mapDispatch)(MyAccount);
import React from 'react';
import { connect } from 'react-redux';
import { fetchWishList, addCart, exchangeToken } from '../store'
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
        try{
        this.props.exchangeToken();
        } catch(er){
            console.log(er)
        }
    };

    componentDidUpdate(prevProps){
        if(!prevProps.auth.id && this.props.auth.id){
          this.props.getWishList();
          this.props.exchangeToken();
    }
  };

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.user !== prevState){
        return { id: nextProps.user.id,
        username: nextProps.user.username, 
        email: nextProps.user.email,
        street: nextProps.user.street || '',
        city: nextProps.user.city || '',
        zipcode: nextProps.user.zipcode || '',
        avatar: nextProps.user.avatar  || ''
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

            <main key={auth.id} className='user-details'>
                {([auth]||[]).map(user=>{
                return(
                    <div key={user.id}>
                        <h1>
                            { user.username }'s Profile
                            </h1>
                            { user.avatar ? <img src={user.avatar} className="avatar"/> : null}
                            <h3>{user.username}'s details:</h3>
                            <div>Email: {user.email}</div>
                            <div>Address: {user.street || "None Listed"}</div>
                            <div>City: {user.city || "None listed."}</div>
                            <div>Zipcode: {user.zipcode || 'None listed.'}</div>
                            <NavLink exact to='/updatemyaccount'>Edit account details</NavLink>

                    </div>
                        )
                    })}

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

const mapState = ({ user, auth, adminAuth, wishlist}) => {
    user = {}; 
    if (Object.keys(user).length === 0) {
        user = auth 
    } else {
        user = user
    }
    return {
        auth,
        adminAuth,
        user,
        wishlist
    }
}

const mapDispatch = (dispatch) => {
    return{
        getWishList: ()=> dispatch(fetchWishList()),
        addCart: (product, quantity) => dispatch(addCart(product, quantity)),
        exchangeToken: ()=> dispatch(exchangeToken()),

    
    }
}

export default connect(mapState, mapDispatch)(MyAccount);
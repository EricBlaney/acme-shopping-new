import React from 'react';
import { connect } from 'react-redux';
import { fetchWishList, addCart } from '../store'
import { Link } from 'react-router-dom';
import Admin from './Admin';
import Carousel from 'react-multi-carousel';
import MyAccountModals from './AdminModal/EditMyAccount/MyAccountModals'
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
            modalMyAccount: {},
            isShowMyAccountModal: false,
        };

        this.handleShowMyAccount = this.handleShowMyAccount.bind(this);

      }
    componentDidMount() {
        this.props.getWishList();
    };

    componentDidUpdate(prevProps){
        if(!prevProps.auth.id && this.props.auth.id){
          this.props.getWishList();
    }
  };


  handleShowMyAccount = (user) =>{
    this.setState({
      modalMyAccount: user,
      isShowMyAccountModal: true
    })
 }

 handleClose = () =>{
    this.setState({
      isShowMyAccountModal: false
    })
 }



    render() {
        const {auth, wishlist, adminAuth, thisUser} = this.props;
        const {avatar, username, email, street, city, zipcode} = this.state;
        const {handleShowMyAccount, handleClose} = this;

        return(
            <div>
            { adminAuth.isAdmin ? <Admin/> :

            <main key={auth.id} className='user-details'>
                {thisUser.map(user=>{
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
                            <button onClick={()=> handleShowMyAccount(user)}>Click Here to Edit Your Account</button>
                    </div>
                        )
                    })}

                    {this.state.isShowMyAccountModal ? <MyAccountModals handleClose={ handleClose } isShowModal={this.state.isShowMyAccountModal} user={this.state.modalMyAccount}/> : null}

                    <br></br>
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
                                    <button  onClick={() => this.props.addCart(wishListItem.product, 1)}>Add To Cart</button>
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
    let values = Object.values(user)
    const thisUser = values.filter((user)=>user.id === auth.id)

    return {
        auth,
        adminAuth,
        user,
        wishlist,
        thisUser
    }
}

const mapDispatch = (dispatch) => {
    return{
        getWishList: ()=> dispatch(fetchWishList()),
        addCart: (product, quantity) => dispatch(addCart(product, quantity)),
    }
}

export default connect(mapState, mapDispatch)(MyAccount);

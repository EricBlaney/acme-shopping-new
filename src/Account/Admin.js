import React from 'react';
import { connect } from 'react-redux';
import { fetchWishList, deleteUser, deleteProduct, addCart } from '../store'
import { Link } from 'react-router-dom';
import CreateUserContainer from './AdminModal/CreateUser/CreateUserContainer'
import Modals from './AdminModal/EditUser/Modals'
import ProductModals from './AdminModal/EditProduct/ProductModals'
import MyAccountModals from './AdminModal/EditMyAccount/MyAccountModals'
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
            modalMyAccount: {},
            modalProduct: {},
            modalUser: {},
            isShowModal: false,
            isShowMyAccountModal: false,
            isShowProductModal: false
        };
        this.handleShowMyAccount = this.handleShowMyAccount.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
      };

    componentDidMount() {
        this.props.getWishList();
    }

    componentDidUpdate(prevProps){
        if(!prevProps.auth.id && this.props.auth.id){
          this.props.getWishList();
        }
    }
    
      handleShow = (user) =>{
        this.setState({
          modalUser: user,
          isShowModal: true
        })
     }

     handleShowProduct = (product) =>{
        this.setState({
          modalProduct: product,
          isShowProductModal: true
        })
     }

     handleShowMyAccount = (user) =>{
        this.setState({
          modalMyAccount: user,
          isShowMyAccountModal: true
        })
     }

     handleClose = () =>{
        this.setState({
          isShowModal: false,
          isShowProductModal: false,
          isShowMyAccountModal: false
        })
     }

    render() {
        const {auth, wishlist, product, user, deleteUser, deleteProduct, onSubmit, adminAuth, thisUser, values} = this.props;
        const { handleClose, handleShow, handleShowProduct, handleShowMyAccount } = this;
        const triggerTextCreate = 'Create User';
  
        return(
            <main>
            <div className='admin' key={user.id}>
            {thisUser.map(user=>{
                return(
                <div key={user.id}>
                    <h1 class='adminname'> { user.username }'s Admin Profile </h1>
                        { user.avatar ? <img src={user.avatar} className="avatar"/> : null}
                        <h3 class='admindetails'>{user.username}'s details:</h3>

                        <div class='eacz'>
                        <div>Email: {user.email}</div>
                        <div>Address: {user.street || "None Listed"}</div>
                        <div>City: {user.city || "None listed."}</div>
                        <div>Zipcode: {user.zipcode || 'None listed.'}</div>
                        </div>
                        <button class='editadmin' onClick={()=> handleShowMyAccount(user)}>Click Here to Edit Your Account</button>
                </div>
                )
            })}
    
            {this.state.isShowMyAccountModal ? <MyAccountModals handleClose={ handleClose } isShowModal={this.state.isShowMyAccountModal} user={this.state.modalMyAccount}/> : null}

            <br></br>
            <br></br>
            <p class='divider'>Your Wish List:</p>
           
   

            {
                        wishlist ? 
                        <Carousel responsive={responsive} ssr={true}> 
                        <div></div>
                        { 
                        wishlist.wishListItems.map(wishListItem=>{
                        if(wishListItem.product.imageUrl.length > 40 && wishListItem.product.theme !== 'consoles') {
                            wishListItem.product.imageUrl = wishListItem.product.imageUrl.substring(44, 100)
                                }

                        return (
                            <div className="wrapper" key={wishListItem.product.id}>
                            <div className="card">
                            <Link className='link' to={`/api/product/${wishListItem.product.id}`}>
                            <div className="picture">{wishListItem.product.theme === 'consoles' ? <img src={`${wishListItem.product.imageUrl}`} width="170" height="170" /> : <img src={`//images.igdb.com/igdb/image/upload/t_1080p/${wishListItem.product.imageUrl}`} width="170" height="170" />}</div>  
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

            <div class='admin1'>
            <h3 class='admintools'>Admin Tools:</h3>
            <br></br>
            <h4 class='admintools1'>Current Users ({user.length}) including you </h4>
            <div>

        <CreateUserContainer onSubmit={ onSubmit } triggerText={ triggerTextCreate } />
        </div>
            </div>
            <br></br>
            <br></br>
            <table>
            <thead>
                <tr>
                    <th>Username </th>
                    <th>Email</th>
                    <th>Delete User</th>
                    <th>Edit User</th>
                    <th>User Type</th>
                </tr>
                
                </thead>
                <tbody>
                    {
                    (values.filter((user)=> user.id !== adminAuth.id).map(user=>{
                        
                        return(
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td><button class='delete' onClick={()=>{ deleteUser(user) }}>X</button></td>
                                    <td><button class='edit' onClick={()=> handleShow(user)}>Edit</button> </td>
                                    <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                                </tr>
                        )
                    }))
                    }
                </tbody>
              
                </table>
                
                {this.state.isShowModal ? <Modals handleClose={ handleClose } isShowModal={this.state.isShowModal} user={this.state.modalUser}/> : null}

                <br></br>
                <br></br>
                <br></br>
                <br></br>

            <h4>Current Products ({product.length})</h4>
            <div>

            {/* <CreateUserContainer onSubmit={ onSubmit } triggerText={ triggerTextCreate } /> */}
            
            </div>
            <br></br>
            <br></br>
            <table>
            <thead>
                <tr>
                    <th>Game/Console Name </th>
                    <th>Condition</th>
                    <th>Price</th>
                    <th>Delete Game</th>
                    <th>Edit Game Summary</th>
                </tr>
                
                </thead>
                <tbody>
                    {
                    (product||[]).map(product=>{
                        return(
                                
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.condition}</td>
                                    <td>${product.price}</td>
                                    <td><button class='delete' onClick={()=>{ deleteProduct(product) }}>X</button></td>
                                    <td><button class='edit' onClick={()=> handleShowProduct(product)}>edit</button> </td>
                                </tr>
                        )
                    })
                    } 
                </tbody>
              
                </table>
                
                {this.state.isShowProductModal ? <ProductModals handleClose={ handleClose } isShowModal={this.state.isShowProductModal} product={this.state.modalProduct}/> : null}

            </div>
            </main>
        )
    }
}

const mapState = ({auth, adminAuth, product, user, wishlist}) => {
    let values = Object.values(user)
    const thisUser = values.filter((user)=>user.id === adminAuth.id)
    return {
        auth,
        adminAuth,
        wishlist,
        product,
        user,
        thisUser,
        values
    }
}

const mapDispatch = (dispatch) => {
    return{
        getWishList: ()=> dispatch(fetchWishList()),
        addCart: (product, quantity) => dispatch(addCart(product, quantity)),
        deleteUser: (user)=> dispatch(deleteUser(user)),
        deleteProduct: (product)=> dispatch(deleteProduct(product)),
    }
}

export default connect(mapState, mapDispatch)(Admin);
import React from 'react';
import { connect } from 'react-redux';
import { fetchWishList, deleteUser, deleteProduct, exchangeToken, setUsers } from '../store'
import { Link, NavLink } from 'react-router-dom';
import CreateUserContainer from './AdminModal/CreateUser/CreateUserContainer'
import Modals from './AdminModal/EditUser/Modals'
import ProductModals from './AdminModal/EditProduct/ProductModals'
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
            modalProduct: {},
            modalUser: {},
            username: '',
            email: '',
            street: '',
            city: '',
            zipcode: '',
            avatar: '',
            isShowModal: false,
            isShowProductModal: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
      };

    componentDidMount() {
        this.props.getWishList();
        this.props.exchangeToken();
        this.props.setUsers();
    }

    componentDidUpdate(prevProps){
        if(!prevProps.adminAuth.id && this.props.adminAuth.id){
          this.props.getWishList();
          this.props.exchangeToken();
          this.props.setUsers();
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

     handleClose = () =>{
        this.setState({
            isShowModal: false,
            isShowProductModal: false

        })
     }

    render() {
        const {wishlist, product, user, deleteUser, deleteProduct, onSubmit, adminAuth} = this.props;
        const { handleClose, handleShow, handleShowProduct } = this;
        const triggerTextCreate = 'Create User';
        console.log(this.props)
  
        return(
            <div className='admin'>
            {([adminAuth]||[]).map(user=>{
                return(
                <div key={user.id}>
                    <h1> { user.username }'s Admin Profile </h1>
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
                                    <button onClick={() => this.props.addCart(product, 1)}>Add To Cart</button>
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
            <div>

            <CreateUserContainer onSubmit={ onSubmit } triggerText={ triggerTextCreate } />
            
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
                    (user||[]).map(user=>{
                        console.log(user)
                        return(
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td><button onClick={()=>{ deleteUser(user) }}>X</button></td>
                                    <td><button onClick={()=> handleShow(user)}>X</button> </td>
                                    <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                                </tr>
                        )
                    })
                    } 
                </tbody>
              
                </table>
                
                {this.state.isShowModal ? <Modals handleClose={ handleClose } isShowModal={this.state.isShowModal} user={this.state.modalUser}/> : null}

                <br></br>
                <br></br>
                <br></br>
                <br></br>

            <h4>Current Products</h4>
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
                                    <td><button onClick={()=>{ deleteProduct(product) }}>X</button></td>
                                    <td><button onClick={()=> handleShowProduct(product)}>X</button> </td>
                                </tr>
                        )
                    })
                    } 
                </tbody>
              
                </table>
                
                {this.state.isShowProductModal ? <ProductModals handleClose={ handleClose } isShowModal={this.state.isShowProductModal} product={this.state.modalProduct}/> : null}

            </div>
        )
    }
}

const mapState = ({adminAuth, product, user, wishlist}, {match}) => {
    // console.log(state)
    user = user.filter(user => user.id !== adminAuth.id);

    return {
        adminAuth,
        wishlist,
        product,
        user
    }
}

const mapDispatch = (dispatch) => {
    return{
        getWishList: ()=> dispatch(fetchWishList()),
        addCart: (product, quantity) => dispatch(addCart(product, quantity)),
        deleteUser: (user)=> dispatch(deleteUser(user)),
        deleteProduct: (product)=> dispatch(deleteProduct(product)),
        setUsers: ()=> dispatch(setUsers()),
        exchangeToken: ()=> dispatch(exchangeToken()),

    }
}

export default connect(mapState, mapDispatch)(Admin);
import { createRoot } from 'react-dom/client';
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import Nav from './Nav'
import store from './store'
import LandingPage from './LandingPage';
import SingleGame from './ProductPages/SingleGame';
import MyAccount from './Account/MyAccount';
import Cart from './Cart';
import CheckoutSuccess from './CheckoutSuccess';
import PasswordReset from './PasswordReset';
import Search from './Search/Search';
import SearchResults from './Search/SearchResults'
import Platform from './ProductPages/Platform';
import Genre from './ProductPages/Genre';
import GamesbyYear from './ProductPages/GamesbyYear';
import Console from './ProductPages/Console'
import topFightingGames from './dropdownPage/topFightingGames';
import topRPGGames from './dropdownPage/topRPGGames';
import topSportsGames from './dropdownPage/topSportsGames';
import topAdventureGames from './dropdownPage/topAdventureGames';
import topPlatformGames from './dropdownPage/topPlatformGames';
import 'antd/dist/antd.css';
import './index.css';
import { Modal } from 'antd'

class _App extends Component{
    render(){
        const { cartProduct, cartName } = this.props.cart;
        console.log(cartProduct)
        return(
        <div id="main-body">
            <Nav/>

            <Route component={ Search }/>
            <Route path='/cart' exact component={ Cart }/>
            <Route path='/cart/success' exact component={ CheckoutSuccess }/>
            <Route path='/' exact component={ LandingPage }/>
            <Route path='/api/genre' exact component={ Genre }/>
            <Route path='/api/genre/topFightingGames' exact component={ topFightingGames }/>
            <Route path='/api/genre/topRPGGames' exact component={ topRPGGames }/>
            <Route path='/api/genre/topSportsGames' exact component={ topSportsGames }/>
            <Route path='/api/genre/topAdventureGames' exact component={ topAdventureGames }/>
            <Route path='/api/genre/topPlatformGames' exact component={ topPlatformGames }/>

            <Route path='/api/platform' exact component={ Platform }/>
            <Route path='/api/gamesbyyear' exact component={ GamesbyYear }/>
            <Route path='/api/console' exact component={ Console }/>
            <Route path='/api/myaccount' exact component={ MyAccount }/>
            <Route path='/search/:term?' component={ SearchResults }/>
            <Route path='/passwordreset/:token/:username/:id' component={ PasswordReset }/>
            <Route path='/api/product/:id' exact component={ SingleGame }/>

            <Modal title={`Add a new product to ${cartName}`} visible={!!cartProduct} onCancel={() => this.props.setCartProductNull()} footer={null}>
                {
                  cartProduct && (
                    <div className="cart-item">
                        <img className="cart-image" src={`//images.igdb.com/igdb/image/upload/t_cover_big/${cartProduct.imageUrl}`} />
                        <div>
                            <div className="cart-name">{ cartProduct.name }</div>
                            <div className="cart-desc">{ cartProduct.summary.length > 200 ? cartProduct.summary.slice(0, 200) + '...' : cartProduct.summary }</div>
                            <div className="cart-price">${ cartProduct.price }</div>
                        </div>
                    </div>
                  )
                }
            </Modal>
        </div>
        )
    }
}



const App = connect(
  (state => state),
  (dispatch) => ({
      setCartProductNull: () => dispatch({ type: 'SET_CART_PRODUCT', cartProduct: null})
  }))(_App);
const root = createRoot(document.querySelector('#root'));
root.render(<Provider store={ store }><Router><App /></Router></Provider>);

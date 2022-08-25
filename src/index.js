import { createRoot } from 'react-dom/client';
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import SingleGame from './ProductPages/SingleGame';
import MyAccount from './Account/MyAccount';
import UpdateMyAccount from './Account/UpdateMyAccount';
import { HashRouter as Router, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Cart from './Cart';
import Search from './Search/Search';
import SearchResults from './Search/SearchResults'
import './index.css';
import Platform from './ProductPages/Platform';
import Genre from './ProductPages/Genre';
import 'antd/dist/antd.css';
import CheckoutSuccess from './CheckoutSuccess';
import store from './store'
import Nav from './Nav'
import GamesbyYear from './ProductPages/GamesbyYear';
import Console from './ProductPages/Console'
import topFightingGames from './ProductPages/topFightingGames';
import PasswordReset from './PasswordReset';
class _App extends Component{

    render(){
        return(
        <div id="main-body">
            <Nav/>
            <div className='logo'>
                <Route component={ Search }/>
             </div>
            <Route path='/cart' exact component={ Cart }/>
        <Route path='/cart/success' exact component={ CheckoutSuccess }/>
            <Route path='/' exact component={ LandingPage }/>
            <Route path='/api/product/:id' exact component={ SingleGame }/>
            <Route path='/api/genre' exact component={ Genre }/>
            <Route path='/api/genre/topFightingGames' exact component={ topFightingGames }/>
            <Route path='/api/platform' exact component={ Platform }/>
            <Route path='/api/gamesbyyear' exact component={ GamesbyYear }/>
            <Route path='/api/console' exact component={ Console }/>
            <Route path='/api/myaccount' exact component={ MyAccount }/>
            <Route path='/updatemyaccount' exact component={ UpdateMyAccount }/>
            <Route path='/search/:term?' component={ SearchResults }/>
            <Route path='/passwordreset/:token/:username/:id' component={ PasswordReset }/>
        </div>
        )
    }
}



const App = connect(null)(_App);

const root = createRoot(document.querySelector('#root'));
root.render(<Provider store={ store }><Router><App /></Router></Provider>);

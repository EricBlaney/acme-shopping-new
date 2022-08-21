import { createRoot } from 'react-dom/client';
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import SingleGame from './SingleGame';
import MyAccount from './MyAccount';
import UpdateMyAccount from './UpdateMyAccount';
import { HashRouter as Router, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Cart from './Cart';
import Search from './Search/Search';
import SearchResults from './Search/SearchResults'
import './index.css';
import Platform from './Platform'
import Genre from './Genre'
import store from './store'
import Nav from './Nav'
import GamesbyYear from './GamesbyYear';
import Console from './Console'




class _App extends Component{
    render(){
        return(
        <div>
        <Nav/>
        
       
     
            <div className='logo'>
                <h1>LOGO</h1>
                <Route component={ Search }/>
            </div>
        <Route path='/cart' exact component={ Cart }/>
        <Route path='/' exact component={ LandingPage }/>
        <Route path='/api/product/:id' exact component={ SingleGame }/>
        <Route path='/api/genre' exact component={ Genre }/>
        <Route path='/api/platform' exact component={ Platform }/>
        <Route path='/api/gamesbyyear' exact component={ GamesbyYear }/>
        <Route path='/api/console' exact component={ Console }/>
        <Route path='/myaccount' exact component={ MyAccount }/>
        <Route path='/updatemyaccount' exact component={ UpdateMyAccount }/>
        <Route path='/search/:term?' component={ SearchResults }/>
        </div>
        )
    }
}

const App = connect(null)(_App);

const root = createRoot(document.querySelector('#root'));
root.render(<Provider store={ store }><Router><App /></Router></Provider>);

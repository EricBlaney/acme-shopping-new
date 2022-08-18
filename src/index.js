import { createRoot } from 'react-dom/client';
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import store from './store';
import Nav from './Nav';
import LandingPage from './LandingPage';
import Cart from './Cart';
import SingleGame from './SingleGame';
import Search from './Search/Search';
import SearchResults from './Search/SearchResults'
import './index.css';


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
        <Route path='/api/product/:id' component={ SingleGame }/>
        {/* <Route path='/signin' component={ SignInContainer } /> */}
        {/* <Route path='/signup' component= { SignUpContainer } /> */}
        <Route path='/search/:term?' component={ SearchResults }/>
        </div>
        )
    }
}

const App = connect(null)(_App);

const root = createRoot(document.querySelector('#root'));
root.render(<Provider store={ store }><Router><App /></Router></Provider>);

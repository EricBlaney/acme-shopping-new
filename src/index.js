import { createRoot } from 'react-dom/client';
import React, { Component } from 'react';
import LandingPage from './LandingPage';
import { Provider, connect } from 'react-redux';
import Nav from './Nav';
import store from './store';
import SingleGame from './SingleGame';
import { HashRouter as Router, Route } from 'react-router-dom';
import Cart from './Cart';
import './index.css';

class _App extends Component{
    render(){
        return(
        <div>
        <Nav/>
        <Route path='/cart' exact component={ Cart }/>
        <Route path='/' exact component={ LandingPage }/>
        <Route path='/api/product/:id' exact component={ SingleGame }/>
        {/* <Route path='/signin' component={ SignInContainer } /> */}
        {/* <Route path='/signup' component= { SignUpContainer } /> */}
        </div>
        )
    }
}

const App = connect(null)(_App);

const root = createRoot(document.querySelector('#root'));
root.render(<Provider store={ store }><Router><App /></Router></Provider>);

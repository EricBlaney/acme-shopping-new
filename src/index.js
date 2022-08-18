import { createRoot } from 'react-dom/client';
import React, { Component } from 'react';
import LandingPage from './LandingPage';
import { Provider, connect } from 'react-redux';
import Nav from './Nav';
import store from './store';
import { HashRouter as Router, Route } from 'react-router-dom';
import Cart from './Cart';
import Platform from './Platform';
import Genre from './Genre'
import './index.css';

class _App extends Component{
    render(){
        return(
        <div>
        <Nav/>
        <Route path='/cart' exact component={ Cart }/>
        <Route path='/' exact component={ LandingPage }/>
        <Route path='/api/genre' exact component={ Genre }/>
        <Route path='/api/platform' exact component={ Platform }/>
        </div>
        )
    }
}

const App = connect(null)(_App);

const root = createRoot(document.querySelector('#root'));
root.render(<Provider store={ store }><Router><App /></Router></Provider>);

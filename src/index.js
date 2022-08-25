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
<<<<<<< HEAD
=======
import CheckoutSuccess from './CheckoutSuccess';
import PasswordReset from './PasswordReset';
import Search from './Search/Search';
>>>>>>> cc0e7ef778463d1538c7009557520da31a9ffdf9
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
<<<<<<< HEAD
import topNESGames from './dropdownPage/nes';
import topSNESGames from './dropdownPage/snes';
import topPlayStationGames from './dropdownPage/playstation';
import topXboxGames from './dropdownPage/xbox';
import topSegaGenesisGames from './dropdownPage/sega';
import thisYearsGames1994 from './dropdownPage/1994';
import thisYearsGames1992 from './dropdownPage/1992';
import thisYearsGames1990 from './dropdownPage/1990';
import thisYearsGames1989 from './dropdownPage/1989';
import thisYearsGames1987 from './dropdownPage/1987';
import thisYearsGames1985 from './dropdownPage/1985';
import Search from './Search/Search';




import PasswordReset from './PasswordReset';
=======
import 'antd/dist/antd.css';
import './index.css';
>>>>>>> cc0e7ef778463d1538c7009557520da31a9ffdf9

class _App extends Component{

    render(){
        return(
        <div id="main-body">
<<<<<<< HEAD
            <Nav />
=======
            <Nav/>
            
            <Route component={ Search }/>  
>>>>>>> cc0e7ef778463d1538c7009557520da31a9ffdf9
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
            <Route path='/api/platform/nes' exact component={ topNESGames }/>
            <Route path='/api/platform/snes' exact component={ topSNESGames }/>
            <Route path='/api/platform/playstation' exact component={ topPlayStationGames }/>
            <Route path='/api/platform/xbox' exact component={ topXboxGames }/>
            <Route path='/api/platform/sega' exact component={ topSegaGenesisGames }/>
            <Route path='/api/gamesbyyear' exact component={ GamesbyYear }/>
            <Route path='/api/gamesbyyear/1994' exact component={ thisYearsGames1994 }/>
            <Route path='/api/gamesbyyear/1992' exact component={ thisYearsGames1992 }/>
            <Route path='/api/gamesbyyear/1990' exact component={ thisYearsGames1990 }/>
            <Route path='/api/gamesbyyear/1987' exact component={ thisYearsGames1987 }/>
            <Route path='/api/gamesbyyear/1985' exact component={ thisYearsGames1985 }/>
            <Route path='/api/gamesbyyear/1989' exact component={ thisYearsGames1989 }/>

            <Route path='/api/console' exact component={ Console }/>
            <Route path='/api/myaccount' exact component={ MyAccount }/>
            <Route path='/search/:term?' component={ SearchResults }/>
            <Route path='/passwordreset/:token/:username/:id' component={ PasswordReset }/>
            <Route path='/api/product/:id' exact component={ SingleGame }/>

        </div>
        )
    }
}



const App = connect(null)(_App);
const root = createRoot(document.querySelector('#root'));
root.render(<Provider store={ store }><Router><App /></Router></Provider>);

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, fetchCart, exchangeToken, logout } from './store';
import { Link, Route } from 'react-router-dom';
import Cart from './Cart';

class LandingPage extends React.Component{

  componentDidMount(){
    this.props.fetchProducts();
    this.props.exchangeToken();
  }

  componentDidUpdate(prevProps){
    if(!prevProps.auth.id && this.props.auth.id){
      this.props.fetchCart();
    }
  }
  render(){

    const { auth, logout, cart, zeldaGames, thisMonthGames1989,marioGames  } = this.props;
    return (
      <main>
          <h1>LOGO</h1>
      { auth.id ? (
        <div>
          <div class="zeldaGames">
          Zelda Games
          <div class="games">
        { zeldaGames.map(product=>{
          return (
            <li key={product.id}>
               <div class="picture"><img src={product.imageUrl}width="170" height="170" /></div><div class='name'>{product.name} </div> 
            </li>
          )
        }).slice(0,5)}
        </div>
        </div>
        

        <div class="mario-games">
          Mario Games 
          <div class="games">
        { marioGames.map(product=>{
          return (
            <li key={product.id}>
               <div class="picture"><img src={product.imageUrl}width="170" height="170" /></div><div class='name'>{product.name}</div> 
            </li>
          )
        }).slice(0,5)}
        </div>
        </div>
        
        <div class="games-from-1990">
          Games from 1990 
          <div class="games">
        { thisMonthGames1989.map(product=>{
          return (
            <li key={product.id}>
               <div class="picture"><img src={product.imageUrl}width="170" height="170" /></div><div class='name'>{product.name}</div> 
            </li>
          )
        }).slice(0,5)}
        </div>
        </div>
        </div>) : null}

        {
          auth.id ? <Link to='/cart'>Cart ({cart.lineItems.length})</Link>: null
        }

        {
          auth.id ? (
            <Fragment>
              <Route path='/cart' component={ Cart } />
            </Fragment>
          ): null 
        }

      
      </main>
    );

  }
}
const mapDispatch = (dispatch)=> {
  return {
    exchangeToken: ()=> dispatch(exchangeToken()),
    logout: ()=> dispatch(logout()),
    fetchCart: ()=> dispatch(fetchCart()),
    fetchProducts: ()=> dispatch(fetchProducts()),

  };
};
const mapStateToProps = ({auth, product, cart}) => {
  const zeldaGames = product.filter(product => product.theme === 'zeldaGames');
  const marioGames = product.filter(product => product.theme === 'marioGames');
  const thisMonthGames1989 = product.filter(product => product.theme === 'thisMonthGames1989');
  const thisYearsGames1985 = product.filter(product => product.theme === 'thisYearsGames1985');
  const thisYearsGames1987 = product.filter(product => product.theme === 'thisYearsGames1987');
  const thisYearsGames1990 = product.filter(product => product.theme === 'thisYearsGames1990');
  const thisYearsGames1992 = product.filter(product => product.theme === 'thisYearsGames1992');
  const thisYearsGames1994 = product.filter(product => product.theme === 'thisYearsGames1994');

    return {
      auth,
      zeldaGames,
      thisMonthGames1989,
      marioGames,
      cart
    }
  };

export default connect(mapStateToProps, mapDispatch)(LandingPage);
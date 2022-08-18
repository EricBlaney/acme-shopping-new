import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, fetchCart, exchangeToken, logout } from './store';
import { Link, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Cart from './Cart';
import igdb from 'igdb-api-node';

const client = igdb('71n9jotfv4acipnlmuxyy6btvrik4u', '9y3fegv67pshqedo7s191euhphaztj');

class App extends React.Component{

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
    const { auth, logout, cart, zeldaGames, thisMonthGames1989, marioGames, thisYearsGames1990  } = this.props;
    return (
      <main>
        <body>
        <header>
        <div class="topnav">
          <a href="home">Home</a>
          <a href="genre">Genre</a>
          <a href="platform">Platform</a>
          <a href="games">Games A-Z</a>
          <a href="popular">Popular</a>
      
        <div class="topnav-right">
          <a href="myaccount">My Account</a>
          <a href="signin">Sign In</a>
          <a href="cart">Cart</a>
          {/* <form class="example" action="/action_page.php" style="margin:auto;max-width:200px;"> */}
            {/* <input type="text" placeholder="Search.." name="search2"> */}
          {/* </form> */}
        </div>
        <div class="footer">
          <a href="instagram">Instagram</a>
          <a href="facebook">Facebook</a>
          <a href="twitter">Twitter</a>
          <a href="contact">Contact</a>
        <div class="footer-right">
          Sources
        </div>
       </div>
       </div>
        </header>

        <h1>LOGO</h1>



        <div class="zeldaGames">
          Zelda Games
          <div class="games">
        { zeldaGames.map(product=>{
          return (
            <li key={product.id}>
               <div class="picture"><img src={product.imageUrl}width="170" height="170" /></div><div class='name'>{product.name} <div class="cart">add</div> </div> 
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
        { thisYearsGames1990.map(product=>{
          return (
            <li key={product.id}>
               <div class="picture"><img src={product.imageUrl}width="170" height="170" /></div><div class='name'>{product.name}</div> 
            </li>
          )
        }).slice(0,5)}
        </div>
        </div>
        

        {
          auth.id ? <button onClick={ logout }>Logout { auth.username }</button>: <SignIn />
        }
        <div id="sign-up">
          {auth.id ? null : <Link to='/signUp'>Sign Up</Link>}
        </div>
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
        {
          auth.id ? null : (
            <Fragment>
              <Route path='/signUp' component={ SignUp } />
            </Fragment>
          ) 
        }

        {auth.id ? (<ul>
        { zeldaGames.map(product=>{
          return (
            <li key={product.id}>
              name: {product.name} <img src={product.imageUrl}/>
            </li>
          )
        })}
        </ul>): null}
       
        </body>
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
      thisYearsGames1990,
      marioGames,
      cart
    }
  };

export default connect(mapStateToProps, mapDispatch)(App);

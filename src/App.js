import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, fetchCart, exchangeToken, logout } from './store';
import { Link, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Cart from './Cart';
import SignUpContainer from './SignUp/SignUpContainer';
import SignInContainer from './SignIn/SignInContainer';

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
    const { auth, logout, cart, product } = this.props;
    const signUpTriggerText = 'Sign Up';
    const signInTriggerText = 'Sign In';
    return (
      <main>
        <h1>Grace Shopper</h1>
        {
          auth.id ? <button onClick={ logout }>Logout { auth.username }</button>: <SignInContainer triggerText={signInTriggerText} />
        }
        {/* <div id="sign-up">
          {auth.id ? null : <Link to='/signUp'>Sign Up</Link>}
        </div> */}
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
              <SignUpContainer triggerText={signUpTriggerText} />
          ) 
        }
        {auth.id ? (<ul>
        { product.map(product=>{
          return (
            <li key={product.id}>
              name: {product.name} description: {product.description}
            </li>
          )
        })}
        </ul>): null}
       
        
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
const mapStateToProps = (state) => {
  return state
};
export default connect(mapStateToProps, mapDispatch)(App);

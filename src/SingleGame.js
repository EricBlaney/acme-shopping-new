import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, exchangeToken, logout } from './store';
import SignUpContainer from './SignUp/SignUpContainer';
import SignInContainer from './SignIn/SignInContainer';

class SingleGame extends React.Component{

  componentDidMount(){
    this.props.exchangeToken();
  }

  componentDidUpdate(prevProps){
    if(!prevProps.auth.id && this.props.auth.id){
      this.props.fetchCart();
    }
  }
  render(){
    const signUpTriggerText = 'Sign Up';
    const signInTriggerText = 'Sign In';
    const { auth, logout, cart, game  } = this.props;
    return (
        <main>
    <div className='logo'>
      <h1>LOGO</h1>
      </div>

      { auth.id ? (
        <div>
          <div className="games">

        { [game].map(product=>{
          return (
            <div key={product.id}>
            <li >
               <div className="picture"><img src={product.imageUrl}width="170" 
     height="170" /></div><div className='name'>{product.name}</div> 
         <div className='price'>{`$${product.price}`}</div> 
            <button className='addtocart'>Add To Cart</button>     
            <br></br>
     <div>{product.summary}</div>
            </li>

            </div>
          )
        })}
        </div>
    
        </div>) : null}
        
        {
          auth.id ? null : <SignInContainer triggerText={signInTriggerText} />
        }
                {
          auth.id ? null : (
              <SignUpContainer triggerText={signUpTriggerText} />
          ) 
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
  };
};
const mapStateToProps = ({auth, product, cart}, { match }) => {
    const id = match.params.id;
    let game = product.find(game => game.id === id)

    return {
      auth,
      cart,
      game
    }
  };

export default connect(mapStateToProps, mapDispatch)(SingleGame);
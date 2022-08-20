import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, exchangeToken, logout } from './store';
import './SingleGame.css';
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

          { auth.id ? (
            
          <div className="singlegame">

            { [game].map(product=>{
              if(product.imageUrl.length > 10) {
              product.imageUrl = product.imageUrl.substring(44, 100)
              }
              return (
                      <div key={product.id}>
                        <li className='product'>
                          <div className="product-img"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`} width="170" height="170" /></div> 
                              <div className='productlisting'>
                                  <div className='content'>
                                    <div className='singleName'>{product.name}</div>
                                    <div className='singlePrice'>{`$${product.price}`}</div> 
                                    <button className='btn'>Add To Cart</button>     
                                    <br></br>
                                    <div className='singleSummary'>{product.summary.substring(0,600)}</div>
                                  </div>
                              </div>
                        </li>
                      </div>
                      )
            })}
            </div>
        
          ) : null}
        
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
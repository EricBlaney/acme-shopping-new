import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, exchangeToken, logout, addCart } from './store'
import { Link } from 'react-router-dom';
import SignUpContainer from './SignUp/SignUpContainer';
import SignInContainer from './SignIn/SignInContainer';
import { Modal } from 'antd';

class LandingPage extends React.Component{
  state = {
    cartProduct: null
  }

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
    const { auth, thisMonthGames1989, thisYearsGames1992, thisYearsGames1990 } = this.props;
    const { cartProduct } = this.state;
    return (
      <main>
      { auth.id ? (
        <div>
        <div>
        <h2>Top Games of August 1989!</h2>
        <div className="games">
        { thisMonthGames1989.map(product=>{
          if(product.imageUrl.length > 10) {
          product.imageUrl = product.imageUrl.substring(44, 100)
          }
          return (
            <li>
            <Link key={product.id} to={`/api/product/${product.id}`}>
            <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`}width="170"
            height="170" /></div><div className='name'>{product.name}</div>
            </Link>
            <div className='price'>{`$${product.price}`}</div>
            <button className='addtocart' onClick={() => {
              this.props.addCart(product, 1)
              this.setState({
                cartProduct: product
              })
            }}>Add To Cart</button>
            </li>
          )
        }).slice(0,5)}
        </div>
        </div>

        <div>
        <h2>Top Games of 1990!</h2>
        <div className="games">
        { thisYearsGames1990.map(product=>{
          if(product.imageUrl.length > 10) {
          product.imageUrl = product.imageUrl.substring(44, 100)
          }
          return (
            <li>
            <Link key={product.id} to={`/api/product/${product.id}`}>
            <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`}width="170"
            height="170" /></div><div className='name'>{product.name}</div>
            </Link>
            <div className='price'>{`$${product.price}`}</div>
            <button className='addtocart' onClick={() => {
              this.props.addCart(product, 1)
              this.setState({
                cartProduct: product
              })
            }}>Add To Cart</button>
            </li>
          )
        }).slice(0,5)}
        </div>
        </div>

        <div>
        <h2>Top Games of 1992!</h2>
        <div className="games">
        { thisYearsGames1992.map(product=>{
          if(product.imageUrl.length > 10) {
          product.imageUrl = product.imageUrl.substring(44, 100)
          }
          return (
            <li>
            <Link key={product.id} to={`/api/product/${product.id}`}>
            <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`}width="170"
            height="170" /></div><div className='name'>{product.name}</div>
            </Link>
            <div className='price'>{`$${product.price}`}</div>
            <button className='addtocart' onClick={() => {
              this.props.addCart(product, 1)
              this.setState({
                cartProduct: product
              })
            }}>Add To Cart</button>
            </li>
          )
        }).slice(0,5)}
        </div>
        </div>
        </div> ) : null }

        {
          auth.id ? null : <SignInContainer triggerText={signInTriggerText} />
        }
                {
          auth.id ? null : (
              <SignUpContainer triggerText={signUpTriggerText} />
          )
        }
        <Modal title="Add a new product to cart" visible={!!cartProduct} onCancel={() => this.setState({cartProduct: null})} footer={null}>
          {
            cartProduct && (
              <div className="cart-item">
                <img className="cart-image" src={`//images.igdb.com/igdb/image/upload/t_cover_big/${cartProduct.imageUrl}`} />
                <div>
                  <div className="cart-name">{ cartProduct.name }</div>
                  <div className="cart-desc">{ cartProduct.summary.length > 200 ? cartProduct.summary.slice(0, 200) + '...' : cartProduct.summary }</div>
                  <div className="cart-price">${ cartProduct.price }</div>
                </div>
              </div>
            )
          }
        </Modal>
      </main>
    );

  }
}
const mapDispatch = (dispatch)=> {
  return {
    exchangeToken: ()=> dispatch(exchangeToken()),
    logout: ()=> dispatch(logout()),
    fetchCart: ()=> dispatch(fetchCart()),
    addCart: (product, quantity) => dispatch(addCart(product, quantity))
  };
};
const mapStateToProps = ({auth, product, cart}) => {
  {/* const zeldaGames = product.filter(product => product.theme === 'zeldaGames'); */}
  {/* const marioGames = product.filter(product => product.theme === 'marioGames'); */}
  const thisMonthGames1989 = product.filter(product => product.theme === 'thisMonthGames1989');
  const thisYearsGames1985 = product.filter(product => product.theme === 'thisYearsGames1985');
  const thisYearsGames1987 = product.filter(product => product.theme === 'thisYearsGames1987');
  const thisYearsGames1990 = product.filter(product => product.theme === 'thisYearsGames1990');
  const thisYearsGames1992 = product.filter(product => product.theme === 'thisYearsGames1992');
  const thisYearsGames1994 = product.filter(product => product.theme === 'thisYearsGames1994');

    return {
      auth,
      thisMonthGames1989,
      thisYearsGames1990,
      thisYearsGames1992,
      cart
    }
  };

export default connect(mapStateToProps, mapDispatch)(LandingPage);

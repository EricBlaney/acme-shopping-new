import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCart, addToWishList } from '../store';
import './SingleGame.css';
import { Modal } from 'antd'

class SingleGame extends React.Component{
  state = {
    cartProduct: null
  }

  render(){
    const signUpTriggerText = 'Sign Up';
    const signInTriggerText = 'Sign In';
    const { auth, logout, cart, game  } = this.props;
    const { cartProduct } = this.state;
    return (
      <main>

          { auth.id ? (

          <div className="singlegame">

            { [game].map(product=>{
              if(product.imageUrl.length > 10 && product.theme !== 'consoles') {
              product.imageUrl = product.imageUrl.substring(44, 100)
              }
              return (
                      <div key={product.id} className='singlecard'>
                        <li className='product'>
                          <div className="product-img"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`} width="170" height="170" /></div>
                              <div className='productlisting'>
                                  <div className='content'>
                                    <div className='singleName'>{product.name}</div>
                                    <div className="price-condition">
                                    <div className='singlePrice'>{`$${product.price}  |`}</div> 
                                    <div className='condition'>Condition: {`${product.condition}`}</div>
                                    </div>
                                    <div className='heart-cart'>
                                    <button className='btn' onClick={() => {
                                      this.props.addCart(product, 1)
                                      this.setState({
                                        cartProduct: product
                                      })
                                    }}>Add To Cart</button>
                                      <div className="heart-wrapper" onClick={ () => this.props.addToWishList(product)}>
                                        <div className='heart'></div>
                                      </div>
                                    </div>
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
    addCart: (product, quantity) => dispatch(addCart(product, quantity)),
    addToWishList: (product) => dispatch(addToWishList(product))
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

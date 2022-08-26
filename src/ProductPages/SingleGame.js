import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCart, addToWishList } from '../store';
import './SingleGame.css';
import { Modal } from 'antd'
import adminAuth from '../store/adminAuth';

class SingleGame extends Component {
  render(){
    const { adminAuth, auth, game  } = this.props;
    return (
      <main>

          { auth.id || adminAuth.id ? (

          <div className="singlegame">

            { (game||[]).map(game=>{
              if(game.imageUrl.length > 10 && game.theme !== 'consoles') {
                game.imageUrl = game.imageUrl.substring(44, 100)
              }
              return (
                      <div key={game.id} className='singlecard'>
                        <li className='product'>
                          <div className="product-img"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${game.imageUrl}`} width="170" height="170" /></div>
                              <div className='productlisting'>
                                  <div className='content'>
                                    <div className='singleName'>{game.name}</div>
                                    <div className="price-condition">
                                    <div className='singlePrice'>{`$${game.price}  |`}</div>
                                    <div className='condition'>Condition: {`${game.condition}`}</div>
                                    </div>
                                    <div className='heart-cart'>
                                      <button className='btn' onClick={() => this.props.addCart(game, 1)}>Add To Cart</button>
                                      <div className="heart-wrapper" onClick={ () => this.props.addToWishList(game)}>
                                        <div className='heart'></div>
                                      </div>
                                    </div>
                                    <br></br>
                                    <div className='singleSummary'>{(game.summary.substring(0,400))}</div>
                                  </div>
                              </div>
                        </li>
                      </div>
                      )
            })}
            </div>

          ) : null}
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

const mapStateToProps = ({auth, adminAuth, product, cart}, { match }) => {
  const id = match.params.id;
  let game = product.filter(game => game.id === id)

    return {
      adminAuth,
      auth,
      cart,
      game
    }
  };

export default connect(mapStateToProps, mapDispatch)(SingleGame);

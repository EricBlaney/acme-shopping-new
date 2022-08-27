import React, {Component } from 'react';
import { connect } from 'react-redux';
import { addCart } from '../store';
import { Link } from 'react-router-dom';
import './dropdownSingle.css';
import { Modal } from 'antd';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

//Carousel responsiveness

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

class topFightingGames extends Component {

  constructor(){
    super()
    this.state = {
      cartProduct: null
    }
  }

  
    render() {
        const {  topFightingGames, auth } = this.props;
        const { cartProduct } = this.state;

    return (
    <div>
        <main className='back'>
        <h2  class='h2'>Top Fighting Games</h2>
        <Carousel responsive={responsive} ssr={true}>
            
            { topFightingGames.map(product=>{
              if(product.imageUrl.length > 40) {
                product.imageUrl = product.imageUrl.substring(44, 100)
                }
                return (
                  <div className="wrapper" key={product.id}>
                    <div className="card">
                        <Link to={`/api/product/${product.id}`}>
                        <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_1080p/${product.imageUrl}`}width="170" 
                        height="170" /></div> </Link>
                          <div className='info'>
                            <h3>{product.name}</h3>
                            <p>{`$${product.price}`}</p>
                            <button class='add2' onClick={() => this.props.addCart(product, 1, auth)}>Add To Cart</button>
                          </div>
                      </div>
                  </div>   
                )
        })}
   </Carousel> 
            </main>

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
            </div>    

            
      )}}


const mapStateToProps = ({ auth, product, cart })=> {
    const topFightingGames = product.filter(product => product.theme === 'topFightingGames');
    return {
        auth,
        topFightingGames,
        cart
    };
  }

  const mapDispatch = (dispatch) => {
    return {
      addCart: (product, quantity, auth) => dispatch(addCart(product, quantity, auth))
    }
};
  export default connect(mapStateToProps,mapDispatch)(topFightingGames)


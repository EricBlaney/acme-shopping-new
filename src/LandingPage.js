import React from 'react';
import { connect } from 'react-redux';
import { addCart } from './store'
import { Link } from 'react-router-dom';
import './LandingPage.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Modal } from 'antd';

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

class LandingPage extends React.Component{
  constructor(){
    super();
    this.state = {
      cartProduct: null
    }
  }
  
  render(){
    const { auth, thisMonthGames1989, thisYearsGames1992, thisYearsGames1990, thisYearsGames1985, thisYearsGames1987, thisYearsGames1989, thisYearsGames1994 } = this.props;
    const { cartProduct } = this.state;
    return (
      <main>
      { (
        <div className='row'>
        <h2>Top Games of August 1989!</h2>
        <Carousel responsive={responsive} ssr={true}>
        
        { thisMonthGames1989.map(product=>{
          if(product.imageUrl.length > 10) {
          product.imageUrl = product.imageUrl.substring(44, 100)
          }
          return (
            
            <div className="wrapper" key={product.id}>
                      
              <div className="card">
                <Link to={`/api/product/${product.id}`}>
                <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`}width="170" 
                height="170" /></div> </Link>
                  <div className='info'>
                    <h3>{product.name}</h3>
                    <p>{`$${product.price}`}</p>
                    <button  onClick={() => {this.props.addCart(product, 1, auth)
                    this.setState({
                      cartProduct: product
                    })
                    }}>
                      Add To Cart</button>
                  </div>
              </div>
            
            </div>
           

          )
        })}
        </Carousel>

        <h2>Top Games of 1985!</h2>
        <Carousel responsive={responsive} ssr={true}>
        
        { thisYearsGames1985.map(product=>{
          if(product.imageUrl.length > 10) {
          product.imageUrl = product.imageUrl.substring(44, 100)
          }
          return (
            <div className="wrapper" key={product.id}>
              <div className="card">
                  <Link to={`/api/product/${product.id}`}>
                  <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`}width="170" 
                  height="170" /></div> </Link>
                    <div className='info'>
                      <h3>{product.name}</h3>
                      <p>{`$${product.price}`}</p>
                      <button  onClick={() => {this.props.addCart(product, 1, auth)
                    this.setState({
                      cartProduct: product
                    })
                    }}>
                      Add To Cart</button>
                    </div>
                </div>
            </div>   
          )
        })}
        </Carousel>

        <h2>Top Games of 1987!</h2>
        <Carousel responsive={responsive} ssr={true}>
        
        { thisYearsGames1987.map(product=>{
          if(product.imageUrl.length > 10) {
          product.imageUrl = product.imageUrl.substring(44, 100)
          }
          return (
            <div className="wrapper" key={product.id}>
              <div className="card">
                  <Link to={`/api/product/${product.id}`}>
                  <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`}width="170" 
                  height="170" /></div> </Link>
                    <div className='info'>
                      <h3>{product.name}</h3>
                      <p>{`$${product.price}`}</p>
                      <button  onClick={() => {this.props.addCart(product, 1, auth)
                    this.setState({
                      cartProduct: product
                    })
                    }}>
                      Add To Cart</button>
                    </div>
                </div>
            </div>   
          )
        })}
        </Carousel>
        
        
        <h2>Top Games of 1990!</h2>
        <Carousel responsive={responsive} ssr={true}>
        
        { thisYearsGames1990.map(product=>{
          if(product.imageUrl.length > 10) {
          product.imageUrl = product.imageUrl.substring(44, 100)
          }
          return (
            <div className="wrapper" key={product.id}>
              <div className="card">
                  <Link to={`/api/product/${product.id}`}>
                  <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`}width="170" 
                  height="170" /></div> </Link>
                    <div className='info'>
                      <h3>{product.name}</h3>
                      <p>{`$${product.price}`}</p>
                      <button  onClick={() => {this.props.addCart(product, 1, auth)
                    this.setState({
                      cartProduct: product
                    })
                    }}>
                      Add To Cart</button>
                    </div>
                </div>
            </div>   
          )
        })}
        </Carousel>

        <h2>Top Games of 1992!</h2>
        <Carousel responsive={responsive} ssr={true}>
        { thisYearsGames1992.map(product=>{
          if(product.imageUrl.length > 10) {
          product.imageUrl = product.imageUrl.substring(44, 100)
          }
          return (
            <div className="wrapper" key={product.id}>
              <div className="card">
                <Link className='link' to={`/api/product/${product.id}`}>
                <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`}width="170" 
                height="170" /></div> 
                </Link>
                  <div className='info'>
                    <h3>{product.name}</h3>
                    <p>{`$${product.price}`}</p>
                    <button  onClick={() => {this.props.addCart(product, 1, auth)
                    this.setState({
                      cartProduct: product
                    })
                    }}>
                      Add To Cart</button>
                  </div>
              </div>
            </div>
          )
        })}
        </Carousel>

        <h2>Top Games of 1994!</h2>
        <Carousel responsive={responsive} ssr={true}>
        { thisYearsGames1994.map(product=>{
          if(product.imageUrl.length > 10) {
          product.imageUrl = product.imageUrl.substring(44, 100)
          }
          return (
            <div className="wrapper" key={product.id}>
              <div className="card">
                <Link className='link' to={`/api/product/${product.id}`}>
                <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`}width="170" 
                height="170" /></div> 
                </Link>
                <div className='info'>
                  <h3>{product.name}</h3>
                  <p>{`$${product.price}`}</p>
                  <button  onClick={() => {this.props.addCart(product, 1, auth)
                    this.setState({
                      cartProduct: product
                    })
                    }}>
                      Add To Cart</button>
                </div>
              </div>
            </div>
          )
        })}
        </Carousel>

        </div> ) }
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
};

const mapDispatch = (dispatch)=> {
  return {
    addCart: (product, quantity, auth) => dispatch(addCart(product, quantity, auth))
  };
};

const mapStateToProps = ({auth, product, cart}) => {
  const thisMonthGames1989 = product.filter(product => product.theme === 'thisMonthGames1989');
  const thisYearsGames1985 = product.filter(product => product.theme === 'thisYearsGames1985');
  const thisYearsGames1987 = product.filter(product => product.theme === 'thisYearsGames1987');
  const thisYearsGames1990 = product.filter(product => product.theme === 'thisYearsGames1990');
  const thisYearsGames1992 = product.filter(product => product.theme === 'thisYearsGames1992');
  const thisYearsGames1994 = product.filter(product => product.theme === 'thisYearsGames1994');

    return {
      auth,
      thisYearsGames1985,
      thisYearsGames1987,
      thisMonthGames1989,
      thisYearsGames1990,
      thisYearsGames1992,
      thisYearsGames1994,
      cart
    }
  };

export default connect(mapStateToProps, mapDispatch)(LandingPage);


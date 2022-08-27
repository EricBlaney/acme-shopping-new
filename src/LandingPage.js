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

  render(){

    const signUpTriggerText = 'Sign Up';
    const signInTriggerText = 'Sign In';
    const { auth, thisMonthGames1989, thisYearsGames1992, thisYearsGames1990, thisYearsGames1985, thisYearsGames1987, thisYearsGames1989, thisYearsGames1994 } = this.props;
    return (
      <main>
      { (
        <div className='row'>

        <h2 class='h2'>Top NES Games of the 80s!!</h2>
        <Carousel responsive={responsive} ssr={true}>

        { thisYearsGames1985.map(product=>{
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
                      <button class='add2'  onClick={() => {this.props.addCart(product, 1, auth)
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

        <h2 class='h2'>Top NES Games of the late 80s!</h2>
        <Carousel responsive={responsive} ssr={true}>

        { thisYearsGames1987.map(product=>{
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
                      <button class='add2' onClick={() => {this.props.addCart(product, 1, auth)
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


        <h2 class='h2'>Top SNES Games of the early 90s!</h2>
        <Carousel responsive={responsive} ssr={true}>

        { thisYearsGames1990.map(product=>{
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
                      <button class='add2' onClick={() => {this.props.addCart(product, 1, auth)
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

        <h2 class='h2'>Top Games of 1992!</h2>
        <Carousel responsive={responsive} ssr={true}>
        { thisYearsGames1992.map(product=>{
          if(product.imageUrl.length > 40) {
          product.imageUrl = product.imageUrl.substring(44, 100)
          }
          return (
            <div className="wrapper" key={product.id}>
              <div className="card">
                <Link className='link' to={`/api/product/${product.id}`}>
                <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_1080p/${product.imageUrl}`}width="170"
                height="170" /></div>
                </Link>
                  <div className='info'>
                    <h3>{product.name}</h3>
                    <p>{`$${product.price}`}</p>
                    <button class='add2' onClick={() => {this.props.addCart(product, 1, auth)
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

        <h2 class='h2'>Top Games of 1994!</h2>
        <Carousel responsive={responsive} ssr={true}>
        { thisYearsGames1994.map(product=>{
          if(product.imageUrl.length > 40) {
          product.imageUrl = product.imageUrl.substring(44, 100)
          }
          return (
            <div className="wrapper" key={product.id}>
              <div className="card">
                <Link className='link' to={`/api/product/${product.id}`}>
                <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_1080p/${product.imageUrl}`}width="170"
                height="170" /></div>
                </Link>
                <div className='info'>
                  <h3>{product.name}</h3>
                  <p>{`$${product.price}`}</p>
                  <button class='add2' onClick={() => {this.props.addCart(product, 1, auth)
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

  const thisYearsGames1989 = product.filter(product => product.theme === 'thisYearsGames1989');
  const thisYearsGames1985 = product.filter(product => product.theme === 'thisYearsGames1985');
  const thisYearsGames1987 = product.filter(product => product.theme === 'thisYearsGames1987');
  const thisYearsGames1990 = product.filter(product => product.theme === 'thisYearsGames1990');
  const thisYearsGames1992 = product.filter(product => product.theme === 'thisYearsGames1992');
  const thisYearsGames1994 = product.filter(product => product.theme === 'thisYearsGames1994');

    return {
      auth,
      thisYearsGames1985,
      thisYearsGames1987,
      thisYearsGames1989,
      thisYearsGames1990,
      thisYearsGames1992,
      thisYearsGames1994,
      cart
    }
  };

export default connect(mapStateToProps, mapDispatch)(LandingPage);

import React, {Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, addCart } from '../store';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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

class Genre extends Component {

    componentDidMount(){
        this.props.fetchProducts();
    }
    render() {
        const {  auth, topFightingGames, topRPGGames, topSportsGames, topAdventureGames, topPlatformGames } = this.props;

    return (
    <div>
        <main>
        <h2 class='h2'>Top Fighting Games</h2>
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

   <h2 class='h2'>Top RPG Games</h2>
   <Carousel responsive={responsive} ssr={true}>
            
            { topRPGGames.map(product=>{
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

            <h2 class='h2'>Top Adventure Games</h2>
            <Carousel responsive={responsive} ssr={true}>
            
            { topAdventureGames.map(product=>{
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

   <h2 class='h2'>Top Sports Games</h2>
            <Carousel responsive={responsive} ssr={true}>
            
            { topSportsGames.map(product=>{
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

            <h2 class='h2'>Top Platform Games</h2>
            <Carousel responsive={responsive} ssr={true}>
            
            { topPlatformGames.map(product=>{
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
    </div>

)
}

}

const mapStateToProps = ({ product, auth, cart })=> {
    const topFightingGames = product.filter(product => product.theme === 'topFightingGames');
    const topRPGGames = product.filter(product => product.theme === 'topRPGGames');
    const topSportsGames = product.filter(product => product.theme === 'topSportsGames');
    const topAdventureGames = product.filter(product => product.theme === 'topAdventureGames');
    const topPlatformGames = product.filter(product => product.theme === 'topPlatformGames');

    return {
        auth,
        topFightingGames,
        topRPGGames,
        topSportsGames,
        topAdventureGames,
        topPlatformGames,
        cart
    };
  }

   const mapDispatch = (dispatch) => {
     return {
      addCart: (product, quantity, auth) => dispatch(addCart(product, quantity, auth)),
      fetchProducts: ()=> dispatch(fetchProducts()),
    }
 };
  export default connect(mapStateToProps,mapDispatch)(Genre)




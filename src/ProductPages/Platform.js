import React, {Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store';
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
class Platform extends Component {

    componentDidMount(){
        this.props.fetchProducts();
    }

    render() {
        const {  topNESGames, topSNESGames, topPlayStationGames, topXboxGames, topSegaGenesisGames, auth } = this.props;

    return (
      
    <div>
        <main>

          
      <h2>Top NES Games</h2>
      <Carousel responsive={responsive} ssr={true}>
            
            { topNESGames.map(product=>{
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
                            <button  onClick={() => this.props.addCart(product, 1, auth)}>Add To Cart</button>
                          </div>
                      </div>
                  </div>   
                )
        })}
   </Carousel> 

   <h2>Top SNES Games</h2>
   <Carousel responsive={responsive} ssr={true}>
            
            { topSNESGames.map(product=>{
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
                            <button  onClick={() => this.props.addCart(product, 1, auth)}>Add To Cart</button>
                          </div>
                      </div>
                  </div>   
                )
        })}
   </Carousel> 

            <h2>Top PlayStation Games</h2>
            <Carousel responsive={responsive} ssr={true}>
            
            { topPlayStationGames.map(product=>{
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
                            <button  onClick={() => this.props.addCart(product, 1, auth)}>Add To Cart</button>
                          </div>
                      </div>
                  </div>   
                )
        })}
   </Carousel> 

   <h2>Top XBox Games</h2>
            <Carousel responsive={responsive} ssr={true}>
            
            { topXboxGames.map(product=>{
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
                            <button  onClick={() => this.props.addCart(product, 1, auth)}>Add To Cart</button>
                          </div>
                      </div>
                  </div>   
                )
        })}
   </Carousel> 

            <h2>Top Sega Genesis Games</h2>
            <Carousel responsive={responsive} ssr={true}>
            
            { topSegaGenesisGames.map(product=>{
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
                            <button  onClick={() => this.props.addCart(product, 1, auth)}>Add To Cart</button>
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

const mapStateToProps = ({ product})=> {
    const topNESGames = product.filter(product => product.theme === 'topNESGames');
    const topSNESGames = product.filter(product => product.theme === 'topNESGames');
    const topPlayStationGames = product.filter(product => product.theme === 'topPlayStationGames');
    const topXboxGames = product.filter(product => product.theme === 'topXboxGames');
    const topSegaGenesisGames = product.filter(product => product.theme === 'topSegaGenesisGames');

    return {
        topNESGames,
        topSNESGames,
        topPlayStationGames,
        topXboxGames,
        topSegaGenesisGames

    };
  }

  const mapDispatch = (dispatch) => {
    return {
      addCart: (product, quantity, auth) => dispatch(addCart(product, quantity, auth)),
      fetchProducts: ()=> dispatch(fetchProducts()),
    }
};

export default connect(mapStateToProps, mapDispatch)(Platform)


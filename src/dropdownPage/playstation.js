import React, {Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store';
import { Link } from 'react-router-dom';
import './dropdownSingle.css';
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

class topPlayStationGames extends Component {

    componentDidMount(){
        this.props.fetchProducts();
    }

    render() {
        const {  topPlayStationGames } = this.props;

    return (
    <div>
        <main>
        <h2>Top Playstation Games</h2>
        <Carousel responsive={responsive} ssr={true}>
            
            { topPlayStationGames.map(product=>{
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
                            <button  onClick={() => this.props.addCart(product, 1)}>Add To Cart</button>
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

const mapStateToProps = ({ product, cart })=> {
    const topPlayStationGames = product.filter(product => product.theme === 'topPlayStationGames');
    return {
        topPlayStationGames,
        cart
    };
  }

  const mapDispatch = (dispatch) => {
    return {
        addCart: (product, quantity) => dispatch(addCart(product, quantity)),
        fetchProducts: ()=> dispatch(fetchProducts())
    }
};
  export default connect(mapStateToProps,mapDispatch)(topPlayStationGames)

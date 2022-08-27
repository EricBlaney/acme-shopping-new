import React, {Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, addCart } from '../store';
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

class thisYearsGames1985 extends Component {

    componentDidMount(){
        this.props.fetchProducts();
    }

    render() {
        const {  thisYearsGames1985 , auth} = this.props;

    return (
    <div>
        <main>
        <h2  class='h2'>Top 1985 Games</h2>
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

const mapStateToProps = ({ product, cart , auth})=> {
    const thisYearsGames1985 = product.filter(product => product.theme === 'thisYearsGames1985');
    return {
        thisYearsGames1985,
        cart,
        auth
    };
  }

  const mapDispatch = (dispatch) => {
    return {
        addCart: (product, quantity, auth) => dispatch(addCart(product, quantity, auth)),
        fetchProducts: ()=> dispatch(fetchProducts())
    }
};
  export default connect(mapStateToProps,mapDispatch)(thisYearsGames1985)

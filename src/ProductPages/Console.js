import React, {Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store';
import { Link } from 'react-router-dom';
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

class Console extends Component {
    componentDidMount(){
        this.props.fetchProducts();
    }

    render() {
        const { auth, consoles } = this.props;

    return (
    <div>
        <main>
      <h2>Consoles</h2>
      <Carousel responsive={responsive} ssr={true}>
        
        { consoles.map(product=>{
  
          return (
            <div className="wrapper" key={product.id}>
              <div className="card">
                  <Link to={`/api/product/${product.id}`}>
                  <div className="picture"><img src={product.imageUrl}width="170" 
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

const mapStateToProps = ({ product, auth})=> {
    const consoles = product.filter(product => product.theme === 'consoles');
    return {
      auth,
      consoles
    };
  }

  const mapDispatch = (dispatch) => {
    return {
        addCart: (product, quantity, auth) => dispatch(addCart(product, quantity, auth)),
        fetchProducts: ()=> dispatch(fetchProducts()),
    }
};

export default connect(mapStateToProps, mapDispatch)(Console);
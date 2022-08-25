import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { addCart } from '../store'
import React from 'react';
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

const SearchResults = ({searchResults, auth, addCart}) => {
    return (
        <div>
            <h2>Search Results</h2>
            <Carousel responsive={responsive} ssr={true}>
        
                { searchResults.map(product=>{
            if(product.imageUrl.length > 10 && product.theme !== 'consoles') {
              product.imageUrl = product.imageUrl.substring(44, 100)
              }
                return (
                    <div className="wrapper" key={product.id}>
                    <div className="card">
                    <Link className='link' to={`/api/product/${product.id}`}>
                    <div className="picture">{product.theme === 'consoles' ? <img src={`${product.imageUrl}`} width="170" height="170" /> : <img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`} width="170" height="170" />}</div>  
                    </Link>

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
        </div>
    )}

const mapState = ({product}, {match}) => {
    const term = match.params.term;
    const searchResults = product.filter(product => product.name.toLowerCase().includes(term.toLowerCase()))
    return {
        auth,
        searchResults
    }
}

export default connect(mapState, (dispatch)=>{
    return {
        addCart: (product, quantity, auth) => dispatch(addCart(product, quantity, auth))
    }

})(SearchResults)
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import React from 'react';

const SearchResults = ({product}) => {
    return (
        <div>
            <h2>Search Results</h2>
            <ul className='searchResults'>
              {
                product.map(product => {
                    if(product.imageUrl.length > 10) {product.imageUrl = product.imageUrl.substring(44, 100)}
                    
                    return (
                        <li className='indsearch'>
                        <Link key={product.id} to={`/api/product/${product.id}`}>
                        <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`}width="170" 
                         height="170" /></div><div className='name'>{product.name}</div>
                        </Link>
                        <div className='price'>{`$${product.price}`}</div> 
                        <button className='addtocart'>Add To Cart</button>
                        </li>
                    )
                })
              }  
            </ul>
        </div>
    )}

const mapState = ({product}, {match}) => {
    const term = match.params.term;
    product = product.filter(product => product.name.toLowerCase().includes(term.toLowerCase()))
    return {
        product
    }
}

export default connect(mapState)(SearchResults)
import React from 'react';
import { connect } from 'react-redux';


const Genre = ({products}) => {
    console.log('hello')
return (
    <div>
        <main>
            hello
            <ul>
            { products.map(product=>{
          return (
            <li key={product.id}><img src={product.imageUrl}/> {product.name} 
            </li>
          )
        })}
            </ul>
        </main>
    </div>

)
}

const mapStateToProps = ({product})=> {
    const products = product.filter(product => product.theme === 'genreIds');

    return {
        products
    };
  }
  export default connect(mapStateToProps)(Genre)
import React, {Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from './store';
import { Link } from 'react-router-dom';


class Console extends Component {


    componentDidMount(){
        this.props.fetchProducts();
    }

    render() {
        const { consoles } = this.props;

    return (
    <div>
        <main>
      <h2>Consoles</h2>
            <ul>
            { consoles.map(product=>{
          return (
            <li>
                <Link key={product.id}><img src={product.imageUrl}/> {product.name} </Link>
            <div className='price'>{`$${product.price}`}</div> 
            <button className='addtocart'>Add To Cart</button>     
            <br></br>
     <div>{product.summary}</div>
            </li>
          )
        })}
            </ul>

           
        </main>
    </div>

)
}

}

const mapStateToProps = ({ product})=> {
    const consoles = product.filter(product => product.theme === 'consoles');
   

    return {
      consoles
    };
  }

  const mapDispatch = (dispatch) => {
    return {
        fetchProducts: ()=> dispatch(fetchProducts()),
    }
};

export default connect(mapStateToProps, mapDispatch)(Console)
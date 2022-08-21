import React, {Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from './store';
import { Link } from 'react-router-dom';


class GamesbyYear extends Component {


    componentDidMount(){
        this.props.fetchProducts();
    }

    render() {
        const { thisYearsGames1994, thisYearsGames1992, thisYearsGames1990, thisYearsGames1987, thisYearsGames1985 } = this.props;

    return (
    <div>
        <main>
      <h2>Games from 1994</h2>
            <ul>
            { thisYearsGames1994.map(product=>{
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

            <h2>Games from 1992</h2>
            <ul>
            { thisYearsGames1992.map(product=>{
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

            <h2>Games from 1990</h2>
            <ul> 
            { thisYearsGames1990.map(product=>{
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

            <h2>Games from 1987</h2>
            <ul> 
            { thisYearsGames1987.map(product=>{
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

            <h2>Games from 1985</h2>
            <ul> 
            { thisYearsGames1985.map(product=>{
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
    const thisYearsGames1994 = product.filter(product => product.theme === 'thisYearsGames1994');
    const thisYearsGames1992 = product.filter(product => product.theme === 'thisYearsGames1992');
    const thisYearsGames1990 = product.filter(product => product.theme === 'thisYearsGames1990');
    const thisYearsGames1987 = product.filter(product => product.theme === 'thisYearsGames1987');
    const thisYearsGames1985 = product.filter(product => product.theme === 'thisYearsGames1985');

    return {
      thisYearsGames1994,
      thisYearsGames1992,
      thisYearsGames1990,
      thisYearsGames1987,
      thisYearsGames1985,

    };
  }

  const mapDispatch = (dispatch) => {
    return {
        fetchProducts: ()=> dispatch(fetchProducts()),
    }
};

export default connect(mapStateToProps, mapDispatch)(GamesbyYear)
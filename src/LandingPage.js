import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, addCart } from './store'
import { Link } from 'react-router-dom';

class LandingPage extends React.Component{

  componentDidUpdate(prevProps){
    if(!prevProps.auth.id && this.props.auth.id){
      this.props.fetchCart();
    }
  }
  render(){
    const { auth, thisMonthGames1989, thisYearsGames1992, thisYearsGames1990 } = this.props;
    return (
      <main>
      { auth.id ? (
        <div>
        <div>
        <h2>Top Games of August 1989!</h2>
        <div className="games">
        { thisMonthGames1989.map(product=>{
          if(product.imageUrl.length > 10) {
          product.imageUrl = product.imageUrl.substring(44, 100)
          }
          return (
            <li key={product.id}>
            <Link to={`/api/product/${product.id}`}>
            <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`}width="170" 
            height="170" /></div><div className='name'>{product.name}</div>
            </Link>
            <div className='price'>{`$${product.price}`}</div>
            <button className='addtocart' onClick={() => this.props.addCart(product, 1)}>Add To Cart</button>
            </li>
          )
        }).slice(0,5)}
        </div>
        </div>

        <div>
        <h2>Top Games of 1990!</h2>
        <div className="games">
        { thisYearsGames1990.map(product=>{
          if(product.imageUrl.length > 10) {
          product.imageUrl = product.imageUrl.substring(44, 100)
          }
          return (
            <li key={product.id}>
            <Link to={`/api/product/${product.id}`}>
            <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`}width="170" 
            height="170" /></div><div className='name'>{product.name}</div> 
            </Link>
            <div className='price'>{`$${product.price}`}</div>
            <button className='addtocart' onClick={() => this.props.addCart(product, 1)}>Add To Cart</button>
            </li>
          )
        }).slice(0,5)}
        </div>
        </div>

        <div>
        <h2>Top Games of 1992!</h2>
        <div className="games">
        { thisYearsGames1992.map(product=>{
          if(product.imageUrl.length > 10) {
          product.imageUrl = product.imageUrl.substring(44, 100)
          }
          return (
            <li key={product.id}>
            <Link to={`/api/product/${product.id}`}>
            <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`}width="170" 
            height="170" /></div><div className='name'>{product.name}</div> 
            </Link>
            <div className='price'>{`$${product.price}`}</div>
            <button className='addtocart' onClick={() => this.props.addCart(product, 1)}>Add To Cart</button>
            </li>
          )
        }).slice(0,5)}
        </div>
        </div>
        </div> ) : null }

      </main>
    );

  }
}
const mapDispatch = (dispatch)=> {
  return {
    fetchCart: ()=> dispatch(fetchCart()),
    addCart: (product, quantity) => dispatch(addCart(product, quantity))
  };
};
const mapStateToProps = ({auth, product, cart}) => {
  const thisMonthGames1989 = product.filter(product => product.theme === 'thisMonthGames1989');
  const thisYearsGames1985 = product.filter(product => product.theme === 'thisYearsGames1985');
  const thisYearsGames1987 = product.filter(product => product.theme === 'thisYearsGames1987');
  const thisYearsGames1990 = product.filter(product => product.theme === 'thisYearsGames1990');
  const thisYearsGames1992 = product.filter(product => product.theme === 'thisYearsGames1992');
  const thisYearsGames1994 = product.filter(product => product.theme === 'thisYearsGames1994');

    return {
      auth,
      thisMonthGames1989,
      thisYearsGames1990,
      thisYearsGames1992,
      cart
    }
  };

export default connect(mapStateToProps, mapDispatch)(LandingPage);

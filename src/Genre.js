import React, {Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from './store';
import { Link } from 'react-router-dom';


class Genre extends Component {


    componentDidMount(){
        this.props.fetchProducts();
    }

    render() {
        const {  topFightingGames, topRPGGames, topSportsGames, topAdventureGames, topPlatformGames } = this.props;

    return (
    <div>
        <main>
        <div className='logo'>
      <h1>LOGO</h1>
      </div>
      <h2>Top Fighting Games</h2>
            <ul>
            { topFightingGames.map(product=>{
          return (
            <li>
            <Link key={product.id} to={`/api/product/${product.id}`}>
               <div className="picture"><img src={product.imageUrl}width="170" 
     height="170" /></div><div className='name'>{product.name}</div>
            </Link>
            <div className='price'>{`$${product.price}`}</div> 
            <button className='addtocart'>Add To Cart</button>
            </li>
          )
        })}
            </ul>

            <h2>Top RPG Games</h2>
            <ul>
            { topRPGGames.map(product=>{
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

            <h2>Top Sports Games</h2>
            <ul>
            { topSportsGames.map(product=>{
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


            <h2>Top Adventure Games</h2>
            <ul>
            { topAdventureGames.map(product=>{
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

            <h2>Top Platform Games</h2>
            <ul>
            { topPlatformGames.map(product=>{
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

const mapStateToProps = ({ product })=> {
    const topFightingGames = product.filter(product => product.theme === 'topFightingGames');
    const topRPGGames = product.filter(product => product.theme === 'topRPGGames');
    const topSportsGames = product.filter(product => product.theme === 'topSportsGames');
    const topAdventureGames = product.filter(product => product.theme === 'topAdventureGames');
    const topPlatformGames = product.filter(product => product.theme === 'topPlatformGames');

    return {
        topFightingGames,
        topRPGGames,
        topSportsGames,
        topAdventureGames,
        topPlatformGames
    };
  }

  const mapDispatch = (dispatch) => {
    return {
        fetchProducts: ()=> dispatch(fetchProducts()),
    }
};
  export default connect(mapStateToProps,mapDispatch)(Genre)
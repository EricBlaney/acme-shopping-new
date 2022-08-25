import React, {Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store';
import { Link } from 'react-router-dom';

class Platform extends Component {

    componentDidMount(){
        this.props.fetchProducts();
    }

    render() {
        const { topNESGames, topSNESGames, topPlayStationGames, topXboxGames, topSegaGenesisGames } = this.props;

    return (
    <div>
        <main>
      <h2>Top NES Games</h2>
            <ul>
            { topNESGames.map(product=>{
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

            <h2>Top SNES Games</h2>
            <ul>
            { topSNESGames.map(product=>{
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

            <h2>Top PlayStation Games</h2>
            <ul> 
            { topPlayStationGames.map(product=>{
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

            <h2>Top Xbox Games</h2>
            <ul> 
            { topXboxGames.map(product=>{
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

            <h2>Top Sega Genesis Games</h2>
            <ul> 
            { topSegaGenesisGames.map(product=>{
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
    const topNESGames = product.filter(product => product.theme === 'topNESGames');
    const topSNESGames = product.filter(product => product.theme === 'topNESGames');
    const topPlayStationGames = product.filter(product => product.theme === 'topPlayStationGames');
    const topXboxGames = product.filter(product => product.theme === 'topXboxGames');
    const topSegaGenesisGames = product.filter(product => product.theme === 'topSegaGenesisGames');

    return {
        topNESGames,
        topSNESGames,
        topPlayStationGames,
        topXboxGames,
        topSegaGenesisGames

    };
  }

  const mapDispatch = (dispatch) => {
    return {
        fetchProducts: ()=> dispatch(fetchProducts()),
    }
};

export default connect(mapStateToProps, mapDispatch)(Platform)
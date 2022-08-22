import React, {Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from './store';
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

// import React from 'react';
// import { connect } from 'react-redux';
// import { fetchCart, exchangeToken, logout, addCart } from './store'
// import { Link } from 'react-router-dom';


// class Platform extends React.Component{

//   componentDidMount(){
//     this.props.exchangeToken();
//   }

//   componentDidUpdate(prevProps){
//     if(!prevProps.auth.id && this.props.auth.id){
//       this.props.fetchCart();
//     }
//   }
//   render(){

//     const { auth, topNESGames, topSNESGames, topPlayStationGames, topXboxGames, topSegaGenesisGames } = this.props;
//     return (
//       <main>
//       { auth.id ? (



//         <div>
//         <div>
//         <h2>Top NES Games</h2>
//         <div className="games">
//         { topNESGames.map(product=>{
//           if(product.imageUrl.length > 10) {
//           product.imageUrl = product.imageUrl.substring(44, 100)
//           }
//           return (
//             <li>
//             <Link key={product.id} to={`/api/product/${product.id}`}>
//             <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`}width="170" 
//             height="170" /></div><div className='name'>{product.name}</div>
//             </Link>
//             <div className='price'>{`$${product.price}`}</div>
//             <button className='addtocart' onClick={() => this.props.addCart(product, 1)}>Add To Cart</button>
//             </li>
//           )
//         })}
//         </div>
//         </div>

//         <div>
//         <h2>Top SNES Games</h2>
//         <div className="games">
//         { topSNESGames.map(product=>{
//           if(product.imageUrl.length > 10) {
//           product.imageUrl = product.imageUrl.substring(44, 100)
//           }
//           return (
//             <li>
//             <Link key={product.id} to={`/api/product/${product.id}`}>
//             <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`}width="170" 
//             height="170" /></div><div className='name'>{product.name}</div> 
//             </Link>
//             <div className='price'>{`$${product.price}`}</div>
//             <button className='addtocart' onClick={() => this.props.addCart(product, 1)}>Add To Cart</button>
//             </li>
//           )
//         })}
//         </div>
//         </div>

//         <div>
//         <h2>Top PlayStation Games</h2>
//         <div className="games">
//         { topPlayStationGames.map(product=>{
//           if(product.imageUrl.length > 10) {
//           product.imageUrl = product.imageUrl.substring(44, 100)
//           }
//           return (
//             <li>
//             <Link key={product.id} to={`/api/product/${product.id}`}>
//             <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`}width="170" 
//             height="170" /></div><div className='name'>{product.name}</div> 
//             </Link>
//             <div className='price'>{`$${product.price}`}</div>
//             <button className='addtocart' onClick={() => this.props.addCart(product, 1)}>Add To Cart</button>
//             </li>
//           )
//         })}
//         </div>
//         </div>

//         <div>
//         <h2>Top XBox Games</h2>
//         <div className="games">
//         { topXboxGames.map(product=>{
//           if(product.imageUrl.length > 10) {
//           product.imageUrl = product.imageUrl.substring(44, 100)
//           }
//           return (
//             <li>
//             <Link key={product.id} to={`/api/product/${product.id}`}>
//             <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`}width="170" 
//             height="170" /></div><div className='name'>{product.name}</div>
//             </Link>
//             <div className='price'>{`$${product.price}`}</div>
//             <button className='addtocart' onClick={() => this.props.addCart(product, 1)}>Add To Cart</button>
//             </li>
//           )
//         })}
//         </div>
//         </div>
        

//         <div>
//         <h2>Top Sega Genesis Games</h2>
//         <div className="games">
//         { topSegaGenesisGames.map(product=>{
//           if(product.imageUrl.length > 10) {
//           product.imageUrl = product.imageUrl.substring(44, 100)
//           }
//           return (
//             <li>
//             <Link key={product.id} to={`/api/product/${product.id}`}>
//             <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`}width="170" 
//             height="170" /></div><div className='name'>{product.name}</div>
//             </Link>
//             <div className='price'>{`$${product.price}`}</div>
//             <button className='addtocart' onClick={() => this.props.addCart(product, 1)}>Add To Cart</button>
//             </li>
//           )
//         })}
//         </div>
//         </div>

//         </div> ) : null }

       

//       </main>
//     );

//   }
// }
// const mapDispatch = (dispatch)=> {
//   return {
//     exchangeToken: ()=> dispatch(exchangeToken()),
//     logout: ()=> dispatch(logout()),
//     fetchCart: ()=> dispatch(fetchCart()),
//     addCart: (product, quantity) => dispatch(addCart(product, quantity))
//   };
// };
// const mapStateToProps = ({auth, product, cart}) => {

//   const topNESGames = product.filter(product => product.theme === 'topNESGames');
//   const topSNESGames = product.filter(product => product.theme === 'topSNESGames');
//   const topPlayStationGames = product.filter(product => product.theme === 'topPlayStationGames');
//   const topXboxGames = product.filter(product => product.theme === 'topXboxGames');
//   const topSegaGenesisGames = product.filter(product => product.theme === 'topSegaGenesisGames');

//     return {
//       auth,
//       topNESGames,
//       topSNESGames,
//       topPlayStationGames,
//       topXboxGames,
//       topSegaGenesisGames,
//       cart
//     }
//   };

// export default connect(mapStateToProps, mapDispatch)(Platform);
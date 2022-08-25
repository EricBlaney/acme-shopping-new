import React, {Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store';
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
        <h2>Top RPG Games</h2>
            <ul>
            { topFightingGames.map(product=>{
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



// import React from 'react';
// import { connect } from 'react-redux';
// import { fetchCart, exchangeToken, logout, addCart } from './store'
// import { Link } from 'react-router-dom';
// import SignUpContainer from './SignUp/SignUpContainer';
// import SignInContainer from './SignIn/SignInContainer';

// class Genre extends React.Component{

//   componentDidMount(){
//     this.props.exchangeToken();
//   }

//   componentDidUpdate(prevProps){
//     if(!prevProps.auth.id && this.props.auth.id){
//       this.props.fetchCart();
//     }
//   }
//   render(){
//     const signUpTriggerText = 'Sign Up';
//     const signInTriggerText = 'Sign In';
//     const { auth, topFightingGames, topRPGGames, topSportsGames } = this.props;
//     return (
//       <main>
//       { auth.id ? (
//         <div>
//         <div>
//         <h2>Top Fighting Games</h2>
//         <div className="games">
//         { topFightingGames.map(product=>{
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
//         <h2>Top RPB Games</h2>
//         <div className="games">
//         { topRPGGames.map(product=>{
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
//         <h2>Top Sports Games</h2>
//         <div className="games">
//         { topSportsGames.map(product=>{
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

//         {
//           auth.id ? null : <SignInContainer triggerText={signInTriggerText} />
//         }
//                 {
//           auth.id ? null : (
//               <SignUpContainer triggerText={signUpTriggerText} />
//           )
//         }

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
//   const topFightingGames = product.filter(product => product.theme === 'topFightingGames');
//   const topRPGGames = product.filter(product => product.theme === 'topRPGGames');
//   const topSportsGames = product.filter(product => product.theme === 'topSportsGames');
//     return {
//       auth,
//       topFightingGames,
//       topRPGGames,
//       topSportsGames,
//       cart
//     }
//   };

// export default connect(mapStateToProps, mapDispatch)(Genre);

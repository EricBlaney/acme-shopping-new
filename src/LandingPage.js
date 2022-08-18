import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, fetchCart, exchangeToken, logout } from './store';
import { Link, Route } from 'react-router-dom';
import Cart from './Cart';

class LandingPage extends React.Component{

  componentDidMount(){
    this.props.fetchProducts();
    this.props.exchangeToken();
  }

  componentDidUpdate(prevProps){
    if(!prevProps.auth.id && this.props.auth.id){
      this.props.fetchCart();
    }
  }
  render(){

    const { auth, logout, cart, zeldaGames, thisMonthGames1989  } = this.props;
    return (
      <main>
          <h1>LOGO</h1>
      { auth.id ? (
        <div>
        <div className="container">
          <h2>Top 10 Games from 1989</h2>  
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
        
            <ol className="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
              <li data-target="#myCarousel" data-slide-to="1"></li>
              <li data-target="#myCarousel" data-slide-to="2"></li>
            </ol>
        
            <div className="carousel-inner">
              <div className="item active">
              { thisMonthGames1989.map(product=>{
          return (
            <li key={product.id}>
               <div className="picture"><img src={product.imageUrl}width="170" 
     height="170" /></div><div className='name'>{product.name}</div> 
            </li>
          )
        }).slice(0,1)}
              </div>
        
              <div className="item">
              Game 2
              </div>
            
              <div className="item">
              Game 3
              </div>
            </div>
        
            <a className="left carousel-control" href="#myCarousel" data-slide="prev">
              <span className="glyphicon glyphicon-chevron-left"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#myCarousel" data-slide="next">
              <span className="glyphicon glyphicon-chevron-right"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>

        <div className="recently-released">
          Recently Released 

          <div className="games">
        { zeldaGames.map(product=>{
          return (
            <li key={product.id}>
               <div className="picture"><img src={product.imageUrl}width="170" 
     height="170" /></div><div className='name'>{product.name}</div> 
            </li>
          )
        }).slice(0,5)}
        </div>
        </div>

        <div className="upcoming-releases">
          Upcoming Releases 
         
         
        </div>
        
        <div className="spotlight">
          Spotlight 
        </div> </div>) : null}

        {
          auth.id ? <Link to='/cart'>Cart ({cart.lineItems.length})</Link>: null
        }

        {
          auth.id ? (
            <Fragment>
              <Route path='/cart' component={ Cart } />
            </Fragment>
          ): null 
        }

      
      </main>
    );

  }
}
const mapDispatch = (dispatch)=> {
  return {
    exchangeToken: ()=> dispatch(exchangeToken()),
    logout: ()=> dispatch(logout()),
    fetchCart: ()=> dispatch(fetchCart()),
    fetchProducts: ()=> dispatch(fetchProducts()),

  };
};
const mapStateToProps = ({auth, product, cart}) => {
  const zeldaGames = product.filter(product => product.theme === 'zeldaGames');
  const marioGames = product.filter(product => product.theme === 'marioGames');
  const thisMonthGames1989 = product.filter(product => product.theme === 'thisMonthGames1989');
  const thisYearsGames1985 = product.filter(product => product.theme === 'thisYearsGames1985');
  const thisYearsGames1987 = product.filter(product => product.theme === 'thisYearsGames1987');
  const thisYearsGames1990 = product.filter(product => product.theme === 'thisYearsGames1990');
  const thisYearsGames1992 = product.filter(product => product.theme === 'thisYearsGames1992');
  const thisYearsGames1994 = product.filter(product => product.theme === 'thisYearsGames1994');

    return {
      auth,
      zeldaGames,
      thisMonthGames1989,
      cart
    }
  };

export default connect(mapStateToProps, mapDispatch)(LandingPage);

import React, {Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, addCart } from '../store';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
class GamesbyYear extends Component {
    componentDidMount(){
        this.props.fetchProducts();
    }

    render() {
        const { auth, thisYearsGames1994, thisYearsGames1992, thisYearsGames1990, thisYearsGames1987, thisYearsGames1985 } = this.props;

    return (
    <div>
        <main>
      <h2 class='h2'>Games from 1994</h2>
      <Carousel responsive={responsive} ssr={true}>

      { thisYearsGames1994.map(product=>{
  if(product.imageUrl.length > 40) {
    product.imageUrl = product.imageUrl.substring(44, 100)
    }
  return (
    <div className="wrapper" key={product.id}>
      <div className="card">
          <Link to={`/api/product/${product.id}`}>
          <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_1080p/${product.imageUrl}`}width="170" 
          height="170" /></div> </Link>
            <div className='info'>
              <h3>{product.name}</h3>
              <p>{`$${product.price}`}</p>
              <button class='add2' onClick={() => this.props.addCart(product, 1, auth)}>Add To Cart</button>
            </div>
        </div>
    </div>   
  )
})}
</Carousel>

<h2 class='h2'>Games from 1992</h2>
      <Carousel responsive={responsive} ssr={true}>

      { thisYearsGames1992.map(product=>{
  if(product.imageUrl.length > 40) {
    product.imageUrl = product.imageUrl.substring(44, 100)
    }
  return (
    <div className="wrapper" key={product.id}>
      <div className="card">
          <Link to={`/api/product/${product.id}`}>
          <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_1080p/${product.imageUrl}`}width="170" 
          height="170" /></div> </Link>
            <div className='info'>
              <h3>{product.name}</h3>
              <p>{`$${product.price}`}</p>
              <button class='add2' onClick={() => this.props.addCart(product, 1, auth)}>Add To Cart</button>
            </div>
        </div>
    </div>   
  )
})}
</Carousel>

<h2 class='h2'>Games from 1990</h2>
      <Carousel responsive={responsive} ssr={true}>

      { thisYearsGames1990.map(product=>{
  if(product.imageUrl.length > 40) {
    product.imageUrl = product.imageUrl.substring(44, 100)
    }
  return (
    <div className="wrapper" key={product.id}>
      <div className="card">
          <Link to={`/api/product/${product.id}`}>
          <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_1080p/${product.imageUrl}`}width="170" 
          height="170" /></div> </Link>
            <div className='info'>
              <h3>{product.name}</h3>
              <p>{`$${product.price}`}</p>
              <button class='add2' onClick={() => this.props.addCart(product, 1, auth)}>Add To Cart</button>
            </div>
        </div>
    </div>   
  )
})}
</Carousel>

<h2 class='h2'>Games from 1987</h2>
      <Carousel responsive={responsive} ssr={true}>

      { thisYearsGames1987.map(product=>{
  if(product.imageUrl.length > 40) {
    product.imageUrl = product.imageUrl.substring(44, 100)
    }
  return (
    <div className="wrapper" key={product.id}>
      <div className="card">
          <Link to={`/api/product/${product.id}`}>
          <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_1080p/${product.imageUrl}`}width="170" 
          height="170" /></div> </Link>
            <div className='info'>
              <h3>{product.name}</h3>
              <p>{`$${product.price}`}</p>
              <button class='add2' onClick={() => this.props.addCart(product, 1, auth)}>Add To Cart</button>
            </div>
        </div>
    </div>   
  )
})}
</Carousel>
            
<h2 class='h2'>Games from 1985</h2>
      <Carousel responsive={responsive} ssr={true}>

      { thisYearsGames1985.map(product=>{
  if(product.imageUrl.length > 40) {
    product.imageUrl = product.imageUrl.substring(44, 100)
    }
  return (
    <div className="wrapper" key={product.id}>
      <div className="card">
          <Link to={`/api/product/${product.id}`}>
          <div className="picture"><img src={`//images.igdb.com/igdb/image/upload/t_1080p/${product.imageUrl}`}width="170" 
          height="170" /></div> </Link>
            <div className='info'>
              <h3>{product.name}</h3>
              <p>{`$${product.price}`}</p>
              <button class='add2'  onClick={() => this.props.addCart(product, 1, auth)}>Add To Cart</button>
            </div>
        </div>
    </div>   
  )
})}
</Carousel>
        </main>
    </div>

)
}
}

const mapStateToProps = ({ auth,product, cart})=> {
    const thisYearsGames1994 = product.filter(product => product.theme === 'thisYearsGames1994');
    const thisYearsGames1992 = product.filter(product => product.theme === 'thisYearsGames1992');
    const thisYearsGames1990 = product.filter(product => product.theme === 'thisYearsGames1990');
    const thisYearsGames1987 = product.filter(product => product.theme === 'thisYearsGames1987');
    const thisYearsGames1985 = product.filter(product => product.theme === 'thisYearsGames1985');

    return {
      auth,
      thisYearsGames1994,
      thisYearsGames1992,
      thisYearsGames1990,
      thisYearsGames1987,
      thisYearsGames1985,
cart
    };
  }

  const mapDispatch = (dispatch) => {
    return {
      addCart: (product, quantity, auth) => dispatch(addCart(product, quantity, auth)),

        fetchProducts: ()=> dispatch(fetchProducts())

    }
};

export default connect(mapStateToProps, mapDispatch)(GamesbyYear)


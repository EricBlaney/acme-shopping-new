import axios from 'axios';

const wishlist = (state = { wishListItems: [ ] }, action)=> {
  if(action.type === 'SET_WISHLIST'){
    state = action.wishlist;
  } else if (action.type === 'DELETE_WISHLISTITEM') {
    const wishListItems = state.wishListItems.filter(item => item.product.id !== action.id)
    state = {
      ...state,
      wishListItems
    };
  }
  return state;
};

export const addToWishList = (product) => {
  return async (dispatch) => {
    const response = await axios.put('/api/wishlist', {
      product,
    }, {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    });
    if (response.status === 200) {
      dispatch({ type: 'SET_CART_PRODUCT', cartProduct: product, name: 'wishlist'});
    }
  }
}

export const fetchWishList = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/wishlist', {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    });
    dispatch({ type: 'SET_WISHLIST', wishlist: response.data});
  };
};

export const deleteFromWishList = (product) => {
  return async(dispatch)=> {
    const response = await axios.put('/api/wishlist', {
      product
 }, {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    });
    if (response.status === 200) {
      dispatch({type: 'DELETE_WISHLISTITEM', id: product.id});
    }
  };
};

export default wishlist;

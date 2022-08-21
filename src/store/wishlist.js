import axios from 'axios';


const wishlist = (state = [], action)=> {
  if(action.type === 'SET_WISHLIST'){
    state = action.wishlist;
  }
  return state;
};

export const fetchWishList = ()=> {
  return async(dispatch)=> {
    const response = (await axios.get('/api/wishlist')).data;
    dispatch({ type: 'SET_WISHLIST', wishlist: response });
  };
};


export default wishlist;
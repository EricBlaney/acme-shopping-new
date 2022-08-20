import axios from 'axios';
// const { faker } = require('@faker-js/faker');

const cart = (state = { lineItems: [ ] }, action)=> {
  if(action.type === 'SET_CART'){
    state = action.cart;
  } else if (action.type === 'DELETE_CART') {
    const lineItems = state.lineItems.filter(item => item.product.id !== action.id)
    state = {
      ...state,
      lineItems
    };
  } else if (action.type === 'UPDATE_QUALITY') {
    const lineItem = state.lineItems.find(item => item.product.id === action.id);
    lineItem.quantity += action.num;
    state = {
      ...state
    };
  }
  return state;
};


//connected part
export const addCart = (product, quantity) => {
  return async(dispatch) => {
    const response = await axios.put('/api/orders/cart', {
      product,
      quantity
    }, 
    {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    });
    if (response.status === 200){
      alert('Added to cart successfully!')
    }
  }
}

//updated the fetchCart function from faker to api
export const fetchCart = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/orders/cart', {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    });
    dispatch({ type: 'SET_CART', cart: response.data});
  };
};
 

//updated deleteCart and updateQuality function to connect the product data
export const deleteCart = (product) => {
  return async(dispatch)=> {
    const response = await axios.destory('/api/orders/cart', {
      product,
      quantity: 0
  }, 
    {
    headers: {
      authorization: window.localStorage.getItem('token')
    }
  });
  if (response.status === 200){
    dispatch({ type: 'DELETE _CART', cart: response.data})
  }


  export const updateQuality = (product, quantity) => {
    return async(dispatch)=> {
      const response = await axios.put('/api/orders/cart', {
        product,
        quantity
      }, {
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      });
      if (response.status === 200) {
        dispatch({ type: 'UPDATE_QUALITY', id: product.id, quantity});
      }
    };
  }



export default cart;

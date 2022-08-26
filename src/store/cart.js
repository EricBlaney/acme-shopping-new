import axios from 'axios';

const cart = (state = { lineItems: [ ], cartProduct: null, cartName: '' }, action)=> {
  if(action.type === 'SET_CART'){
    state.lineItems = action.cart.lineItems;
  } else if (action.type === 'DELETE_CART') {
    const lineItems = state.lineItems.filter(item => item.product.id !== action.id)
    state = {
      ...state,
      lineItems
    };
  } else if (action.type === 'UPDATE_QUANTITY') {
    const lineItem = state.lineItems.find(item => item.product.id === action.id);
    lineItem.quantity = action.quantity;
    state.lineItems = state.lineItems.filter(item => item.quantity > 0);
    state = {
      ...state
    };
  } else if (action.type === 'SET_CART_PRODUCT') {
    state = {
      ...state,
      cartProduct:  action.cartProduct,
      cartName: action.name
    };
  }
  return state;
};

export const addCart = (product, quantity) => {
  return async (dispatch) => {
    const response = await axios.put('/api/orders/cart', {
      product,
      quantity
    }, {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    });
    if (response.status === 200) {
      dispatch({ type: 'SET_CART_PRODUCT', cartProduct: product, name: 'cart'});
      dispatch(fetchCart());
    }
  }
}

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

export const deleteCart = (product) => {
  return async(dispatch)=> {
    const response = await axios.put('/api/orders/cart', {
      product,
      quantity: 0
    }, {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    });
    if (response.status === 200) {
      dispatch({type: 'DELETE_CART', id: product.id});
    }
  };
};

export const updateQuantity = (product, quantity) => {
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
      dispatch({ type: 'UPDATE_QUANTITY', id: product.id, quantity});
    }
  };
};


export const checkout = () => {
  return async(disptach, getState) => {
    const line_items = getState().cart.lineItems;
    const stripe_line_items = line_items.map(item => {
      const image = item.product.imageUrl.startsWith('https') ? item.product.imageUrl : `https:${item.product.imageUrl}`;
      const product_data = {
        name: item.product.name,
        images:[image]
      }
      if (item.product.summary) {
        product_data.description = item.product.summary;
      }
      return {
        price_data: {
          currency: 'usd',
          product_data,
          unit_amount: item.product.price * 100
        },
        quantity: item.quantity
      }
    })
    const response = await axios.post('/api/orders/create-checkout-session', stripe_line_items, {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    });
    if (response.status === 200) {
      window.location.href = response.data.url;
    }
  }
}

export default cart;

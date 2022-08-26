import axios from 'axios';

const cart = (state = { lineItems: [ ] }, action)=> {
  if(action.type === 'SET_CART'){
    state = action.cart;
  } else if (action.type === 'DELETE_CART') {
    const lineItems = state.lineItems.filter(item => item.product.id !== action.id)
    state = {
      ...state,
      lineItems
    };
  } else if (action.type === 'UPDATE_QUANTITY') {
    const lineItem = state.lineItems.find(item => item.product.id === action.id);
    lineItem.quantity = action.quantity;
    state = {
      ...state
    };
  }
  return state;
};

export const addCart = (product, quantity, auth) => {
  return async (dispatch) => {
    if(auth.id !== undefined) {
      const response = await axios.put('/api/orders/cart', {
        product,
        quantity
      }, {
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      });
    } else {
      if(window.localStorage.getItem('guest_cart_id')) {
        const guest_cart_id = window.localStorage.getItem('guest_cart_id');
        await axios.put('/api/orders/guestCart', {
          product,
          quantity,
          guest_cart_id
        })
      } else {
          const guest_cart_id = Math.floor(Math.random()*1E16);
          console.log(guest_cart_id);
          await axios.post('/api/orders/createGuestCart', {guestId: guest_cart_id});
          window.localStorage.setItem('guest_cart_id', JSON.stringify(guest_cart_id))
          await axios.put('/api/orders/guestCart', {
          product,
          quantity,
          guest_cart_id
        })
      }
    }
    // if (response.status === 200) {
    //   alert('Added to cart successfully')
    // }
  }
}

export const fetchCart = (auth)=> {
  return async(dispatch)=> {
    console.log(auth);
    if (auth.id !== undefined) {
      const response = await axios.get('/api/orders/cart', {
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      });
      dispatch({ type: 'SET_CART', cart: response.data});
    } else {
      const guest_cart_id = window.localStorage.getItem('guest_cart_id');
      console.log("fetch cart attempt");
      console.log(parseInt(guest_cart_id));
      try{
        const response = await axios.get(`/api/orders/guestCart/${guest_cart_id}`);
        dispatch({ type: 'SET_CART', cart: response.data});
      }
      catch(ex){
        console.log(ex);
      }

    }
  };
};

export const deleteCart = (product, auth) => {
  return async(dispatch)=> {
    if(auth.id !== undefined) {
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
    } else {
      const response = await axios.put('/api/orders/guestCart', {
        product,
        quantity: 0,
        guest_cart_id: window.localStorage.getItem('guest_cart_id')
      })
      if (response.status === 200) {
        dispatch({type: 'DELETE_CART', id: product.id});
      }
    }

  };
};

export const updateQuantity = (product, quantity, auth) => {
  return async(dispatch)=> {
    if(auth.id !== undefined) {
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
    } else {
      const guest_cart_id = window.localStorage.getItem('guest_cart_id');
      console.log(guest_cart_id);
      const response = await axios.put('/api/orders/guestCart', {
        product,
        quantity,
        guest_cart_id
      })
      if (response.status === 200) {
        dispatch({ type: 'UPDATE_QUANTITY', id: product.id, quantity});
      }
    }
  };
};


export const checkout = () => {
  return async(disptach, getState) => {
    const line_items = getState().cart.lineItems;
    const stripe_line_items = line_items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.name,
          description: item.product.summary,
          images:[ `https:${item.product.imageUrl}`]
          },
          unit_amount: item.product.price * 100
        },
        quantity: item.quantity
    }))
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

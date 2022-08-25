import axios from 'axios';


const product = (state = [], action)=> {
  if(action.type === 'SET_PRODUCTS'){
    state = action.products;
  }
  if(action.type === 'UPDATE_PRODUCTS'){
    return state.map(product => product.id === action.product.id ? action.product : product)

  }
  if(action.type === 'DELETE_PRODUCT') {
    return state.filter((product)=> product.id !== action.product.id)
  }
  return state;
};

export const fetchProducts = ()=> {
  return async(dispatch)=> {
    const products = (await axios.get('/api/products')).data;
    dispatch({ type: 'SET_PRODUCTS', products });
  };
};

export const updateProducts = (product) => {
  return async(dispatch) => {
    try{
      await axios.put(`/api/products/${product.id}`, product);
      dispatch({type: "UPDATE_PRODUCTS", product})
    }
    catch(ex){
      console.log(ex)
    }
  }
};

export const deleteProduct = (product) => {
  return async(dispatch) => {
      await axios.delete(`/api/products/${product.id}`);
      dispatch({ type: 'DELETE_PRODUCT', product})
  }
}


export default product;

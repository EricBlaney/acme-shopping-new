import { createStore, combineReducers, applyMiddleware } from 'redux';
import auth from './auth';
import cart from './cart';
import user from './user';
import wishlist from './wishlist';
import product from './product';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const reducer = combineReducers({
  auth,
  cart,
  product,
  user,
  wishlist
});

const store = createStore(reducer, applyMiddleware(thunk, logger));


export default store;
export * from './auth';
export * from './cart';
export * from './product';
export * from './user';

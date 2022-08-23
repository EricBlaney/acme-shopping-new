import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './Cart.css'; // npm install css-loader style-loader -D
import { Link } from 'react-router-dom'
import { deleteCart, updateQuantity, fetchCart, checkout} from './store'

//new import from here
import { Card, Button } from 'antd';

const Cart = ({ cart, deleteCart, updateQuantity, getCart, checkout })=> {
  useEffect(() => {
    getCart();
  }, [])

const totalPrice = cart.lineItems.reduce((total, item) => total += item.product.price, 0);
console.log(totalPrice);


  return (
    <div className="cart-container">
      <ul className="cart-list">
      {
        cart.lineItems.map( lineItem => {
          return (
            <li key={ lineItem.id } className="cart-item">
              <img className="cart-image" src={lineItem.product.imageUrl} />
              <div>
                <div className="cart-name">{ lineItem.product.name }</div>
                <div className="cart-desc">{ lineItem.product.summary.length > 200 ? lineItem.product.summary.slice(0, 200) + '...' : lineItem.product.summary }</div>
                <div className="cart-quantity">
                  <span className="quantity-minus" onClick={() => updateQuantity(lineItem.product, lineItem.quantity - 1)}>-</span>
                  <span className="quantity-num">{ lineItem.quantity }</span>
                  <span className="quantity-plus" onClick={() => updateQuantity(lineItem.product, lineItem.quantity + 1)}>+</span>
                </div>
                <div className="cart-delete" onClick={() => deleteCart(lineItem.product)}>delete</div>
              </div>
            </li>
              )
        })
      }
      </ul>

      {/* <div>
        <Link to="../Checkout/PurchaseButton"><Button onClick={handleBuy}>Purchase</Button></Link>
      </div> */}

        <Card meta={<Button>Checkout</Button>} title="Total Price">
          <div>
            <h2>Total:</h2>
            <h2>{`$${totalPrice}`}</h2>
          </div>
          <Button style={{marginBottom: 50}} className="Checkout" onClick={checkout}>Checkout</Button>
        </Card>
    </div>
  );
};


const mapDispatch = (dispatch)=> {
  return {
    deleteCart: (product)=> dispatch(deleteCart(product)),
    updateQuantity: (product, num)=> dispatch(updateQuantity(product, num)),
    getCart: ()=> dispatch(fetchCart()),
    checkout: () => dispatch(checkout()),
  };
};

export default connect(state => state, mapDispatch)(Cart);
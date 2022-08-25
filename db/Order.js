const conn = require('./conn');
const { Sequelize } = conn;

const Order = conn.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  guestId: {
    type: Sequelize.BIGINT
  }
});



Order.prototype.guestCreateOrderFromCart = async function(){
  const cart = await this.guestGetCart();
  cart.isCart = false;
  return cart.save();
}

Order.prototype.guestGetCart = async function({guestId}){
  console.log("guest id is:")
  console.log(guestId);
  let order = await conn.models.order.findOne({
    where: {
      guestId: guestId
    },
    include: [
      {
        model: conn.models.lineItem,
        include: [ conn.models.product ]
      }
    ]
  });

  return order;
}
Order.prototype.guestAddToCart = async function({ product, quantity, guest_cart_id }){
  const cart = await this.guestGetCart({guestId: guest_cart_id}); 
  let lineItem = await conn.models.lineItem.findOne({
    where: {
      productId: product.id,
      orderId: cart.id
    }
  });
  if(lineItem){
    lineItem.quantity = quantity;
    if(lineItem.quantity){
      await lineItem.save();
    }
    else {
      await lineItem.destroy();
    }
  }
  else {
    await conn.models.lineItem.create({ productId: product.id, quantity, orderId: cart.id });
  }
  return this.guestGetCart({guestId: guest_cart_id});
};


module.exports = Order;
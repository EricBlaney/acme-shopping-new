const conn = require('./conn');
const { Sequelize } = conn;
const Product = require('./Product');
const User = require('./User');
const LineItem = require('./LineItem');
const Order = require('./Order');
const WishListItem = require('./WishListItem');

User.hasMany(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);
WishListItem.belongsTo(Product);

module.exports = {
  conn,
  User,
  Product,
  LineItem,
  Order
};

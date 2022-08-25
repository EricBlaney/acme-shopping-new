const conn = require('./conn');
const { Sequelize } = conn;

const User = require('./User');
const Product = require('./Product');
const LineItem = require('./LineItem');
const Order = require('./Order');
const WishListItem = require('./WishListItem');
const WishList = require('./WishList');

User.hasMany(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);

User.hasMany(WishList);
WishList.hasMany(WishListItem); 
WishListItem.belongsTo(Product);

module.exports = {
  conn,
  User,
  Product,
  LineItem,
  Order,
  WishList,
  WishListItem
};

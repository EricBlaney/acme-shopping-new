const conn = require('./conn');
const { Sequelize } = conn;

const WishListItem = conn.define('wishListItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
});

module.exports = WishListItem;
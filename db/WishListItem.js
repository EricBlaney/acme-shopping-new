const conn = require('./conn');
const { Sequelize } = conn;
const { UUID, UUIDV4 } = Sequelize;

const WishListItem = conn.define('wishlistitem', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  }

});

module.exports = WishListItem;
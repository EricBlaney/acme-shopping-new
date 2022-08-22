const conn = require('./conn');
const { Sequelize } = conn;
const { BOOLEAN } = Sequelize;

const WishList = conn.define('wishList', {
    isWishList: {
        type: BOOLEAN,
        defaultValue: true
    }
});

module.exports = WishList;
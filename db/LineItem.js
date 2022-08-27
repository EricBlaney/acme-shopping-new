const conn = require('./conn');
const { Sequelize } = conn;

const LineItem = conn.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 0
    }
  }
});

module.exports = LineItem;



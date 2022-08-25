const conn = require('./conn');
const { Sequelize } = conn;


const Token = conn.define('token', {
  userId: {
    type: Sequelize.UUID,
    allowNull: false
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    expires: 3600
  }
});

module.exports = Token;


const { DATE } = require('sequelize');
const conn = require('./conn');
const { Sequelize } = conn;
const { STRING, TEXT, UUID, UUIDV4, INTEGER } = Sequelize;

const Product = conn.define('product', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: {
    type: STRING
  },
  summary: {
    type: TEXT
  },
  imageUrl: {
    type: STRING
  },
  rating: {
    type: STRING
  },
  releaseDate:{
    type: DATE
  },
  price: {
    type: INTEGER
  },
  theme: {
    type: STRING
  }
});

module.exports = Product;


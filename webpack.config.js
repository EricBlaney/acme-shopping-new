const Dotenv = require('dotenv-webpack');
const path = require('path');
module.exports = {
  devtool: 'source-map',
  plugins: [
    new Dotenv({systemvars: true,
      path: path.resolve(__dirname, './.env.js')
    })
    ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react']
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  }
};


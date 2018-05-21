const path = require('path');

module.exports = {
  entry: [
    './Valli.js',
  ],
  output: {
    path: path.join(__dirname, '/'),
    filename: 'Valli.min.js',
    publicPath: '/',
  },
  module: {
    rules: {
      test: /\.js|\.jsx/,
      use: ['babel-loader'],
    },
  },
};

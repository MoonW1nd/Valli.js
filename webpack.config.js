const path = require('path');

module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname),
    filename: 'Valli.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },
};

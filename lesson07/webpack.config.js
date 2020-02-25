const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader'
          },
          'less-loader'
        ]
      },
      {
        test: /\.(eot|woff|ttf|svg)$/,
        use: 'file-loader'
      }
    ]
  }
};

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
        test: /\.(jpg|text|cus)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048
            }
          }
        ]
      }
    ]
  }
};

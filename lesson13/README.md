# Webpack HMR 热模块更新

devServer 配置项 hot 设置为 true

```js
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    hotOnly: true // 即使热模块更新失败也不刷新页面
  },
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
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};

// main.js
import './style.css';

import renderModule from './module';

renderModule();

if (module.hot) {
  module.hot.accept('./module', function() {
    renderModule();
  });
}

// module.js
function renderModule() {
  var m = document.createElement('div');

  m.innerHTML = 'this is module 12';

  document.getElementById('root').append(m);
}

export default renderModule;
```

以上热跟新会产生一个疑问, 为什么 css 修改内容的时候会自动更新, 但是 js 模块执行的时候需要手动加上 module.hot.accept
这是因为 css-loader 里面内部已经处理了这一个过程
另外 vue-cli 为什么也不需要手动添加热模块, 因为他内部也处理了这个热更新

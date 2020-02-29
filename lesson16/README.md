# 不同环境打包

在实际项目搭建过程中, 配置 webpack 打包时, 会有开发环境和生产环境等多环境的 webpack 配置, 如 webpack.dev.js, webpack.prod.js 和 webpack.common.js 等多个环境配置

安装 webpack-merge

```bash
$ npm install --save-dev webpack-merge
```

创建文件

webpack.dev.js
webpack.prod.js
webpack.common.js

```js
// webpack.common.js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin()],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

```js
// webpack.dev.js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist'
  }
});
```

```js
// webpack.prod.js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'cheap-module-source-map'
});
```

开发环境运行

```bash
$ webpack-dev-server --config webpack.dev.js
```

生产环境运行

```bash
$ webpack --config webpack.prod.js
```

发现以上两个环境都能运行正常

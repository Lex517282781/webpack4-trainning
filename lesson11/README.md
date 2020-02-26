# Webpack source map

source map 是一个关于开发和生成阶段选择如何调试的配置方式, 是一种映射关系, 能把生产出的文件中出错的位置和源文件保持映射

## devtool: 'none'

```js
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'none',
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};

// main.js
console.og('hello, source map'); // 这里有错误
```

这时候运行 webpack 发现浏览器报错了, 但是报错提示并不友好, 无法直接定位源文件出错的位置

```js
Uncaught TypeError: console.og is not a function
    at Object../src/main.js (bundle.js:96)
    at __webpack_require__ (bundle.js:20)
    at bundle.js:84
    at bundle.js:87
```

## devtool: 'source-map'

```js
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};

// main.js
console.og('hello, source map'); // 这里有错误
```

```js
main.js:1 Uncaught TypeError: console.og is not a function
    at Object../src/main.js (main.js:1)
    at __webpack_require__ (bootstrap:19)
    at bootstrap:83
    at bootstrap:83
```

这个时候浏览器报错提示就比较友好了, 直接定位到源文件, 而且发现 dist 文件多了一个映射文件 bundle.js.map

## devtool: 'inline-source-map'

inline-source-map 模式打包能把错误提示精确到行和列

```js
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};

// main.js
console.og('hello, source map'); // 这里有错误
```

打包发现 dist 文件下.map 文件不见了, 实际上直接打包到打包的输出文件中去了

## devtool: 'cheap-inline-source-map'

cheap 模式下打包, 错误提示只能精确到列, 且它只会打包业务代码

## devtool: 'cheap-module-source-map'

module 模式下打包, 打包提示不仅能精确到业务代码, 且能精确到第三方模块代码

## eval

eval 是最快的打包方式, 并不会生成映射内容, 通过引入源文件的方式映射错误提示
但是复杂业务下, eval 映射的错误内容可能并不全面

## 比较推荐的两种打包方式

- 开发环境中建议使用 cheap-module-eval-source-map
- 生产环境中建议使用 cheap-module-source-map 或者不使用(也可设置为 none)

## todo source-map 原理研究

# Tree Shaking

在 es module 中模块导出的代码, Tree Shaking 能自动剔除当前模块中未被引用的模块, 即只打包引入的代码
注意只支持 es es module, 不支持 commonjs 模块, 即支持静态引入的方式, 不支持动态引入的方式

## 未配置 Tree Shaking

```js
// main.js
import { cube } from './math.js';
console.log(cube(5));

// math.js
export function square(x) {
  return x * x;
}
export function cube(x) {
  return x * x * x;
}

// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true
  },
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: '[name].js',
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
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
```

运行 webpack 之后发现打包输出的文件 main.js 中, math.js 中的方法都被打包进去了, 而且也写明了注释 `/*! exports provided: square, cube */`

```js
/***/ "./src/math.js":
/*!*********************!*\
  !*** ./src/math.js ***!
  \*********************/
/*! exports provided: square, cube */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"square\", function() { return square; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cube\", function() { return cube; });\nfunction square(x) {\r\n  return x * x;\r\n}\r\n\r\nfunction cube(x) {\r\n  return x * x * x;\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbWF0aC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tYXRoLmpzPzVhMDMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZSh4KSB7XHJcbiAgcmV0dXJuIHggKiB4O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3ViZSh4KSB7XHJcbiAgcmV0dXJuIHggKiB4ICogeDtcclxufVxyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/math.js\n");

/***/ })
```

## 配置 Tree Shaking

```js
// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true
  },
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: '[name].js',
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
  optimization: {
    usedExports: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
```

运行 webpack 之后发现打包输出的文件 mian.js 中, 虽然 math.js 里面的方法也被打包进去了, 但是打包注释多了一句`/*! exports used: cube */`

```js
/***/ "./src/math.js":
/*!*********************!*\
  !*** ./src/math.js ***!
  \*********************/
/*! exports provided: square, cube */
/*! exports used: cube */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* unused harmony export square */\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return cube; });\nfunction square(x) {\r\n  return x * x;\r\n}\r\n\r\nfunction cube(x) {\r\n  return x * x * x;\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbWF0aC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tYXRoLmpzPzVhMDMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZSh4KSB7XHJcbiAgcmV0dXJuIHggKiB4O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3ViZSh4KSB7XHJcbiAgcmV0dXJuIHggKiB4ICogeDtcclxufVxyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/math.js\n");

/***/ })
```

这说明 Tree Shaking 起效果了, 但是 math.js 还是被全部打包进去的原因是因为在 development 的 mode 下, webpack 为了处理 source-map 的映射关系, 所以未删除 Tree Shaking 之后的代码

## 生产环境

生产环境默认开启 tree shaking

```js
// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true
  },
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: '[name].js',
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
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
```

## sideEffects

以上的 tree shaking 还需要辅助配置一个地方的参数, 是在 package.json 文件中加 sideEffects 这个属性, 然后设置为 false

```json
{
  "name": "webpack4-trainning",
  "version": "1.0.0",
  "description": "a collection of simple demos of Webpack4",
  "sideEffects": false,
  ...
}
```

但是这样设置之后, webpack 会剔除所有没有被业务代码引入的非导出模块, 那么假如引入了 css 文件, 也有可能会被剔除掉

```js
// main.js
import { cube } from './math.js';
import './style.css';

document.getElementById('root').innerHTML = `<div>${cube(2)}</div>`;

// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true
  },
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: '[name].js',
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
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
```

```css
div {
  background: red;
  padding: 20px;
}
```

运训 webpack, 打包运行, 浏览器中 div 的样式并没有变成预期的红色, 这是为什么呢

如上所述, 在 mode 设置为 production, devtool 设置为 cheap-module-source-map 之后, 并在 package.json 已经设置了 sideEffects 为 false 之后, 那么 tree shaking 就启用了, 此时 webpack 会剔除一些它认为的无用的代码, 包括引入的 css 文件, 因为并没有被使用

此时我们需要对 tree shaking 做过滤, 修改 sideEffects 的值为`["*.css"]`

```json
{
  "name": "webpack4-trainning",
  "version": "1.0.0",
  "description": "a collection of simple demos of Webpack4",
  "sideEffects": ["*.css"],
  ...
}
```

此时运行 webpack, 打开浏览器发现页面已经出现了预期的样式

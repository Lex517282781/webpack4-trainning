# Webpack plugins

plugins 可以帮助 webpack 在某一个时候做某一件事情, 相当于 react 中的钩子函数, 或者可理解为在 webpack 的整个生命周期中插入你想做的事情

## HtmlWebpackPlugin

1. 概要

HtmlWebpackPlugin 可以在 webpack 处理打包文件之后, 根据自定义模板或者默认模板生成 index.html, 并把之前打包的文件插入到文档中的一个插件

```js
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [new HtmlWebpackPlugin()]
};

// main.js
console.log('hello, lesson10');
```

在命令行也能看得出 HtmlWebpackPlugin 插件的运行时间

```bash
Hash: 8767ff784071afd1e09f
Version: webpack 4.41.6
Time: 506ms
Built at: 2020-02-26 15:52:35
     Asset       Size  Chunks             Chunk Names
 bundle.js   3.84 KiB    main  [emitted]  main
index.html  306 bytes          [emitted]
Entrypoint main = bundle.js
[./src/main.js] 72 bytes {main} [built]
Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = index.html
    [../node_modules/_html-webpack-plugin@3.2.0@html-webpack-plugin/lib/loader.js!./src/index.html] 485 bytes {0} [built]
        + 3 hidden modules

盛夏、光年@DESKTOP-A364UFP MINGW64 /f/blog/webpack4-trainning/lesson10 (master)
$ webpack
Hash: 8767ff784071afd1e09f
Version: webpack 4.41.6
Time: 492ms
Built at: 2020-02-26 15:52:56
     Asset       Size  Chunks             Chunk Names
   dist.js   3.84 KiB    main  [emitted]  main
index.html  304 bytes          [emitted]
Entrypoint main = dist.js
[./src/main.js] 72 bytes {main} [built]
Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = index.html
    [../node_modules/_html-webpack-plugin@3.2.0@html-webpack-plugin/lib/loader.js!./src/index.html] 485 bytes {0} [built]
        + 3 hidden modules
```

可以看出 HtmlWebpackPlugin 是在 webpack 对文件处理之后运行的

2. 配置

- 在 src 创建 index.html 作为 HtmlWebpackPlugin 的模板

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

- 添加配置参数

```js
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};

// main.js
document.getElementById('root').innerHTML = 'hello HtmlWebpackPlugin';
```

## clean-webpack-plugin

clean-webpack-plugin 是一个 webpack 打包之前就运行的插件, 能自定清理 output 指定文件下的文件,因为不是官方的插件, 可能在 webpack 官网上搜不到这个插件, 那么可以再 npm 市场上去搜

[直达链接](https://www.npmjs.com/package/clean-webpack-plugin)

```js
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
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
```

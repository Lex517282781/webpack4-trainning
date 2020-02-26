# Webpack 监听打包文件变化

## 运行 webpack --watch

执行该命令, 开发阶段不需要每次更改文件就去需要重新打包, 修改文件之后, 重新刷新浏览器, 能看到内容更新了

## webpack-dev-server

全局或者项目安装 webpack-dev-server

```bash
npm install webpack-dev-server --save-dev
```

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist'
  },
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

运行 webpack-dev-server

```bash
$ webpack-dev-server
```

- 能监听文件变化
- 能开启本地服务器
- 能自定刷新浏览器

[dev-server 参数](https://webpack.js.org/configuration/dev-server/#devserver)

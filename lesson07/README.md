# Webpack 处理字体

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
    <script src="./bundle.js"></script>
  </body>
</html>
```

```js
// webpack.config.js
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

// main.js
import './style.less';

document.getElementById('root').innerHTML = `
  <div class="iconfont icon-aixin">这是爱心字体图标</div><br />
  <div class="iconfont icon-bianji">这是编辑字体图标</div><br />
  <div class="iconfont icon-Dyanjing">这是眼镜字体图标</div>
`;
```

让 webpack 处理字体就是让 webpack 认识字体文件, 那么目的其实就是转移当前的字体文件打包至目标文件, 因此只要用 file-loader 即可

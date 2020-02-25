# Webpack 样式 Loader

1. css-loader

css-loader 是一个识别 css 样式文件并解析该文件的加载器, 但是并不能把返回的 css 字符串加入到 html 文件当中,一般配合 style-loader 使用

2. style-loader

style-loader 能接受 css 并将其内容以内联的形式(<style></style> 标记)插入到 html 中的 head 中

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

```css
/* body.css */
body {
  background: red;
}

/* style.css */
@import './body.css';
```

```js
// main.js
import './style.css';
```

3. less-loader

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div class="box"><div class="inner">lesson06</div></div>
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
        use: ['style-loader', 'css-loader', 'less-loader'] // 假如loader不需要其他选项, 那么不需要配置对象,  简答配置
      }
    ]
  }
};
```

```css
/* style.less */
body {
  .box {
    width: 600px;
    height: 600px;
    position: relative;
    background: red;

    .inner {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: blue;
    }
  }
}
```

4. postcss-loader

postcss-loader 可加入相应为配置增强 postcss-loader 的功能

-4.1 添加 postcss.config.js
-4.2 安装 autoprefixer
浏览器厂商自动添加前缀需要添加.browserslistrc 文件或在 package.json 里面一定要添加

```json
"browserslist": [ "这里输入你需要的支持浏览器的相关参数" ]
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div class="box">
      <div class="inner"><div class="text">box</div></div>
    </div>
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
            loader: 'css-loader',
            options: {
              importLoaders: 2 // 为了解决css中有用@import方式引入其他css的场景, 使得引入的css也能通过前面2个loader('less-loader' 和 'postcss-loader')的处理
            }
          },
          'less-loader',
          'postcss-loader'
        ]
      }
    ]
  }
};

// 或者以下postcss-loader 和  less-loader 调换位置 这样的话添加厂商前缀就不需要额外配置importLoaders
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
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      }
    ]
  }
};
```

```less
// style.less
@import './other.less';

body {
  .box {
    width: 600px;
    height: 600px;
    position: relative;
    background: red;
    transform: translateX(50%);
  }
}

// other.less
.inner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: blue;
  padding: 20px;

  .text {
    background: yellow;
  }
}
```

[browserslist 查询文档](https://github.com/browserslist/browserslist#readme)

5. css module 即 css 模块化 启用局部作用域 CSS

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
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
};

// main.js
import style from './style.less';

const a = document.createElement('div');
a.innerHTML = 'this is a module';
a.classList.add('box');

const b = document.createElement('div');
b.innerHTML = 'this is b module';
b.classList.add(style.box);

document.getElementById('root').appendChild(a);
document.getElementById('root').appendChild(b);
```

```less
.box {
  background: red;
}
```

==loader 的加载是从后往前的顺序执行的==

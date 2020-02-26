# Webpack js loader

要想 ES6 语法转化成 ES5 语法, 需要使用 babel 相应配置

1. babel

- 安装

```bash
npm install --save-dev babel-loader @babel/core
```

```js
// main.js
const arr = [1, 2, 3];
const promise = new Promise(() => {
  console.log(arr.map(item => item * 2));
});

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
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }]
  }
};
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
    <script src="./bundle.js"></script>
  </body>
</html>
```

此时运行 webpack 会发现打包之后的结果中:

```js
eval(
  'const arr = [1, 2, 3];\nconst promise = new Promise(() => {\n  console.log(arr.map(item => item * 2));\n});\n\n//# sourceURL=webpack:///./src/main.js?'
);
```

可以看出 新的语法如箭头函数并未有变化

babel-loader 只是 webpack 和 babel 的一个桥梁, 然后使用 @babel/core 去类似于 AST 抽象语法树的方法去解析, 但是并不会帮助 js 中里面的 es6 语法或者新的 api 转换成 es5 语法, 因此还需要一个转换配置,就是告诉 webpack 具体去转换源文件中的哪些新的语法或者新的 api

- 安装@babel/preset-env

```bash
npm install @babel/preset-env --save-dev
```

2. 配置

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
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  }
};
```

此时运行 webpack 发现:

```js
eval(
  'var arr = [1, 2, 3];\nvar promise = new Promise(function () {\n console.log(arr.map(function (item) {\n return item * 2;\n }));\n});\n\n//# sourceURL=webpack:///./src/main.js?'
);
```

命令行输出可以看到 bundle.js 大小为 3.9 KiB

```bash
Hash: 15855c77d6bf490f45ee
Version: webpack 4.41.6
Time: 1149ms
Built at: 2020-02-26 11:06:32
    Asset     Size  Chunks             Chunk Names
bundle.js  3.9 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./src/main.js] 132 bytes {main} [built]
```

里面 const 还有箭头函数都变成了 es5 的语法, 但是 Promise 等新的 api 却没有发生变化, 且 arr.map 等 es6 中新的接口在低版本浏览器是不支持的，这个时候需要用到@babel/polyfill 等 babel 垫片的出现

3. @babel/polyfill

安装@babel/polyfill

```bash
npm install --save @babel/polyfill
```

注意: 这里安装是生产依赖安装 --save

```js
// main.js
import '@babel/polyfill'; // 这里导入polyfill
const arr = [1, 2, 3];

const promise = new Promise(() => {
  console.log(arr.map(item => item * 2));
});
```

此时打包运行

命令行输出发现 bundle.js 大小已经为 481kb

```bash
Hash: 87d89dffdcbdee940181
Version: webpack 4.41.6
Time: 2752ms
Built at: 2020-02-26 11:09:54
    Asset     Size  Chunks             Chunk Names
bundle.js  481 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./src/main.js] 158 bytes {main} [built]
    + 307 hidden modules
```

这里使用`import '@babel/polyfill'`导入的其实整个 polyfill, 也就是里面包含了所有的 es6 新的数据接口的转换

4. 优化 @babel/polyfill

配置按需导入, 即演示 demo 只用到 promise 和 arr.map 两个方法, 那么 polyfill 只会导入相关的转换方法

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
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage'
              }
            ]
          ]
        }
      }
    ]
  }
};

// main.js
import '@babel/polyfill';
const arr = [1, 2, 3];

const promise = new Promise(() => {
  console.log(arr.map(item => item * 2));
});
```

[useBuiltIns 相关参数配置](https://www.babeljs.cn/docs/babel-preset-env#usebuiltins);

此时运行 webpack, 发现打包之后的 bundle.js 就变小了

```bash
WARNING: We noticed you're using the `useBuiltIns` option without declaring a core-js version. Currently, we assume version 2.x when no version is passed. Since this default version will likely change in future versions of Babel, we recommend explicitly setting
the core-js version you are using via the `corejs` option.

You should also be sure that the version you pass to the `corejs` option matches the version specified in your `package.json`'s `dependencies` section. If it doesn't, you need to run one of the following commands:

  npm install --save core-js@2    npm install --save core-js@3
  yarn add core-js@2              yarn add core-js@3

When setting `useBuiltIns: 'usage'`, polyfills are automatically imported when needed.
Please remove the `import '@babel/polyfill'` call or use `useBuiltIns: 'entry'` instead.

Hash: 11c301f95fc22da4e76c
Version: webpack 4.41.6
Time: 1502ms
Built at: 2020-02-26 11:21:26
    Asset      Size  Chunks             Chunk Names
bundle.js  75.2 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./src/main.js] 257 bytes {main} [built]
    + 56 hidden modules
```

还有两点：

- 警告在使用 useBuiltIns 选项时，需要声明 core-js 的版本
- 警告提示使用 useBuiltIns 参数为 usage 的时候已经为自定按需导入, 那么在 main.js 里面移除 `import "@babel/polyfill";` 这句话

安装 core-js 其中一个版本

```bash
npm install --save core-js@3
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
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                corejs: 3,
                useBuiltIns: 'usage'
              }
            ]
          ]
        }
      }
    ]
  }
};

// main.js
const arr = [1, 2, 3];

const promise = new Promise(() => {
  console.log(arr.map(item => item * 2));
});
```

5. 自定义工具或者其他库的实现使用 polyfill

@babel/polyfill 在实现垫片的的时候, 其实是在全局环境中注入相应的变量, 在用它写业务代码的时候可能没有问题, 但是在写一些工具库或者类库或者其他组件库的时候, 会污染全局环境, 那么这个时候需要用到@ babel/plugin-transform-runtime, 他会以类似闭包的概念实现打包

```bash
# 开发依赖项 转换插件只在开发中使用
npm install --save-dev @babel/plugin-transform-runtime

# 生产依赖项 实际代码运行的时候需要部署babel运行代码
npm install --save @babel/runtime

# 指定corejs参数的时候需要用
npm install --save @babel/runtime-corejs3
```

```js
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
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                corejs: 3,
                helpers: true,
                regenerator: true,
                useESModules: false
              }
            ]
          ]
        }
      }
    ]
  }
};
```

6. 抽离 babel 配置

创建.babelrc 文件

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```

```js
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
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
```

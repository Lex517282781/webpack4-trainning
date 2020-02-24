# Webpack 入口和出口配置

入口 entry 和出口 output 概要

入口指明了 webpack 依据哪个模块作为开始
出口指明了 webpack 在哪个文件夹输出什么文件

-1.1 创建空的文件夹 lesson04
-1.2 运行 webpack 报出错提示`ERROR in Entry module not found: Error: Can't resolve './src' in 'F:\blog\webpack4-trainning\lesson04'`
-1.3 依据提示, 创建 src 空目录, 再次运行 webpack, 依旧报找不到入口文件
-1.4 在 src 里面创建 index.js 文件, 再次运行 webpack, 此时 webpack 整张打包, 并在 lesson04 下生成 dist 目录, 里面包含 main.js 文件

以上可看出:
entry 的默认值为`./src/index.js`
output 的默认输出文件夹名为 dist, 文件名为 main.js

## 创建整理文件如下

lesson04
├─webpack.config.js
└─src
└─a.js
└─b.js

## 入口 entry

1. 单个入口

```js
{
  entry: './src/a.js';
}

// 以上是下面的简写
{
  entry: {
    main: './src/a.js';
  }
}
```

2. 多个入口

```js
// 数组形式
// 当一个应用依赖多个入口文件, 且彼此独立的时候, 可使用此模式打包, 比如应用中假如第三方统计 `googleAnalytics.js`, 就可以用该数组入口打包的形式告知webpack讲其打包在bundle.js末尾
{
  entry: ['./src/a.js', './src/b.js']
}

// 对象
// 多页面应用的时候可以用对象入口的方式打包, 根据不同的html文件引入相应的js文件
// 对应的输出不能写死文件名, 需用占位符, 如[name].js
{
  entry: {
    a: './src/a.js',
    b: './src/b.js'
  }
}
```

尝试更改以上配置, 运行 webpack 打包

## 处口 output

const path = require('path');

1. 单个入口

```js
{
  entry: './src/a.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

2. 多个入口

```js
// 数组形式
{
  entry: ['./src/a.js', './src/b.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}

// 对象形式
{
  entry:  {
    a: './src/a.js',
    b: './src/b.js'
  },
  output: {
    filename: '[name].js', // 需要用到占位符
    path: path.resolve(__dirname, 'dist')
  }
}

{
  entry:  {
    a: './src/a.js',
    b: './src/b.js'
  },
  output: {
    filename: 'bundle.js', // 没用到占位符 报错
    path: path.resolve(__dirname, 'dist')
  }
}

`
ERROR in chunk b [entry]
bundle.js
Conflict: Multiple chunks emit assets to the same filename bundle.js (chunks 0 and 1)
`
```

==以对象形式配置多入口, 就需要使用占位符来配置出口==

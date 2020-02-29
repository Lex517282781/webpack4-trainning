# Webpack

Webpack 是一个模块打包工具

## 怎么使用

1. 克隆本项目

```bash
$ git clone https://github.com/Lex517282781/webpack4-trainning.git
```

2. 安装相应依赖

```bash
$ npm install webpack webpack-cli -g
```

注: 本项目 webpack 具体版本详见 package.json, 尽可能保持版本一致

## Index

1. [Lesson01 Webpack 初探](https://github.com/Lex517282781/webpack4-trainning/tree/master/lesson01)
1. [Lesson02 Webpack 配置文件](https://github.com/Lex517282781/webpack4-trainning/tree/master/lesson02)
1. [Lesson03 Webpack 演示项目优化](https://github.com/Lex517282781/webpack4-trainning/tree/master/lesson03)
1. [Lesson04 Webpack 入口和出口配置](https://github.com/Lex517282781/webpack4-trainning/tree/master/lesson04)
1. [Lesson05 Webpack Loader](https://github.com/Lex517282781/webpack4-trainning/tree/master/lesson05)
1. [Lesson06 样式 Loader](https://github.com/Lex517282781/webpack4-trainning/tree/master/lesson06)
1. [Lesson07 Webpack 处理字体](https://github.com/Lex517282781/webpack4-trainning/tree/master/lesson07)
1. [Lesson08 Webpack js loader](https://github.com/Lex517282781/webpack4-trainning/tree/master/lesson08)
1. [Lesson09 Webpack React](https://github.com/Lex517282781/webpack4-trainning/tree/master/lesson09)
1. [Lesson10 Webpack plugins](https://github.com/Lex517282781/webpack4-trainning/tree/master/lesson10)
1. [Lesson11 Webpack source map](https://github.com/Lex517282781/webpack4-trainning/tree/master/lesson11)
1. [Lesson12 Webpack 监听打包文件变化](https://github.com/Lex517282781/webpack4-trainning/tree/master/lesson12)
1. [Lesson13 Webpack 热模块更新](https://github.com/Lex517282781/webpack4-trainning/tree/master/lesson13)
1. [Lesson14 Webpack Code Splitting](https://github.com/Lex517282781/webpack4-trainning/tree/master/lesson14)
1. [Lesson15 Webpack Tree Shaking](https://github.com/Lex517282781/webpack4-trainning/tree/master/lesson15)

## 注意

本项目只为学习, 生产环境应可能使用在项目中安装 webpack webpack-cli 使用: `npm install webpack webpack-cli --save-dev`
安装的时候尽可能保持源一致, 即要么全部使用 npm 安装, 或者全部使用 cnpm 安装, 否则容易引起以下找不到模块的错误提示

```bash
$ webpack
internal/modules/cjs/loader.js:583
    throw err;
    ^

Error: Cannot find module 'import-local'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:581:15)
    at Function.Module._load (internal/modules/cjs/loader.js:507:25)
    at Module.require (internal/modules/cjs/loader.js:637:17)
    at require (internal/modules/cjs/helpers.js:22:18)
    at F:\blog\webpack4-trainning\node_modules\_webpack-cli@3.3.11@webpack-cli\bin\cli.js:13:22
    at Object.<anonymous> (F:\blog\webpack4-trainning\node_modules\_webpack-cli@3.3.11@webpack-cli\bin\cli.js:366:3)
    at Module._compile (internal/modules/cjs/loader.js:689:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
    at Module.load (internal/modules/cjs/loader.js:599:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
```

假如混合使用 cnpm 和 npm, 导致报错, 只要把项目中的 node_modules 文件夹删掉，统一用 cnpm install，或者 npm install 重新下载第三方包，就能解决报错问题

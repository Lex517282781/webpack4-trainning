# Webpack 演示项目优化

1. 项目文件目录优化

前面两节课程基本上是对于 webpack 的一些初步认识, 所有的文件都是放在一个目录里面, 现在对于 webpack 的目录做个初步的结构优化, 实际在开发环境中也是基本上会对源文件和打包文件作区分, 方便管理

-1.1 新建 src 目录(源文件放置的地方)
-1.2 新建 dist 目录(webpack 打包生成的地方)

2. 项目文件的优化

之前的课程中, js 中的代码的执行, 和 webpack 相比较, 可能并没有显示出 webpack 的用途和优点

-2.1 src 文件夹下创建 hello.js, 修改 main.js, dist 文件夹下修改 index.html

```js
// hello.js
const helloTxt = 'hello lesson03';
export default helloTxt;
```

```js
//  main.js
import helloTxt from './hello';
document.getElementById('root').innerHTML = helloTxt;
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="../src/main.js"></script>
  </body>
</html>
```

3. 直接打开 dist 中的 index.html 文件, 看浏览器运行效果
   此时浏览器会报错提示 `Uncaught SyntaxError: Cannot use import statement outside a module`
   即浏览器不认识 esmodule
   那么怎么解决呢, 这正是 webpack 等打包工具的用途之一了

4. 因为步骤 1 和步骤 2 的变化, webpack 也要做出相应调整

```js
const path = require('path');

module.exports = {
  entry: '.src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

运行 webpack

```bash
cd lesson03
$ webpack
```

这个时候就可以正常输出了, 此时再对 dist 中的 index.html 文件做下调整, 更改 js 的引用路径 `<script src="./bundle.js"></script>`, 然后在浏览器打开 index.html 文件, 此时 index.html 就在浏览器就正常运行了

5. webpack 输出过程解析

```bash
Hash: 25a5730f9fd232657ef1 (表示本次打包唯一hash值)
Version: webpack 4.41.6 (表示本次打包使用工具webpack的版本)
Time: 485ms (表示本次打包的耗时)
Built at: 2020-02-24 12:37:29 (表示本次打包的具体开始时间)
    Asset (打包输出的文件)  Size (打包输出的文件大小)  Chunks (打包输出在各个引用的id值)  Chunk Names (打包输入的键值)
        bundle.js               1010 bytes               0                 [emitted]             main
Entrypoint main = bundle.js (表示本次打包的入口)
[0] ./src/main.js + 1 modules 154 bytes {0} [built] (各个模块的引用关系)
    | ./src/main.js 90 bytes [built]
    | ./src/hello.js 64 bytes [built]

# 这是webpack4新出的api关于模式的优化配置提示 [模式(mode)](https://www.webpackjs.com/concepts/mode/)
# 默认为production
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
```

6. 配置 mode

为不出错提示, 配置 mode 值为 development

```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

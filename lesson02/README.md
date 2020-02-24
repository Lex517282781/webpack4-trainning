# Webpack 配置文件

1. 创建 webpack.config.js, 输入以下配置

```js
module.exports = {
  entry: './main.js'
};
```

2. 运行 webpack

```bash
$ webpack
```

此时直接运行 webpack 就不会提示入口找不到的报错了
webpack 默认会去查找 webpack.config.js 的配置参数 作为 webpack 的配置参数
生成的打包文件, 依旧包含 dist 文件夹, 且里面包含 main.js 的文件
直接打开 index.html 文件, 正常运行

3. 添加 webpack 出口配置

```js
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: 'bundle'
  }
};
```

或者

```js
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: './bundle'
  }
};
```

output 代表 wenpack 对入口文件处理之后打包输出的一些配置选项
filename 代表打包输出文件的文件名
path 代表打包输出的路径

所以以上配置命令 webpack 去处理 `main.js` 文件, 并将处理之后生成的 `bundle.js` 输出到 `bundle` 目录中

-3.1 运行 webpack `$ webpack`

此时命令行会有打包出错提示

```bash
Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.
  - configuration.output.path: The provided value "bundle" is not an absolute path!
    -> The output directory as **absolute path** (required).
```

==这表示 webpack 对于打包输出的文件需要放置的目录必须是绝对路径==

-3.2 引入 nodejs 中的 path 模块, 解决相对路径的问题

```js
const path = require('path');

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bundle')
  }
};
```

这里引入了 node 的核心模块之一 path 模块
[path 模块文档](http://nodejs.cn/api/path.html)
[path.resolve 方法](http://nodejs.cn/api/path.html#path_path_resolve_paths)
[\_\_dirname 模块大概知识](http://nodejs.cn/api/globals.html#globals_dirname)
[\_\_dirname 模块解析](http://nodejs.cn/api/modules.html#modules_dirname)

此时运行 webpack 发现正常输出 并且是根据配置的要求 生成一个 bundle 文件夹, 且里面包含 bundle.js 的文件

4. 更改 index.html 对于 js 的引用地址 `<script src="./bundle/bundle.js"></script>` 发现浏览器能正常输出

5. 更改 webpack.config.js 文件的文件名为 webpack.test.js 此时再运行 webpack

此时 webpack 命令行又输出找不到入口配置的错误
此时说明 webpack 会默认把 webpack.config.js 当做他的默认配置文件
那么如果我们需要更改默认配置文件地址, 就需要在命令行运行 webpack 添加参数 `webpack --config webpack.test.js`, 告知 webpack 把 webpack.test.js 当做配置文件打包, 此时再运行 webpack, 运行就正常了

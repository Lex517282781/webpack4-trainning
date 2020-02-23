# Webpack 初探

1. 运行命令

```bash
$ webpack
```

结果:
`ERROR in Entry module not found: Error: Can't resolve './src' in 'F:\blog\webpack4-trainning\lesson01'`

注:
直接运行命令 webpack, 即不加任何参数, webpack 会报错提示不能解析到入口
说明运行 webpack, entry 模块是必选参数

2. 运行命令

```bash
$ webpack main.js
```

结果:
自动在本目录中生成 dist 文件夹, 且里面包含 main.js 的文件

注:
说明 dist 和 main.js 都是 webpack 的默认参数

3. 打开 index.html

正常运行的话, 就表示打包成功

4. 注意

提示以下内容先不用去管, 后面演示会提到
`WARNING in configuration The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment. You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/`

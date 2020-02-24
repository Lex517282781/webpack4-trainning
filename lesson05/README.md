# Webpack Loader

1. Loader 的使用背景

-1.1 在 src 中加入一张图片, 然后在 main.js 中导入图片

```js
// main.js
import img from 'img.jpg';
console.log(img);
```

-1.2 运行 webpack

此时发现 webpack 命令行报错了

```bash
ERROR in ./src/img.jpg 1:0
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
(Source code omitted for this binary file)
 @ ./src/main.js 1:0-28
```

webpack 默认只能处理 js 模块的, 但是处理不了除 js 以外的其他类型的模块, 此时需要用 webpack 配置告知 webpack 使用相应的方式去处理 webpack 不能处理的模块, 这个时候就需要 loader 了

2. filer-loader

```js
{
  module: {
    rules: [
      {
        test: /\.jpg$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ];
  }
}
```

这个配置就是告知 webpack 当遇到不认识的 module 的时候, 需要在 module 里面查找匹配的模块, 然后 use 里面的 loader 方案去处理， 即 module -> rules -> test -> loader

运行 webpack 此时 dist 生成刚才打包的图片, 并且以 hash 命名

那么 file-loader 为我们做了什么事情吗?

[filer-loader](https://www.webpackjs.com/loaders/file-loader/)

- 首先将原图片资源移动至目标文件夹中,即 dist, 且根据 option 的配置项目或默认配置和项命名图片文件, 然后返回该文件的路径值(当然包括文件名)
- 然后将刚才返回的然后返回该文件的路径值返回给其他模块引入的文件中
- 其他模块使用该文件的路径值

所以 filer-loader 模块可以使源资源文件变成路径地址值, 即只要遇到这样需要路径地址的值的场景,就可以使用 filer-loader

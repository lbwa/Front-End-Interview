# 模块化

**未模块化带来的问题**：

- 浏览器会默认将不同 JS 文件（包含外联 JS 文件和嵌入式 JS）合并为一个模块（除了设置 `type="modules"` 的外部 JS 文件），那么这将易导致三个问题：

  - 全局变量污染，各个文件中的函数和变量都将存在于全局作用域内。

  - 各个来源之间的 JS 函数或全局作用域内的变量可能存在冲突。

  - 各个 JS 文件必须遵循引用关系排列，但是单从 JS 文件很难分辨模块之间的依赖关系。

# ES6 模块化

为了解决以上问题，[ES6][es6-modules] 标准化了 `模块化`，具体实现即是 `export` 与 `import`。

常见模块化思想：将不同功能的 JS 函数封装在不同的 JS 文件中，`export` 将模块的公有方法暴露给模块外部， `import` 引入当前模块的外部依赖，即明确当前模块依赖哪些模块。各个模块各司其职。此举便于后期维护，也便于他人加入开发。

```js
// utils.js 底层工具函数
export function isArray (target) {
  return Array.isArray(target)
}

// module-utils.js 模块工具函数
import { isArray } from './utils'
export default function formatData (target) {
  // target 进行一些处理后，赋值给 newTarget
  return isArray(newTarget)
}

// module-a.js 业务逻辑
import formatData from './module-utils'
const arr = [1, 2, 3, 4]
// arr 经过一些处理，赋值给 newArr
formatData(newArr)
```

在示例中，依据每个 JS 文件默认都是一个独立的模块（都拥有自己独有的作用域）的原理，那么示例中可看出存在 `utils`、`module-utils`、`module-a` 这三个模块。在开发过程中，他们各司其职，`utils` 其中主要包含开发时可能被许多模块用到的**底层**函数，`module-utils` 主要包含在开发某个模块多次使用的**再次被包装**的工具函数，`module-a` 即是开发的业务模块。以上分类标准并非是开发的强制的分类模块标准，即如何分类不是最重要的，如何分离模块是需要结合实际开发情况来判断的，**最重要**的是分离模块开发的这种开发思维。

有了以上的分工，极大提高了代码健壮性，每个模块都有自己的功能，每个模块对外暴露自己公有方法，模块内部的一些重要变量也得以保护。防止了工具函数及其关联变量被意外修改的发生。

[es6-modules]:https://www.ecma-international.org/ecma-262/6.0/?utm_medium=social&utm_source=wechat_session&from=singlemessage&isappinstalled=0#sec-modules

# AMD（ Asynchronous Module Definition ）

`AMD`（[github wiki][amd-github]） 规范表示 **异步模块定义** 规范。

常用的 `AMD` 实现之一有 `requirejs`（[官网][requirejs-site]）工具库，它会在全局作用域中暴露 `define` （定义模块）和 `require` 函数（加载模块）。`requirejs` 实现了异步或动态加载依赖的模块机制。它**只**会加载被依赖的模块。

- `requirejs`的引入与入口

```html
<script data-main="scripts/main" src="scripts/require.js" async></script>
```

示例中，`data-main` 表示，整体业务代码的逻辑入口，即主模块，所有代码的开端。

- 定义模块

  - 参考：
    1. [定义模块][module-definition]
    2. [命名模块][named-modules]
    3. [define 语法糖][define-sugar]

```js
/**
 * API define
 * @param {String} id 模块名
 * @param {Array<String>} dependence 当前定义的模块的依赖模块，数组中的每一项为模块地址的字符串 
 * @param {Function/Object} fn_Or_Object 回调函数的返回值或一个对象定义当前模块的值
 */
define(id, dependence, function (m1, m2) {
  // 通过回调函数的 return 定义模块的值
  return function () {}
})

// 不依赖其他模块的模块
define({
  methods: function () {}
})

define(function () {
  return {
    m1: function () {},
    m2: function () {}
  }
})

// 依赖其他模块的模块
define(['./module-1', './module-2'], {
  function (m1, m2) {}
})

// 语法糖
define(function (require) {
  var m1 = require('./module-1'),
      m2 = require('./module-2')

  // ...
  return function () {}
})
```

- 加载模块

```js
require(['m1', 'm2'], function (m1, m2) {
  // 在加载完成 m1 和 m2 后，执行本匿名回调函数
  m1.doSomething()
  m2.doSomething1()
})
```
示例中，在加载 m1 和 m2 完成后，执行一个回调函数，该回调函数用于完成指定的任务。

[requirejs-site]:http://requirejs.org/

[module-definition]:http://requirejs.org/docs/api.html#define

[named-modules]:http://requirejs.org/docs/api.html#modulename

[define-sugar]:http://requirejs.org/docs/whyamd.html#sugar

[amd-github]:https://github.com/amdjs/amdjs-api/wiki/AMD

# CommonJS

`CommonJS` 主要是在服务端（`Node.js`）运行的模块加载器，因为在服务端不存在像客户端一样在使用前需要先从网络下载 JS 文件，那么在 `CommonJS` 中所有引入的模块默认都是**同步**加载的。

常见使用即是 `webpack` 等构建工具中的使用。

```js
// 引入 utils 模块
const someData = require('utils.js')

// 当前模块对模块外部的公有接口
module.exports = {
  getSomething: function () {
    // do something ...
  }
}
```

# AMD 和 CommonJS 使用场景区分

- 需要异步加载 JS 模块，使用 AMD

- 项目中引入了 npm ，则建议使用 CommonJs

# 构建工具

- webpack

拥有各项功能的**全能型**前端构建工具。它不仅仅局限于 JS 模块合并打包，而且还有打包样式表，外部资源，压缩代码等其他高级功能。

**适用场景**：常规前端项目构建打包。但不推荐 JS 库打包使用，因为过于繁重。

- rollup

**极简**的 JS 模块打包工具，相对于 `webpack` 的各项高级功能（全能手）来说，`rollup` 只专注于**模块合并打包**功能的实现。

在 JS 库的打包构建中，使用 `rollup` 打包而成的 `bundle.js` 大小远小于 `webpack` 打包的 `bundle.js``。rollup` 打包生成的 `bundle.js` 非常简洁。

**适用场景**：JS 库打包，如 `Vue.js` 库就是使用了 `rollup` 打包生成。
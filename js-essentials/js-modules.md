# 模块化

**未模块化带来的问题**：

- 浏览器会默认将不同 JS 文件（包含外联 JS 文件和嵌入式 JS）合并为一个模块（除了设置 `type="modules"` 的 JS文件），那么这将易导致三个问题：

  - 全局变量污染，各个文件中的函数和变量都将存在于全局作用域内。

  - 各个来源之间的 JS 函数或全局作用域内的变量可能存在冲突。

  - 各个 JS 文件必须遵循引用关系排列，但是单从 JS 文件很难分辨模块之间的依赖关系。

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

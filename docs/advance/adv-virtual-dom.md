# virtual DOM

一般将 `virtual DOM` 简写为 `vdom`。`vdom` 的目的是以最优解去更新 `DOM`，那么就要保证更新节点的查询次数最少（`vnode`更新节点不需要查询），更新的影响范围最小（依靠 `vnode.elm` 精确定位节点）。

## vdom 定义



1. 含义：用 JS 对象来映射模拟 `DOM` 结构

    ```js
    h('div', { id: 'test'}, 'hello')
    // 生成 vnode
    {
      children: undefined, // 数组，表示当前节点的 Element 类型子节点的子 vnode
      data: { // 当前节点的属性
        id: 'data'
      },
      elm: div, // 映射真实 DOM 树节点，即此处是 vdom 精确更新修改后节点的关键之一
      key: undefined,
      sel: 'div', // h() 第一参数，用于创建真实节点
      text: 'hello' // 当前节点的文本节点，与 children 属性互斥
    }
    ```

2. 原理：在 JS 层通过 `diff` 算法来对比 `DOM` 的结构变化

    - 浏览器中最**耗时**的操作即是 `DOM` 操作，直接操作 `DOM`，将带来巨大的性能开销，所以在没有使用 `vdom` 时，需要我们尽可能减少 `DOM` 操作。
    
    - JS 的执行速度**远远快于**浏览器 `DOM` 渲染速度。所以在 JS 层来处理 `DOM` 结构变化将大大降低性能开销。结果将是以**最优解**（最小的改动范围，最少的改动次数）去改变 `DOM` 结构。

        - 借助 `diff` 算法对比新旧 `vnode` 的差异。

        - `vnode.elm` 与真实 `DOM` 树节点形成映射，进行**精准更新**，避免了 `DOM` 节点查询。

    - 前端中只有 JS 是图灵完备语言 —— 能执行算法的语言

3. 目的：提高重绘性能。即是 `vdom` 存在的意义。

## vdom API

- 核心：

    - `h` 函数：生成 `vnode`。

    - `patch` 函数：对比新旧 `vnode`，并生成或更新 `DOM` 节点。

    - API 示例如下：

        ```js{18-19}
        // const snabbdom = require('sanbbdom')
        import snabbdom from 'snabbdom'
        import h from 'snabbdom/h'
        import snabbdom_class from 'snabbdom/modules/class'
        import snabbdom_props from 'snabbdom/modules/props'
        import snabbdom_style from 'snabbdom/modules/style'
        import snabbdom_eventlistener from 'snabbdom/modules/eventlistener'

        // 初始化 patch
        const patch = snabbdom.init([
          snabbdom_class,
          snabbdom_props,
          snabbdom_style,
          snabbdom_eventlisteners
        ])

        // 生成 vnode
        h(`${/* 标签名 */}`, {/* 属性 */}, [/* 子元素 */])
        h(`${/* 标签名 */}`, {/* 属性 */}, `${/* 文本节点 */}`)
        ```

        ```js{4-8}
        // 容器元素
        const container = document.querySelector('#container')

        // 初次渲染：vnode 初次渲染至 container 容器中
        patch(container, vnode)

        // 更新节点：利用 js 对比新旧 vnode 来得到操作 DOM 的最优解
        patch(vnode, newVnode)
        ```

  - 示例：生成 `table` 表格

      ```js
      const data = [
        {
          name: 'name',
          age: 'age',
          address: 'address'
        },
        {
          name: 'John Wick',
          age: 20,
          address: 'Shanghai'
        }
      ]

      let vnode = {} // 缓存容器

      function render () {
        // 生成 vnode
        const newVnode = h('table', {}, data.map(function (item) {
          const tds = []
          Object.keys(item).forEach(key => {
            tds.push(h('td', {}, item[key]))
          })
          // 返回一个以 tr 元素的 vnode 组成的数组
          return h('tr', {}, tds)
        }))

        if (vnode) {
          patch(vnode, newVnode)
        } else {
          patch(container, newVnode)
        }

        // 缓存 vnode
        vnode = newVnode
      }

      render(data)
      ```

得到表格如下：

|    name   | age | address |
| --------- | -- | -------- |
| John Wick | 20 | Shanghai |

`DOM` 树如下：

```html
<div id="container">
  <table>
    <tr>
      <td>name</td>
      <td>age</td>
      <td>address</td>
    </tr>
    <tr>
      <td>John Wick</td>
      <td>20</td>
      <td>Shanghai</td>
    </tr>
  </table>
</div>
```

## diff 算法 —— vdom 核心

1. 定义

    - `linux` 中的 `diff` 命令。

        ```bash
        diff a.js a1.js
        # 将打印 a.js 与 a1.js 的差异
        ```
    - `diff` 算法并非 `vdom` 的原创算法。

2. `vdom` 使用 `diff` 算法的原因

    - 依靠 `diff` 算法，可以**找到**新旧 `vnode` 中的差异点，即是必须更新的节点（依据 `vnode.elm` 得到映射的真实 `DOM` 树节点进更新），而其他节点则保持不变。

3. `diff` 算法核心实现流程

    - 初次渲染，将 `vnode` 初次转换成 `DOM` 节点

        ```js
        patch(container, vnode)
        ```
        ```js
        // 仅用于体现转换逻辑，并非真实体现
        function createElement () {
          const tag = vnode.sel
          const attrs = vnode.data || {}
          const children = vnode.children || []
          if (!tag) return null

          // 创建元素
          const ele = document.createElement(tag)

          // 设置节点属性
          Object.keys(attrs).forEach(item => {
            ele.setAttribute(item, attrs[item])
          })

          // 插入子元素
          children.forEach(childVnode => {
            // 递归创建子节点的后代节点（若有的话）
            ele.appendChild(createElement(childVnode))
          }

          // 返回真正 DOM 节点
          return ele
        }
        ```

      以上逻辑主要展现 `vnode` 的初次渲染。于 `patch` 方法中， `container` 为渲染容器。

    - 渲染更新

        ```js
        patch(vnode, newVnode)
        ```
        ```js
        function updateChildren (vnode, newVnode) {
          const children = vnode.children || []
          const newChildren = newVnode.children || []

          children.forEach((childVnode, index) => {
            const newChildVnode = newChildren[index]
            if (childVnode.sel === newChildVnode.sel) {
              // 递归子节点的后代节点进行对比
              updateChildren(childVnode newChildVnode)
            } else {
              replaceNode(childVnode, newChildVnode)
            }
          })
        }

        function replaceNode(vnode, newVnode) {
          const elm = vnode.elm
          const newElm = createElement(newVnode)

          // DOM 替换 ...
        }
        ```

      以上逻辑主要展现 `vnode` 更新。在得到 `newVnode` 后传入 `patch` 函数，`patch` 函数将根据 `diff` 算法得到 `vnode` 与 `newVnode` 之间的差异，之后执行精确的 `DOM` 更新。

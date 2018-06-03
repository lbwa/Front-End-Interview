# 组件化

## 对组件化的理解

  1. 组件的封装

      组件化是 **关注点分离原则** 的实际实现。单个组件被封装形成一个独立模块，外部调用该模块时只用关心对外的暴露变量即可。

      - 视图

          - 组件的视图由组件本身驱动（`props` 也是属于组件的一部分），与外部视图解耦。

      - 数据

          - 除了 `export` 接口外，其他变量均是模块私有。组件内部严格形成一个独立作用域，保证了模块的功能完整性与安全性。

              - 拓展： 模块的封装应该遵循开闭原则。

      - 数据驱动视图更新

          - 组件视图层的更新由组件自身负责，不受模块外部影响。

  2. 组件的复用

      组件化模式将 `web` 应用依据功能**解耦**，形成多个**单功能**模块（关注点分离），它们是具有复用性的。组件化模式在某种程度上降低了遵循 **开闭原则** 的难度。

      - 方法：`props` 传递

          - 每个模块都可接受 `props` 变量，使得单个模块在不同的数据场景下被赋予了不同的功能。

          ```html
          <!-- a.vue -->
          <template>
            <!-- Input 模块接受父组件 a 传入的数据 addItemHandle -->
            <Input addItemHandle="addItem">
          <template>
          ```

          ```jsx
          /* app.js for react */
          <div>
            <Input addItem={this.addItem.bind(this)}/>
            <List data={this.state.list}/>
          </div>
          ```

      - 效果

          - 单功能组件因接受的 `props` 不同，而衍生出与其他同类组件运行结果不同的组件。
          
          - 在一些展示性组件中，接受不同的 `props` 可以组成不同展示效果的视图组件。但是，他们的本质却都是同一个展示性基础组件。

  3. 总结：组件化模式，从生产力方面，极大提高了开发效率。从前期开发和后期维护方面，因为各个模块之间功能相互独立的特点，即关注点分离，使得代码逻辑更为清晰。

## JSX

  1. `JSX` 本质是什么

      - `JSX` 本质是 JS 代码**语法糖**

          - 书写的 `JSX` 即是书写的模板，`JSX` 通过编译为  JS 代码来实现逻辑和 JS 变量，最终将生成 HTML。

          - 仅能在开发环境中使用 `JSX`，浏览器无法解析 `JSX`。所以在开发环境中会将所有的 `JSX` 编译成 JS 代码。

          - 在 `react` 或 `vue` 中编译 `JSX` 时，都将调用 **渲染函数** 来解析模板。如 `React.createElement('div', {...}, child)`

      - `JSX` 语法

          - [JSX in vue][vue-jsx]

          - [JSX in react][react-jsx]

          - 精简：在 `JSX` 中**大括号**内可使用 JS 变量和表达式。

              ```jsx
              class App extends Component {
                render () {
                  const className = 'container'
                  const show = true
                  const styleConfig = {
                    fontSize: '20px',
                    color: 'red'
                  }
                  return (
                    <div className={className} style={{textAlign: 'center'}}>
                      <p style={styleConfig}>{show ? 'hello' : ''}</p>
                    </div>
                  )
                }
              }
              ```

[react-jsx]:https://reactjs.org/docs/introducing-jsx.html

[vue-jsx]:https://github.com/vuejs/babel-plugin-transform-vue-jsx#usage

  2. `JSX` 和 `vdom` 的关系

      - `JSX` 需要编译为 JS 来实现模板中的逻辑，再由生成的 JS 来渲染 HTML

      - `JSX` 编译为 JS 之后再结合 `vdom` 可实现高效的渲染 HTML。那么 `JSX` 的归宿是调用 **渲染函数** 生成 `vnode`，其中，`vnode` 包含了对真实 `DOM` 的映射。

          （以 `react` 为例）

          - 初次渲染

              ```js
              /**
               * react 中初次渲染
               * <App/> —— JSX 被编译为 JS，并调用渲染函数生成 vnode
               * container —— 真实 DOM 节点，容器元素
               */
              ReactDOM.render(<App/>, container)
              // 触发内部方法
              patch(container, vnode)
              ```

          - 更新 `DOM`

              ```js
              // 修改 state
              this.setState({ ... })

              // 触发调用更新 vnode 的方法
              patch(vnode, newVnode)
              ```
          - 自定义组件的解析

              ```js
              // Input 和 List 均为 class
              import Input from './input'
              import List from './list'

              function render () {
                return (
                  <div>
                    <p>this is demo</p>
                    <Input addTitle={this.addTitle.bind(this)}/>
                    <List data={this.state.list}/>
                  </div>
                )
              }
              // babel --plugins transform-react-jsx demo.jsx
              ```

              编译结果为：

              ```js{6-7}
              function render() {
                return React.createElement(
                  'div',
                  null,
                  // Input 组件将根据 props 实例化，并被调用 render 原型方法，最终生成 vnode。
                  React.createElement(Input, { addTitle: this.addTitle.bind(this) }),
                  React.createElement(List, { data: this.state.list })

                  // 等价于
                  /**
                   * const input = new Input({ addTitle: this.addTitle.bind(this) })
                   * const vnode = input.render()
                   * List 组件同理
                   */
                );
              }
              ```

              1. 当编译自定义组件时，`react` 渲染函数将被传入自定义组件的 `class`，而原生标签是传入一个原生标签名的字符串。

              2. 在传入自定义组件的 `class` 后，`react` 会根据 `props` 初始化实例，之后调用实例的 `rener` 原型方法，从而生成对应的 `vnode`。

                  - 后代组件的 `render` 函数如同祖先组件的 `render` 方法一样，都是 `JSX`，那么他们都将调用 `React.createElement` 方法生成 `vnode`。

      - 总结：`react` 和 `vue` 的渲染函数都是基于 `vdom`（[拓展阅读](./adv-virtual-dom.md)） 的 `h` 函数并结合自身库的特点改造而成的衍生物，调用它们的渲染函数都会将模板渲染为 `vnode`。其中，渲染出的 `vnode` 包含了对真实 `DOM` 节点的映射，并与其他 `vnode` 组成 `vdom`。

          - 模板：`react` 中是 `JSX`，`vue` 中是 `*.vue` 单文件组件中的 `<template></template>` 内容

## 实现组件化的基本逻辑

  - `setState` 的过程

## 对比 React 和 Vue

对比 `React` 和 `Vue` 他们各自的优劣，可拓展为是对技术选型的思考。
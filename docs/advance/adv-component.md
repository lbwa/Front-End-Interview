# 组件化

## 对组件化的理解

可从实现组件化的逻辑方面来阐述对组件化的理解。

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

### `JSX` 本质是什么

1. `JSX` 本质是 JS 代码和模板的**语法糖**

    - 书写的 `JSX` 即是书写的模板，`JSX` 通过编译为  JS 代码来实现逻辑和 JS 变量，最终将生成 HTML。

    - 仅能在开发环境中使用 `JSX`，浏览器无法解析 `JSX`。所以在开发环境中会将所有的 `JSX` 编译成 JS 代码。

    - 在 `react` 或 `vue` 中编译 `JSX` 时，都将调用 **渲染函数** 来解析模板。如 `React.createElement('div', {...}, child)`

2. `JSX` 语法

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

3. `JSX` 已经形成了独立的标准，它能与现行 JS 框架和标准兼容。

[react-jsx]:https://reactjs.org/docs/introducing-jsx.html

[vue-jsx]:https://github.com/vuejs/babel-plugin-transform-vue-jsx#usage

### `JSX` 和 `vdom` 的关系

对 `JSX` 本质的深层次拓展，即可联系到 `JSX` 和 `vdom` 的关系。`JSX` 之所以需要 `vdom` 是因为他需要被最终渲染成 HTML，且需要以数据驱动视图更新。

1. `JSX` 需要编译为 JS 来实现模板中的逻辑，再由生成的 JS 来渲染 HTML

2. `JSX` 编译为 JS 之后再结合 `vdom` 可实现高效的渲染 `HTML`，并实现 ***以数据驱动视图***。那么 `JSX` 的归宿是调用 **渲染函数** 生成 `vnode`，其中，`vnode` 包含了对真实 `DOM` 的映射。

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

        补充：`React.createElement` 是 `vdom` 中 `h` 函数的变体，与 `h` 一样同样都是返回一个 `vnode`。他们之间的不同之处在于 `React.createElement` 可接受一个 `react` 自定义组件作为第一参数。

    - 更新 `DOM`

        ```js
        // 修改 state
        this.setState({ ... })

        // 触发调用更新 vnode 的方法
        patch(vnode, newVnode)
        ```
    - 自定义组件的解析

        初始化实例，然后执行 `render`。

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

        ```js
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

        2. 在传入自定义组件的 `class` 后，`react` 会根据 `props` 初始化实例，之后调用实例的 `render` 原型方法，从而生成对应的 `vnode`。

            - 后代组件的 `render` 函数如同祖先组件的 `render` 方法一样，都是 `JSX`，那么他们都将调用 `React.createElement` 方法生成 `vnode`。

            - ***之所以*** 会执行实例化并调用实例的原型方法 `render` 的原因是，当前组件 `JSX` 编译而成的 `React.createElement`（[API - from react site][createElement-api]） 是 `vdom` 中 `h` 函数的变体（[章节 - virtual-dom](./adv-virtual-dom.md)）。当接受的第一参数为非字符串标签时，该函数将在内部调用自定义组件的 `render` 原型方法来渲染自定义组件至 `vnode`，它并不能直接如同 `字符串标签` 一样直接渲染出 `vnode`。它需要**依据**自定义组件 `render` 方法返回的 `vnode`（其中亦包含了 `DOM` 节点的 `字符串标签名`） 来完成当前 `React.createElement` 的渲染。
            
            - 注：`vnode`（[章节 - virtual-dom](./adv-virtual-dom.md)）其中包含了对真实 `DOM` 节点的映射，其中存在 `字符串标签名`。所以 `React.createElement` 可依据 `字符串标签名` 和 `vnode` 都能渲染出对应的 `vnode`。

                ```js
                /**
                 * 用于渲染 type 节点为 vnode
                 * @param {String|Object} type - 字符串标签，react 组件或片段
                 * @param {Object} props - 传入 type 中的 props 对象（包含 HTML 标签属性）
                 * @param {Object|Array} children - type 的子节点（节点）
                 */
                React.createElement(
                  type,
                  props,
                  ...children
                )

                // type 为 字符串标签名，将直接依据 标签名 和 props 和 子节点渲染出对
                // 应的 vnode
                React.createElement('div', { className: 'target' })
                // 以上依据 `vdom` 的 `h` 函数可直接渲染出对应的 `vnode`

                // type 为 非字符串标签名，将依据 type 的原型方法 render 并结合 props
                // 和 子节点 来渲染出 vnode
                React.createElement(List, { data: this.state.list })
                // 因为 List 作为 class 传入当前模块，那么可以实现以下逻辑
                const list = new List({ data: this.state.list })
                const vnode = list.render()
                // 向 React.createElement 函数返回一个 vnode，依据 vnode 中的字符串
                // 标签名即可完成当前 React.createElement 的渲染
                ```
                [createElement-api]:https://reactjs.org/docs/react-api.html#createelement

    - 多层自定义组件的解析 - ***重要***

        递归初始化实例，并执行实例的原型方法 `render`。

        （以下 `JSX` 编译均使用 `babel-plugins-transform-react-jsx` 来实现。）

        ```js
        import App from './App'
        // 应用源头
        ReactDOM.render(<App/>, document.getElementById('root'))
        // 将调用内部方法，只接受 vnode 作为参数
        patch(document.getElementById('root'), <App/>)

        // 其中解析形如 <APP/> 的 JSX 时，即
        <App/>
        
        // 将编译为
        React.createElement(App, null)

        /**
         * 1. React.createElement(App, null) 是 vdom 的 h 函数变体，那么它接受
         * `标签名`（与 h 函数相同）或 一个 react 组件（将调用该组件的 render 方法渲
         * 染该组件）作为参数（即 vnode ）来完成当前 `React.createElement` 的渲染
         * 2. App 作为 构造函数（即 class）传入
         * 依据 1 和 2 那么有以下实现 App 渲染的逻辑
         */

        // 向 App 组件传入 props（如有）实例化为 app 实例，即
        const app = new App(null)
        // 调用 app 实例的原型方法 render()，即可返回 App 组件的 vnode
        const vnode = app.render()
        // 以上 render 调用包含了对 render 中的 JSX 解析过程：
        React.createElement(
          'ul',
          null,
          React.createElement('li'. null, 'This is a element.')
        )
        // 返回由 ul 编译而成的 vnode，完成 App 自定义组件的渲染，即完成
        // React.createElement(App, null) 的渲染

        // ================== 递归 ======================

        // 当 App 组件中仍有自定义组件，即 24 行 app.render() 返回形如第一参数仍为自定义组
        // 件的函数调用
        React.createElement(List, { data: this.state.list })
        // 以上表示 React.createElement 需要解析 List 为 vnode 来完成当前 app 的渲染
        // 那么依照解析 App 自定义组件的逻辑继续解析 List 自定义组件。
        ```

        - 总结：依照以上逻辑可 ***递归*** 后代组件，直至返回的 `React.createElement` 的第一个参数是原生 `HTML` 元素字符串（而非 `react` 组件或 `react` 片段）。此时，最底层的组件的 `JSX` 编译生成的 `React.createElement` 将直接依据字符串标签名返回一个 `vnode`。在当前最低层组件完成渲染时，将逐步完成父级组件的渲染，最后完成整个应用的渲染。

3. 总结：`react` 和 `vue` 的 ***渲染函数*** 都是基于 `vdom`（[拓展阅读](./adv-virtual-dom.md)） 的 `h` 函数并结合自身库的特点改造而成的衍生物，调用它们的渲染函数都会将模板渲染为 `vnode`。其中，渲染出的 `vnode` 包含了对真实 `DOM` 节点的映射，并与其他 `vnode` 组成 `vdom`。

    - 模板：`react` 中是 `JSX`，即 `render` 函数中 `return ` 的部分；`vue` 中是 `*.vue` 单文件组件中的 `<template></template>` 内容

### `setState` 的过程

- `setState` 是异步操作

    - 异步的好处：

        1. 在当次事件循环中，且 `setState` 设置为异步时，`setState` 被调用时，`setState` 将被推入宏任务队列成为下一个被执行的宏任务。即真正的数据修改将在下一个事件循环中被执行。

            - 在当前事件循环未完成之前，它将在 `task queue` 中一直等待，即它并未进入执行上下文栈中。
        
        2. 在当前事件循环中存在多次调用 `setState` 时，即向任务队列多次添加 `setState` 任务时，将设置新的 `setState` 任务 ***覆盖*** 之前宏任务队列中旧的 `setState` 任务（去重任务），即在下一次事件循环中只会执行之前添加的多次任务的 ***最后一次*** `setState` 操作，这样可以 ***避免不必要的重绘***。这也是一个性能提升的手段。（`Vue` 中的数据更新（[source][vue-update]）也是同样的道理。）

            - 此处数据更新的异步逻辑可类比 [函数防抖][debounce-function] 的逻辑，即存在多次相同操作时，只执行最后一次调用操作。

        示例如下：

        ```js
        addItem(item) {
          const current = this.state.items

          this.setState({
            items: [item, ...current] // 将被之后的 setState 操作覆盖
          })

          this.setState({
            items: [...current, item] // 只会执行最后一次 setState 调用
          })
        }

        addItem(item)
        ```

        在当前事件循环（执行 `script` 宏任务（[详情][script-marco-task]））中，存在多次 `setState` 调用，在一次事件循环中多次重复渲染是无意义的。那么执行去重任务，只保留最后一次 `setState` 推入宏任务队列中，之前的所有 `setState` 都将被最后一次操作 ***覆盖***。

        3. 注：去重任务的工作需要另外的逻辑来实现
        
            - 如使用 `setTimeout`，当存在 `timer id` 时，取消推入上一次 `setTimeout` 分发给任务队列的任务。

            - `Vue` 中是在触发调用 `updateComponent` 是异步执行的，只向宏任务队列添加最后一次数据更新操作。

                - 这种异步去重将尝试按优先级调用 `Promise.then`、`MessageChannel`、`setTimeout(fn, 0)`


[vue-update]:https://cn.vuejs.org/v2/guide/reactivity.html#异步更新队列

[debounce-function]:https://github.com/lbwa/lbwa.github.io/issues/10

[script-marco-task]:https://lbwa.github.io/Front-End-Interview/js-essentials/js-event-loops.html#任务源

- `setState` 的过程

    1. 每个组件实例异步数据更新之后都会 ***同步调用*** 继承自父类的原型方法 `renderComponent` 以更新 `vnode`

    2. 执行 `renderComponent` 会重新执行实例的 `render`

    3. `render` 函数返回 `newVnode`，之前缓存的的 `vnode` 成为 `prevVnode`

    4. 执行 `patch(prevVnode, newVnode)` 更新 `vdom`

## 对比 React 和 Vue

对比 `React` 和 `Vue` 他们各自的优劣，可拓展为是对技术选型的思考。最重要的是要体现出自己的主见与思考。因为在实际开发中还需与团队共同探讨研究，但之前的一个大前提就是一定要有自己的思考能力和见解。

### 差异

1. 二者本质的区别

    - `vue` - 本质是 `MVVM` 框架，由 `MVC` 发展而来。尽管 `vue 2+` 出现的单文件组件（`*.vue`）也是组件化，但它从根本上是由 `MVVM` 拓展而来。

    - `react` - 本质是 `前端组件化` 框架，由后端组件化发展而来。它的组件化较 `vue` 更为彻底。

2. 模板与组件化的区别

    - `vue` 的模板由 `Angular` 的模板演变而来。常见体现就是包含模板指令，如 `v-if`。

        1. `vue` 的模板倾向于体现形式上 ***模板分离*** 的特点。即模板中只存在少量的 JS 变量，模板和 JS 在大部分情况下是分离的。模板与 JS 逻辑分离也更易遵循开闭原则，这也是 `vue` 的易用性的一个体现。

    - `react` 的模板使用的是 `JSX`。`JSX` 并非 `react` 首创，但由 `react` 发扬光大，`JSX` 现已走上标准化的道路，可兼容其他框架或标准。

        1. `JSX` 的模板语法较 `vue` 的模板更为简洁。即体现为模板与 JS 逻辑是混合的，其中亦可人为的分离模板与 JS 逻辑，仅在模板保留 JS 变量。
        
        2. `react` 遵循的事实是，以组件化的思维维护组件，即不分离组件 ***自身*** 的数据与视图，组件自身的视图逻辑，与其他组件自身的逻辑（如事件监听等）应该是天然的一个 ***整体***（[source][why-jsx]），而不是强行人为地将他们分割为不同的文件维护。但 `react` 仍推崇以 ***低耦合*** 的关注点分离的原则维护 ***组件与组件*** 之间的关系。

        3. 因为 `react` 推崇组件内的视图与数据逻辑混合，且封装组件时必须是遵循开闭原则的，而开闭原则在模板与 JS 逻辑分离的时候更易实现。因此，在组件自身数据逻辑和视图耦合的 `react` 组件内遵循开闭原则去封装组件这也对开发人员的开发技能有更高的要求。

        [why-jsx]:https://reactjs.org/docs/introducing-jsx.html#why-jsx

### 共同点

  1. 都支持组件化

  2. 都是数据驱动视图

### 其他

  1. `vue` 文档易读且详细，国内社区丰富。

  2. `react` 组件化更为彻底，且 `JSX` 已向标准化发展。因为彻底的组件化，组件自身的视图与数据逻辑的耦合对开发人员依据开闭原则的封装组件技能有更高的技能要求。

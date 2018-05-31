# 对 MVVM 的理解

1. 定义

    - `Model` 数据模型，一般是 `JavaScript` 对象，用于存储业务数据。

    - `ViewModel` 视图模型，如 `Vue.js` 。其中包含视图展示逻辑、数据状态等一系列必要因素。

    - `View` 视图层，即 `DOM` 树。

        ![mvvm-intro](mvvm.png)

    注：如在 `Vue.js` 中，通过 `DOM listener` 监听 `View` 变化来通知 `ViewModel` 更新 `Model`，`Model` 通过 `数据绑定`（`Data binding`）来通知 `ViewModel` 操作 `DOM`。

2. `MVVM` 框架（`Model-View-ViewModel`（[wiki][wiki-mvvm]））三要素

    - 响应式（[演示][vue-reactive]）

        - 响应式原理是为了在 `web` 应用被渲染的数据发生改变时，自行以最优解对目标节点进行更新。或者视图发生变化时，通知 `Model` 进行数据修改。

    - 模板引擎

    - 渲染（`ViewModel` 中的视图展示逻辑）

        - `ViewModel` 中的视图展示逻辑通过 `render` 函数来实现，其中 `render` 函数的**核心**是 `vdom`。

        - `vdom` 借由 `diff` 算法可以在操作 `DOM` 时带来极低的性能消耗（原因：章节 - [Virtual DOM](./../adv-virtual-dom.md)）。

3. 传统 JS 库（如 `jQuery`）与 `MVVM` 框架的差异

    - 使用传统 JS 框架或原生 JS 开发时：

        - 必须同时顾及业务逻辑实现与 `DOM` 操作最优解。即数据模型与视图层混杂在一起，**形成耦合**。即**关注点混杂**，后期应用拓展常常需要兼顾之前的模块逻辑，违背开放封闭原则。
        
        - 当 `web` 应用后期拓展到一定复杂度后，其中的复杂的 `DOM` 操作将可能带来巨大的性能消耗。后期的拓展和维护也将要付出昂贵的成本，每一次拓展和维护都要顾及对之前的 `DOM` 树的影响。

        - 因为前期不需要搭建额外的视图模型（`ViewModel`，视图层与数据模型之间通信的桥梁），那么在小型简单 `web` 应用开发方面传统 JS 框架或原生 JS 开发仍保持着开发流程简洁的优势。

    - 使用 `MVVM` 框架时，体现[关注点分离原则][wiki-关注点分离]：

        - **数据模型（`model`，即业务逻辑）与视图层（`View`）分离**，将二者**解耦**（使得后期拓展更易遵循开放封闭原则）。其中建立一个视图模型（`ViewModel`）中间层用于数据模型与视图层的通信。

        - **以数据驱动视图更新**，只关心数据模型的变化，DOM 操作被封装。开发人员只需要专注 JS 逻辑的实现即可。并不需要直接接触真实 `DOM`，`MVVM` 框架会自行通过 `web` 应用的数据来驱动真实 `DOM` 的渲染。所有真实 `DOM` 树的更新都是依靠 `ViewModel` 来实施高效的页面渲染和更新。

[wiki-mvvm]:https://zh.wikipedia.org/wiki/MVVM

[vue-reactive]:https://github.com/lbwa/vue-reactive

[wiki-关注点分离]:https://zh.wikipedia.org/wiki/%E5%85%B3%E6%B3%A8%E7%82%B9%E5%88%86%E7%A6%BB

# 实现 MVVM

（以 `Vue.js` 为例）

## 1. Vue.js 中响应式原理

（👉Repo: [演示][vue-reactive]）

## 2. Vue.js 如何解析模板

1. 模板

    1. 本质：字符串

    2. 内含**逻辑**语句，如 `v-if`、`v-for` 等语句
    
    3. 对比静态的 `HTML`，模板是**动态**的。

    4. 最终的编译结果是 `HTML`。

        - 模板必须转换为 JS 代码实现模板中的逻辑语句。
        
            - 前端三大语言中只有 JS 具有逻辑实现，即图灵完备语言。

        - 三大语言中只有 JS （`render` 函数）能实现转换为 `HTML`。
2. `render` 函数

    1. 模板中的所有信息在 `render` 函数中均有体现

         - 模板如下：
        ```html
        <div class="app">
          <p>{{name}}</p>
        </div>
        ```
        - `render` 函数体如下：
        ```js
        // with 用于指定 with 代码块中的上一级作用域，在查询当前作用域中未声明变量的声明时，起作用
        // this 指向 vue 实例 vm
        with(this) {
          // _c 即 vm._c，调用 createElement()，即创建 vnode
          return _c(
            'div',
            {
              attrs: {'id': 'app'}
            },
            [
              // name 即 vm.name 即 vm._data.name
              // vm._v 即 createTextVNode(val)，创建 文本 vnode
              // vm._s 即 toString(val)，转换变量 name 为字符串
              _c('p', [_v(_s(name))])
            ]
          )
        }
        ```
        注：暂只关心设计理念，模板转换为 JS 代码（`render` 函数）的过程属于工具化细节，暂不过多纠结。
    
    2. `Vue.js` 指令实现

        ```html
        <input v-model="msg" @keyup.enter="submit" type="text" id="inputPanel">
        ```

        ```js
        // 拦截 Vue.js 源码中 `code.render` 可以得到当前模板转换后的 render 函数
        with (this) { // this 即为 vm
          return _c(
            'input',
            {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  // v-model 绑定的值
                  value: (msg),
                  expression: "msg"
                }
              ], 
              // HTML 标签字符串的属性
              attrs: {
                "type": "text",
                "id": "inputPanel"
              },

              // DOM 树对象（由浏览器转换 HTML 字符串而来）自身的属性
              domProps: {
                // DOM 绑定 vm.msg
                // 即当赋值 vm.msg 时，DOM 会做出相应改变
                "value": (msg)
              },

              // 监听事件
              on: {
                "keyup": function ($event) {
                  if (!('button' in $event)
                    && _k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
                  return submit($event)
                },

                // 由 v-model 指令添加的 input 事件监听
                "input": function ($event) {
                  if ($event.target.composing) return;
                  // 当输入事件触发时，设置 vm.msg 的值
                  msg = $event.target.value
                }
              }
            }
          )
        ```

        - v-model 实现

            `v-model` 指令本质是一个语法糖，他是监听 `DOM` 树对象属性和监听 `input` 事件的封装。

            ```js
            domProps: {
              // 即 document.querySelector('input').value = msg
              "value": (msg)
            }
            // ...
            on: { // 此处亦是 v-on 的实现
              "input": function ($event) {
                if ($event.target.composing) return;
                // 当输入事件触发时，设置 vm.msg 的值
                msg = $event.target.value
              }
            }
            ```

        - `v-for` 实现

            `v-for` 本质是 `for 循环` 得到目标元素的 `render` 函数所构成的数组，该数组可用于父 `render` 函数中。
            
            （`v-if` 本质是 `if 语句判断`）

            模板如下：

            ```html
            <ul>
              <li v-for="item in items">{{item}}</li>
            </ul>
            ```

            `render` 函数如下：

            ```js
            _c(
              'ul',
              // vm._l 即 renderList 函数
              // 返回一个每项均为 li 的 render 函数的数组
              _l((items),
                function (item) {
                  return _c(
                    'li',
                    [
                      _v(_s(item))
                    ]
                  )
                }
              )
            )
            ```
    3. `render` 函数（`vm._c`）逻辑

        `Vue.js` 中的 `render` 函数是由 `snabbdom` 演变而来，这一点从 `render` 函数传参方式可以明显看出来。

## 3. Vue.js 实现的整体流程

# 事件循环 event loop

（本节为 [我的博客 —— 理解 event loop 机制][event-loop-blog] 的重新归纳。）

单线程的实现方式就是事件循环（`event loop`）。

存在两种 `event loops`（[W3C][event loops]），即一种在 `browsing context` 下的事件循环，一种是在 `web workers` 下的循环。本文讨论在 `browsing context` 下的事件循环。

[event-loop-blog]:https://lbwa.github.io/2018/03/08/Event-loop/

## 事件循环定义

依据标准中对进程模型的流程描述（[来源][processing-model]）可得出，在完成一个宏任务，并清空因宏任务产生的微任务队列时，称之为一个事件循环。

[event loops]:https://www.w3.org/TR/html5/webappapis.html#event-loop

## 任务源

- 宏任务（macrotask）: script(整体代码)，setTimeout，setInterval，setImmediate，I/O（可拓展至 Web API，如DOM 操作，用户交互，网络任务，history travelsal（[来源][generic-task-sources]））, **UI rendering**。

- 微任务（microtask）: process.nextTick（[Node.js][process.nextTick]），Promise 原型方法（即 `then`、`catch`、`finally`）, Object.observe(已废弃)，MutationObserver（[DOM Standard][mutation-observer]）
  - **特别注明**：在 `ECMAScript` 中称 `microtask` 为 `jobs`（[来源][ECMAScript-jobs]，其中 [EnqueueJob][EnqueueJob] 即指添加一个 `microtask`）。

`macrotask` 和 `microtask` 中的每一项都称之为一个 **任务源**。

以上分类中，每一项执行时均占用当前调用栈（线程）。如，可理解为浏览器渲染线程与 JS 执行共用一个线程。

**依据标准拓展**：

- 在 `W3C` 或 `WHATWG` 中除非特别指明，否则 `task` 即是指 `macrotask`。

- 根据 `W3C`（[来源][micro-task-source]）关于 `microtask` 的描述，只有两种微任务类型：单独的回调函数微任务（solitary callback microtasks），复合微任务（compound microtasks）。那么即在 `W3C` 规范中**所有**的**单独的回调函数**都是**微任务**类型。

    - solitary callback：Promise 原型的原型方法，即 `then`、`catch`、`finally` 能够调用单独的回调函数的方法。

    - compound microtask：
    
        - MutationObserver（[DOM Standard - 4.3.2 步骤 5][mutation-observer]）

        - process.nextTick（Only for [Node.js][process.nextTick]）

            - > all callbacks passed to process.nextTick() will be resolved before the event loop continues.

- 特别指明，`Web API` （event loops 章节在标准中是属于 Web API 大类）是属于宏任务类型，如 `Ajax` 属于 `I/O`（来源：[using a resource][using-a-resource]），但 `Ajax` 的回调函数都是微任务类型。

[generic-task-sources]:https://www.w3.org/TR/html5/webappapis.html#generic-task-sources

[ECMAScript-jobs]:http://www.ecma-international.org/ecma-262/#sec-performpromisethen

[EnqueueJob]:http://www.ecma-international.org/ecma-262/#sec-enqueuejob

[micro-task-source]:https://www.w3.org/TR/html5/webappapis.html#microtask

[using-a-resource]:https://www.w3.org/TR/html5/webappapis.html#task-queues

[mutation-observer]:https://dom.spec.whatwg.org/#queue-a-mutation-record

[process.nextTick]:https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#process-nexttick

## 任务队列 task queue

任务队列分为 `宏任务队列` 和 `微任务队列`。一个事件循环中可能有一个或多个任务队列。因为在执行一个宏任务时，可能产生微任务调用，即产生新的微任务队列。

**相同类型**的任务源的任务被调用时进入相同的任务队列，反之进入不同的任务队列。

**注**：

- 依据标准[描述][macro-task-queue]，除非特别指明是 `microtask queue`，那么我们一般常说的任务队列（`task queue`）都是指 `宏任务队列`（`macrotask queue`）。

- 每个事件循环都有一个 `currently running task`，用于轮询任务（`handle reentrancy`）。

- 每个事件循环都有一个 `performing a microtask checkpoint flag`（初始为 false），用于阻止再次进入当前的微任务队列。

### 标准（W3C and WHATWG）中的队列模型

（[来源][processing-model]）

1. 在 `browsing context` 事件循环的情况下，选择当前 `task queue` 中**最早**加入的 task。如果没有任务被选中（task queue 为空），那么直接跳转到第 6 步 `Microtasks`
    
    - 如 `Ajax` 请求返回数据时，若当前 `task queue` 为空时，将直接跳转执行回调函数微任务。

2. 设置当前事件循环的 `currently running task` 为第 1 步被选出的 task。

3. `Run`：执行当前被选出的 task（即 task 进入调用栈）。

4. 重置当前事件循环的 `currently running task` 为默认值 null。

5. 从当前的 `task queue` 中移除在第 3 步执行过的任务。

6. `Microtasks`：执行 `microtask checkpoint`。

    - 当 `performing a microtask checkpoint flag` 为 false 时：

        1. 设置 `performing a microtask checkpoint flag` 为 true。

        2. `Microtask queue handling`：在当前 `microtask queue` 为空时，跳转到步骤 `Done` 之后。

        3. 选中 `microtask queue` 中最早加入的 `microtask`。

        4. 设置当前事件循环的 `currently running task` 值为上一步选中的 `microtask`。

        5. `Run`：执行选中的 `microtask`。

        6. 重置置当前事件循环的 `currently running task` 值为 null。

        7. 从 `microtask queue` 中移除第 5 步 `Run` 被执行的 `microtask`，回到第 3 步 `Microtask queue handling`。

            - 可理解为在一个事件循环中，总是要**清空**当前事件循环中的微任务队列**才会进行重渲染**（`Vue.js` 的 DOM 更新原理）。

        8. `Done`：对于每一个 `responsible event loop` 是当前事件循环的环境设置对象（`environment setting object`），向它（环境设置对象）告知关于 `rejected` 状态的 `Promise` 对象的信息。
        
            - 个人理解为触发浏览器 `uncaught` 事件，并抛出 `unhandled promise rejections` 错误（[W3C][unhandled-promise-rejections]）。

            - 此步骤主要是向开发者告知 `rejected` 状态的 `Promise`，另外在现行 JS 中回调函数（solitary callback）都是依靠 `Promise` 对象来实现。

        9. 执行并清空 `Indexed Database`（用于本地存储数据的 API） 的修改请求。

        10. 重置 `performing a microtask checkpoint flag` 为 false。

    - 当一个复合微任务（`compound microtask`）执行时，客户端必须去执行一系列的复合微任务的子任务（subtask）

        1. 设置 parent 为当前事件循环的 `currently running task`。

        2. 设置 subtask 为一个由一系列给定步骤组成的新 microtask。

        3. 设置 `currently running task` 为 `subtask`。这种微任务的任务源是微任务类型的任务源。这是一个复合微任务的 `subtask`。

        4. 执行 `subtask`。

        5. 重置当前事件循环的 `currently running task` 为 parent。

7. 更新 DOM 渲染。

    - 一个宏任务 task **至此**整体执行结束（包含调用，执行，重渲染），也是一个**事件循环结束**。

8. （与第 1 步并列）如果当前的事件循环是 `web works` 的事件循环，并且在当前事件循环中的 `task queue` 为空，并且 `WorkerGlobalScope` 对象的 `closing` 为 true，那么将摧毁当前事件循环，并取消以上的事件循环步骤，并恢复执行一个 `web worker` 的步骤。

9. 回到第 1 步执行下一个事件循环。

[processing-model]:https://www.w3.org/TR/html5/webappapis.html#event-loops-processing-model

[unhandled-promise-rejections]:https://www.w3.org/TR/html5/webappapis.html#notify-about-rejected-promises

### 示例

以一个示例讲解事件循环：

```js
// script
// 1
console.log('I am from script beginning')

// 2
setTimeout(() => { // 该匿名函数称为匿名函数a
  console.log('I am from setTimeout')
}, 1000)

// 3
const ins = new Promise((resolve, reject) => {
  console.log('I am from internal part')
  resolve()
})

// 4
ins.then(() => console.log('I am from 1st ins.then()')).then(() => console.log('I am from 2nd ins.then()'))

// 5
console.log('I am from script bottom')
```

以上整个代码段即是，`macro-task` 中的 `script` 任务源。

执行原理（依据 Chrome 66 的 V8 实现）如下：

1. 整个代码段 `script` 进入调用栈（`call stack`），执行 1 处代码调用 `console.log` 函数，该函数进入调用栈，之前 `script` 执行暂停（冻结），转交执行权给 `console.log`。`console.log` 执行完成立即弹出调用栈，`script` 恢复执行。

2. `setTimeout` 是一个任务分发器，该函数本身会立即执行，延迟执行的是其中传入的参数（匿名函数 a）。`script` 暂停执行，内部建立一个 1 秒计时器。`script` 恢复执行接下来的代码。1 秒后，再将匿名函数 a 插入宏任务队列（根据任务队列，可能不会立即执行）。

3. 声明恒定变量 `ins`，并初始化为 `Promise` 实例。特别地，`Promise` 内部代码会在本轮事件循环立即执行。那么此时， `script` 冻结，开始执行 `console.log`，`console.log` 弹出调用栈后，`resolve()` 进入调用栈，将 `Promise` 状态 `resolved`，并之后弹出调用栈，此时恢复 script 执行。

4. 调用 `ins` 的 `then` 方法，将第一个 `then` 中回调添加到 `微任务队列`，继续执行，将第二个 then 中回调添加到 `微任务队列`。

5. 如同 1 时的执行原理。

6. script 执行完成，弹出调用栈。此时，若距 2 超过 1 秒钟，那么宏任务队列中有一个匿名函数 a 等待执行，否则，此时宏任务队列为空，微任务队列中有两个 `then` 加入的回调函数等待执行。

7. 在当前宏任务执行完成并弹出调用栈后，开始**清空**因宏任务执行而产生的微任务队列。首先执行 `console.log('I am from 1st ins.then()')`，之后执行 `console.log('I am from 2nd ins.then()')`。

8. 微任务队列清空后，开始调用下一宏任务（即进入下一个事件循环）或等待下一宏任务加入任务队列。此时，在 2 中计时 1 秒后，加入匿名函数 a 至宏任务队列，此时，因之前宏任务 script 执行完成而清空，那么将匿名函数 a 加入调用栈执行，输出 `I am from setTimeout`。

**注**：`JavaScript` 中在某一函数内部调用另一函数时，会暂停（冻结）当前函数的执行，并将当前函数的执行权转移给新的被调用的函数（出自 `JavaScript 语言精粹` P27）。

示例总结：

1. **在一个代码段（或理解为一个模块）中**，所有的代码都是基于一个 `script` 宏任务进行的。

2. 在当前宏任务执行完成后，**必须**要清空因执行宏任务而产生的`微任务队列`。

3. 只有当前微任务队列清空后，才会调用下一个宏任务队列中的任务。即进入下一个事件循环。

4. `new Promise` 时，`Promise` 参数中的匿名函数是**立即执行**的。被添加进`微任务队列`的是 `then` 中的回调函数。特别地，只有 `Promise` 中的状态为 `resolved` 或 `rejected` 后，才会调用 then 函数（或 catch，或 finally 函数，原理同 then），才会添加微任务至队列中。

5. `setTimeout` 是作为任务分发器的存在，他自身执行会创建一个计时器，只有待计时器结束后，才会将 `setTimeout` 中的第一参数函数添加至`宏任务队列`。换一种方式理解，`setTimeout` 中的函数**一定**是在**下一个事件循环**中被调用。

以下是在客户端（Node.js 可能有不同结果）的输入结果：

```bash
I am from script beginning
I am from internal part
I am from script bottom
I am from 1st ins.then()
I am from 2nd ins.then()
I am from setTimeout
```

[macro-task-queue]:https://www.w3.org/TR/html5/webappapis.html#microtask

## 事件循环拓展应用 —— 异步操作

1. 定时任务：setTimeout，setInterval

2. 请求数据：Ajax 请求，图片加载

3. 事件绑定

一般地，在 JS 开发过程中，凡是可能造成代码阻塞的地方都可根据实际情况考虑使用异步操作。比如，数据获取等等。

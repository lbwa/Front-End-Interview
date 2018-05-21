# 事件循环 event loop

（本节为 [我的博客 —— 理解 event loop 机制][event-loop-blog] 的简要叙述。）

存在两种 event loops（[w3c —— event loops]），即一种在 browsing context 下的事件循环，一种是在 workers 下的循环。本文讨论在 browsing context 下的事件循环。

一般地，在完成一个宏任务，并清空因宏任务产生的微任务队列时，称之为一个事件循环。

## 任务源

宏任务（macro-task）: script(整体代码), setTimeout, setInterval, setImmediate, I/O（用户输入、输出）, UI rendering

微任务（micro-task）: process.nextTick, Promise（特指 then 中被执行的函数）, Object.observe(已废弃), MutationObserver（HTML5新特性）

`macro-task` 和 `micro-task` 中的每一项都称之为一个 **任务源**。

## 任务队列 task queue

任务队列分为 `宏任务队列` 和 `微任务队列`。一个事件循环中可能有一个或多个任务队列。因为在执行一个宏任务时，可能产生微任务调用，即产生新的微任务队列。

相同任务源的任务被调用时进入相同的任务队列，反之进入不同的任务队列。

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

总结：

1. **在一个代码段中**，所有的代码都是基于一个 `script` 宏任务进行的。

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

## 事件循环拓展应用 —— 异步操作

1. 定时任务：setTimeout，setInterval

2. 请求数据：Ajax 请求，图片加载

3. 事件绑定

一般地，在 JS 开发过程中，凡是可能造成代码阻塞的地方都可根据实际情况考虑使用异步操作。比如，数据获取等等。

[event-loop-blog]:https://lbwa.github.io/2018/03/08/Event-loop/

[w3c —— event loops]:https://www.w3.org/TR/html5/webappapis.html#event-loop

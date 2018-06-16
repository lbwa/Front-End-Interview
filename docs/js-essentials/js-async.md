# 异步执行

## JavaScript 中的异步执行

本章主要叙述了 `JavaScript` 中异步操作所解决的问题，异步的实现方式等一系列相关内容。

**特别指明**：

  - 现阶段所有异步解决方案的本质仍是单线程（`one thread`），这是由避免 JS 因多线程导致多处同时操作 DOM ，进而避免了导致渲染冲突的本质所决定的。

  - 所有的异步解决方案重点是**避免**不必要的代码阻塞（如 `Ajax` 请求等待）。即异步解决方案**依靠**事件循环的原理**优化**了代码的**执行顺序**。

## 单线程和异步有什么关系

单线程通俗上解释为当前 JS 执行只有一个线程（`thread`），即只有一个执行上下文栈（`execution context stack`，亦称调用栈（`call stack`）），即只关注一件事执行。

在 JS 执行实行单线程的原因是避免 DOM 渲染冲突。

单线程在 JS 中除了普通的从上至下一次执行外，另外实现了一种执行方式，就是异步执行。异步执行加快了执行 JS 模块的速度，比如在 `Ajax` 异步请求时，可以不用等待数据返回就继续执行下面的代码，待数据返回后再执行回调函数。

```js
function getData (url) {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject('You have to input request address by String type')
      return
    }

    const xhr = new XMLHttpRequest()
    xhr.open('GET', `${url}`, true) // true 为异步请求
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          resolve(xhr.responseText)
        } else {
          reject('Request failed')
        }
      }
    }
    xhr.send(null)
  })
}

getData('./data.json')
  .catch(err => console.error(err))
  .then(res => console.log(res))

console.log('I am 1st logger in 1st event loop')

setTimeout(function fn() {
  console.log('I am in other event loop')
}, 10)

console.log('I am 2nd logger in 1st event loop')
```

输出结果为：

```js
// 情况 1
16:33:25.343 I am 1st logger in 1st event loop
16:33:25.346 I am 2nd logger in 1st event loop
16:33:25.373 {/* 返回的 JSON 数据 */}
16:33:25.460 I am in other event loop

// 情况 2
16:34:35.236 I am 1st logger in 1st event loop
16:34:35.242 I am 2nd logger in 1st event loop
16:34:35.439 I am in other event loop
16:34:36.874 {/* 返回的 JSON 数据 */}
```

示例中，`Ajax` 为异步请求（`web API` 属于 `I/O` 类任务源，是宏任务，并在当前调用栈中立即执行），`setTimeout` 中的函数为异步执行。`Ajax` 在请求后弹出调用栈（因为是异步请求，否则同步请求将阻塞接下来的代码执行），**暂存**该请求回调，待请求返回后将回调函数**加入**彼时的事件循环的微任务队列（因为示例中是用 then 包裹的回调函数）。继续执行下文代码，至 `setTimeout` 时，`setTimeout` 作为任务分发器，分发调用 `fn` 的任务，此处**暂存** `fn` 函数，建立一个 10ms 计时器，10ms 后 `fn` 函数**加入**当前宏任务队列等待执行。在之前的 10ms 计时器建立后，`setTimeout` 弹出调用栈，执行下文代码，输出 `2nd logger`。

  - 在输出 `2nd logger` 之前数据就已经返回：
  
    - 待当前宏任务执行完成（即示例中 `script` 宏任务）后，开始清空微任务队列，清空微任务队列时，将会调用回调函数，输出 `{/* 返回的 JSON 数据 */}` 请求返回的数据，执行下一个宏任务（执行 `fn` 函数，输出 `other event loop`），调用  `fn` 函数即开启新一轮事件循环。

  - 在输出 `2nd logger` 之后数据才返回：

    - 完成当前宏任务后，查询当前微任务队列为空（此时数据未返回，`Promise` 为 `pending` 状态，回调函数**未加入**到微任务队列中（[来源][promise-standard-then]）），执行下一个宏任务（调用 `fn` 函数）输出 `other event loop`，调用 `fn` 函数即开启新一轮事件循环。待之后 `Ajax` 数据返回时，将回调函数插入当前事件循环的微任务队列的最末端。在插入回调函数的当前事件循环中，清空微任务队列时，将会调用该回调函数，输出 `{/* 返回的 JSON 数据 */}` 请求返回的数据。

关于事件循环的解析见章节 —— [事件循环](js-event-loops.md)

注：JS 中的异步执行**仍是单线程的**，不是多线程。异步为解决不必要的阻塞而生，此处的异步重点是优化了代码的**执行顺序**。**避免**在执行 JS 代码中**不必要的阻塞**。即异步执行就是单线程执行的一种**优化**解决方案。

注：`HTML5` 中存在 [Web workers][web-works] 支持多线程，但不能访问 `DOM`。

[promise-standard-then]:https://promisesaplus.com/#point-26

[web-works]:https://html.spec.whatwg.org/multipage/workers.html#workers

### 总结

- 异步执行避免了不必要的代码阻塞

- 常规异步执行带来的问题

  - 降低了代码可读性，因为代码并不是按照书写顺序执行

  - 在没有 `Promise` 对象之前，callback 易耦合，不容易模块化

## 事件循环 event loop

`JavaScript` 中实现异步执行的具体解决方案就是 `event loop`。

对于事件循环的解析见章节 [event loop](js-event-loops.md)。

## jQuery 中的 Deferred

- 标准中的 `Promise` 对象由 `jQuery` 中的 `Deferred` 对象演变而来。

```js
$.ajax('/data.json')
  .done(function () {
    // do something good
  })
  .fail(function () {
    // print error to console drawer
  })
```

- `Deferred` 对象的革新：

    - 从写法上杜绝 callback hell

    - 本质是语法糖，但解耦了回调函数

    - 很好地体现了[开（放）（封）闭原则][Open/closed-principle]（程序对于拓展是开放的，对于修改是封闭的）

        - 从外部就可拓展模块功能，从外部不能也不允许修改模块内部代码。
    
        - 在仅仅只是拓展程序功能时，总是应该**倾向于添加**一个新的模块，而不是修改模块内部代码。这样可以大大避免因修改内部模块而导致新的回归测试。同时，修改模块内部代码有引入新的 BUG 的风险。

- 利用 `Deferred` 对象简单实现异步链式操作

（实现 `$.ajax('data.json').done(...)` 逻辑）

```js
function waitHandle () {
  // 创建一个 deferred 对象
  const deferred = $.Deferred()

  const wait = function (deferred) {
    const task = function () {

      // do something
      // do something else

      console.log('done')

      // 以下简化判断 resolve 条件和 reject 条件的逻辑
      // resolve
      deferred.resolve()

      // reject
      // deferred.reject()
    }

    // trigger，异步执行 task
    setTimeout(task, 1000)

    // 不直接返回 deferred 对象是为了 开闭原则，保证外部不能调用 deferred.resolve
    // 或 deferred.reject
    return deferred.promise() // 返回一个 promise 对象（标准中的 Promise 对象的前身）
  }

  // waitHandle 对外返回一个 promise 对象，便于链式操作，即便于拓展
  return wait(deferred)
}

const wh = waitHandle() // wh 为一个 promise 对象（标准中的 Promise 对象的前身）

// 将 wh 包装一下再使用
$.when(wh)
  .fail(function () {
    console.log('Invoking failed')
  }).done(function () {
    console.log('Invoking successful')
  })
```
- `Promise` 对象（标准中的 `Promise` 对象的前身）和 `Deferred` 对象的区别

    - `Deferred` 对象可在模块外部不仅能被动监听，还能再次被主动修改状态（违背开闭原则）。

    - `Promise` 对象只能被动监听，不能主动修改（遵循开闭原则）。

        - 演变出 `ECMAScript` 标准中的 `Promise` 对象，`Promise` 对象的实例中的状态一旦由 `pending` 转变为 `resolved` 或 `rejected` 后，就不能再被改变了。

[Open/closed-principle]:https://en.wikipedia.org/wiki/Open/closed_principle

## Promise 基本原理与使用

章节 - [Promise 对象](js-promise.md)

## Promise 对象的再封装 —— async/await

章节 - [异步函数](js-async-function.md)

## 总结当前 JS 解决异步的方案

- Promise

- async/await

# JavaScript 中的异步执行

本章主要叙述了 `JavaScript` 中异步操作所解决的问题，异步的实现方式等一系列相关内容。

# 单线程和异步有什么关系

单线程通俗上解释为当前 JS 执行只有一个线程（thread），即只有一个调用栈（call stack），只关注一件事执行。

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
示例中，`Ajax` 为异步请求（`web API` 属于 `I/O` 类任务源，是宏任务，并在当前调用栈中立即执行），`setTimeout` 中的函数为异步执行。`Ajax` 在请求后弹出调用栈（因为是异步请求，否则同步请求将阻塞接下来的代码执行），**暂存**该请求回调，待请求返回后将回调函数**加入**彼时的事件循环的微任务队列（因为示例中是用 then 包裹的回调函数）。继续执行下文代码，至 `setTimeout` 时，`setTimeout` 作为任务分发器，分发调用 `fn` 的任务，此处**暂存** `fn` 函数，建立一个 10ms 计时器，10ms 后 `fn` 函数**加入**当前宏任务队列等待执行。在之前的 10ms 计时器建立后，`setTimeout` 弹出调用栈，执行下文代码，输出 `2nd logger`。之后当前宏任务执行完成，清空微任务队列，队列清空后，执行下一个宏任务（执行 `fn` 函数，输出 `2nd event loop`）即开启新一轮事件循环。

关于事件循环的解析见章节 —— [事件循环](js-event-loops.md)

注：JS 中的异步执行仍是单线程的，不是多线程。异步为解决不必要的阻塞而生，此处的异步重点是优化了代码的**执行顺序**。**避免**在执行 JS 代码中**不必要的阻塞**。即异步执行就是单线程执行的一种**优化**解决方案。

注：`HTML5` 中存在 [Web workers][web-works] 支持多线程，但不能访问 `DOM`。

## 总结

- 异步执行避免了不必要的代码阻塞

- 常规异步执行带来的问题

  - 降低了代码可读性，因为代码并不是按照书写顺序执行

  - callback 耦合，不容易模块化

[web-works]:https://html.spec.whatwg.org/multipage/workers.html#workers

# 事件循环 event loop

`JavaScript` 中实现异步的具体解决方案就是 `event loop`。

对于事件循环的解析见章节 [event loop](js-event-loops.md)。

# jQuery 中的 Deferred

# Promise 基本原理与使用

# Promise 的补充 —— async/await

# 总结当前 JS 解决异步的方案

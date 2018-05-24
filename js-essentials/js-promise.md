# Promise

- 解决 `回调地狱` 的问题

`promise` 将 `callback hell` 转变为 `callback` **链式调用**。极大增强代码的易读性，并简洁地体现回调函数的逻辑性。

```js
const getSomeData = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://example.com', false)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          resolve(xhr.responseText)
        } else {
          reject(xhr.status)
        }
      }
    }
    xhr.send(null)
  })
}
 
// 链式调用回调函数，逻辑更为清晰
// catch 本质为 then(null, onRejected) 的语法糖
getSomeData()
  .catch(err => {
    console.error(err)
    throw new Error(err) // catch 返回一个 rejected Promise
  })
  .then(res => res)

// 等价于
getSomeData().then(res => res, err => console.error(err))
```

1. `then` 和 `catch` 等函数都只对**前一个** `then` 或 `catch` 返回的 `Promise` 进行**状态判断**。

2. `then` 函数默认向后传递一个之前的 `Promise` 状态的 `Promise` 对象，即继承之前的 `Promise` 状态。除非在 `then` 内部抛出一个错误，否则 `then` 传递的 `Promise` 状态将**维持不变**。

3. `catch` 函数本质是 `then(null, onRejected)` 的语法糖（[ES8][es8-promise-catch]）。

**注**：

1. 并不推荐将 `reject` 时触发的函数写为 `then` 的第二参数，推荐做法是使用 `catch()` 函数包裹。这样遵循 `链式调用` 的原则，将 `resolve` 与 `reject` 时调用的回调函数**分离**开来。

2. 推荐在 `catch` 中使用 `{ console.error(err); throw new Error(err) }` 语法，因为 `then` 和 `catch` 等函数都只对**前一个** `then` 或 `catch` 返回的 `Promise` 进行**状态判断**，那么在 `catch` 中抛出一个错误将直接使 `catch` 之后所有的 `then` 函数都将**不会**调用 `then` 函数的第一参数，那么 `then` 将继承前面的 `catch` 函数返回的 `rejected` 状态的 `Promise` 对象。即最终返回的 `Promise` 对象将是状态为 `rejected` 的 `Promise` 对象。但这仍然将导致 `reject` 触发浏览器相关 `uncaught` 事件，并抛出 `Uncaught (in promise) ...` 错误。

[es8-promise-catch]:https://www.ecma-international.org/ecma-262/8.0/#sec-promise.prototype.catch
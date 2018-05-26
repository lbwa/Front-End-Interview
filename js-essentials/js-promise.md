# Promise API

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
// catch 本质为 then(undefined, onRejected) 的语法糖
getSomeData()
  .catch(err => console.error(err))
  .then(res => res)

// 等价于
getSomeData().then(res => res, err => console.error(err))
```

- `then`、`catch`、`finally`中 `return` 的值将作为链式调用链中下一个函数中回调函数的**参数**，`Promise.all`、`Promise.race`中接受的 `Promise` 参数将仍然传递给链式调用链的下一个参数。

```js
Promise.resolve('I am resolved').then(res => res) // Promise {<resolved>: "I am resolved"}

/**
 * 1. catch 本身内部没有抛出错误的情况下，返回一个 resolved 的 Promise ，此处 resolve
 * 状态表示之前的错误已经被处理
 */
Promise.reject('I am rejected').catch(err => err) // Promise {<resolved>: "I am rejected"}
Promise.resolve('I am resolved').finally(res => res) // Promise {<resolved>: "I am resolved"}

// race 用于只要参数数组的任一 Promise 状态改变就立即返回一个同参数中抛出状态一致的 Promise
// 返回 Promise {<resolved>: true}
Promise.race([Promise.resolve(true), Promise.reject(false)]).then(res => res)

/**
 * 1. all 用于参数数组每一项均 resolve ，返回一个 resolved 的 Promise；只要有一项为
 * rejected 时，返回一个 rejected 的 Promise
 * 2. 下例返回 Promise {<resolved>: false}
 */
Promise.all([Promise.resolve(true), Promise.reject(false)]).catch(err => err)
```

- `then` 和 `catch` 等函数都只对**前一个** `then` 或 `catch` 返回的 `Promise` 进行**状态判断**。

- `then` 函数默认向后传递一个**之前**的 `Promise` 状态的 `Promise` 对象，即继承之前的 `Promise` 状态。除非在 `then` 内部抛出一个错误，否则 `then` 传递的 `Promise` 状态将**维持不变**。

- `catch` 函数本质是 `then(undefined, onRejected)` 的**语法糖**（[ES8][es8-promise-catch]）。另外，`catch` 本意是抓住（错误），那么逻辑上讲 `catch` 本身就应该返回一个 `resolved` 状态的 `Promise` 对象，其中 `resolve` 状态表示**已经处理**了先前的 `rejected` 的 `Promise` 对象。

**技巧**：

1. 并不推荐将 `reject` 时触发的函数写为 `then` 的第二参数，推荐做法是使用 `catch()` 函数包裹。这样遵循 `链式调用` 的原则，将 `resolve` 与 `reject` 时调用的回调函数**分离**开来。

2. **不推荐**在 `catch` 中使用 `{ throw new Error(err) }` 语法，那么 `catch` 将返回一个 `rejected` 状态的 `Promise` 对象，那么 `catch` 后续的 `then` 将继承前面的 `catch` 函数返回的 `rejected` 状态的 `Promise` 对象。即最终返回的 `Promise` 对象将是状态为 `rejected` 的 `Promise` 对象。这将导致 `rejected` 触发浏览器相关 `uncaught` 事件，并抛出 `Uncaught (in promise) ...` 错误。

[es8-promise-catch]:https://www.ecma-international.org/ecma-262/8.0/#sec-promise.prototype.catch
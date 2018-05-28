# Promise API

（主要参考 [promise 标准][promise-standard]）

- 解决 `回调地狱` 的问题

`promise` 将 `callback hell` 转变为 `callback` **链式调用**。极大增强代码的易读性，并简洁地体现回调函数的逻辑性。

```js
const getSomeData = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
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
 
const request = 'https://example.com'

// 链式调用回调函数，逻辑更为清晰
// catch 本质为 then(undefined, onRejected) 的语法糖
getSomeData(request)
  .catch(err => console.error(err))
  .then(res => res)

// 等价于
getSomeData(request).then(res => res, err => console.error(err))
```

- `then`、`catch`、`finally`中 `return` 的值将作为链式调用链中下一个函数中回调函数的**参数**，`Promise.all`、`Promise.race`中接受的 `Promise` 参数将仍然传递给链式调用链的下一个参数。

```js
Promise.resolve('I am resolved').then(res => res) // Promise {<resolved>: "I am resolved"}

/**
 * 1. catch 本身内部没有抛出错误的情况下，返回一个 resolved 的 Promise ，此处 `resolved`
 * 状态表示之前的错误已经被处理
 */
Promise.reject('I am rejected').catch(err => err) // Promise {<resolved>: "I am rejected"}
Promise.resolve('I am resolved').finally(res => res) // Promise {<resolved>: "I am resolved"}
Promise.resolve('I am resolved').finally(res => res).then(res => res) // 同上

// race 用于只要参数数组的任一 Promise 状态改变就立即返回一个同参数中抛出状态一致的 Promise
// 返回 Promise {<resolved>: true}
Promise.race([Promise.resolve(true), Promise.reject(false)]).then(res => res)

/**
 * 1. all 用于参数数组每一项均 resolve ，返回一个 resolved 的 Promise；只要有一项为
 * rejected 时，返回一个 rejected 的 Promise
 * 2. 下例返回 Promise {<resolved>: false}
 */
Promise.all([Promise.resolve(true), Promise.reject(false)]).catch(err => err)

// Promise 对象的 所有方法 始终返回一个新的 Promise 对象。
// const promise = Promise.resolve() 同理
const promise = new Promise((resolve, reject) => { resolve() })
promise.then() instanceof Promise // true
promise === promise.then() // false

promise.catch() instanceof Promise // true
promise === promise.catch() // false

promise.finally() instanceof Promise // true
promise === promise.finally() // false
```

- `Promise` 对象的**所有**方法**始终**返回一个**新的** `Promise` 对象。

    1. `Promise.resolve()` 返回一个 `resolved` 状态的 `Promise` 对象。

    2. `Promise.reject()` 返回一个 `rejected` 状态的 `Promise` 对象。

    3. `Promise.all()` 只有当参数数组中的各个 `Promise` 均改变状态时，才会返回一个定型的 `Promise` 对象。否则，为 `pending` 状态的 `Promise`。
    
        - 当参数数组中所有 `Promise` 状态均为 `resolved` 时，该方法才返回一个 `resolved` 状态 `Promise` 对象。否则，返回一个 `rejected` 状态的 `Promise` 对象。

    4. `Promise.race()` 一旦参数数组中某个 `Promise` 对象的状态变为 `resolved` 或 `rejected`，该方法就会返回一个与该方法同状态的 `Promise`，并且其中包含之前 `Promise` 对象的返回值。

    5. 所有原型方法 `then`、`catch`、`finally` 返回的 `Promise` 对象的状态取决与当前方法中函数执行是否有错误抛出。

- `Promise` 对象有 `pending`，`fulfilled`（一般用 `resolved` 指代），`rejected` 三种状态，`Promise` 对象的状态改变是**不可逆的**。一旦由 `pending` 转变为另外两种状态的一种后，就无法通过任何手段再次改变状态了，并且后续生命周期将一直**保持该状态不变**。此时称为状态 `定型`。

- `then` 和 `catch` 等函数都只对**前一个** `then` 或 `catch` 返回的 `Promise` 进行**状态判断**。

- `then` 函数第一参数函数被调用时，默认向后传递一个**之前**的 `Promise` 状态的 `Promise` 对象，即继承之前的 `Promise` 状态。除非在 `then` 内部抛出一个错误，否则 `then` 传递的 `Promise` 状态将**维持不变**。

- `catch` 函数本质是 `then(undefined, onRejected)` 的**语法糖**（[ES8][es8-promise-catch]）。另外，`catch` 本意是抓住（错误），那么逻辑上讲 `catch` 本身就应该返回一个 `resolved` 状态的 `Promise` 对象，其中 `resolved` 状态表示**已经处理**了先前的 `rejected` 的 `Promise` 对象。

**技巧**：

1. 并不推荐将 `reject` 时触发的函数写为 `then` 的第二参数，推荐做法是使用 `catch()` 函数包裹。这样遵循 `链式调用` 的原则，将 `resolve` 与 `reject` 时调用的回调函数**分离**开来。

2. **不推荐**在 `catch` 中使用 `{ throw new Error(err) }` 语法，如果这样做，那么 `catch` 将返回一个 `rejected` 状态的 `Promise` 对象，那么 `catch` 后续的 `then` 将与之前的 `catch` 函数返回的 `rejected` 状态的 `Promise` 对象状态相同（因为没有定义第二参数回调），即都会返回一个 `rejected` 状态的 `Promise` 对象。即最终返回的 `Promise` 对象将是状态为 `rejected` 的 `Promise` 对象。浏览器中存在一个未捕获的 `rejected` 状态的 `Promise` 对象将导致 `rejected` 触发浏览器相关 `uncaught` 事件，并抛出 `Uncaught (in promise) ...` 错误。

3. **推荐**在 `catch` 中使用 `console.error(err)` 可达到同样效果。

[es8-promise-catch]:https://www.ecma-international.org/ecma-262/8.0/#sec-promise.prototype.catch

[promise-standard]:https://promisesaplus.com/

# Promise 链式执行

比如需要以特定顺序条件的方式请求资源的**一种**实现方式。

```js
const vue = `https://unpkg.com/vue@2.5.16/dist/vue.min.js`
const react = `https://unpkg.com/react@16/umd/react.production.min.js`
const result = []

getSomeData(vue)
  .then(res => {
    result.push(res)
    return getSomeData(react)
  })
  .then(res => { // res 是由请求 react 提供
    result.push(res)
  })
  .catch(err => {
    console.error(err)
  })
```

另外，因为 [ES8][ES7-async-function] 已经标准化了 `async` 函数，那么 `Promise` 对象的链式执行也可使用 `async` 函数。

```js
const getResult = async function () {
  const vue = `https://unpkg.com/vue@2.5.16/dist/vue.min.js`
  const react = `https://unpkg.com/react@16/umd/react.production.min.js`
  const result = []

  const vueRes = await getSomeData(vue)
  const reactRes = await getSomeData(react)

  result.push(vueRes)
  result.push(reactRes)
  return result
}
getResult()
```

这样做的好处就是，可以使用一个 `async` 函数将异步操作**封装**为一个**异步模块**。

（章节 - [async 函数](js-async-function.md)）

[ES7-async-function]:https://www.ecma-international.org/ecma-262/#sec-async-function-definitions

# Promise 浏览器支持

在不支持 `Promise` 原生对象的浏览器中可使用 [bluebird][bluebird]（[CDN][bluebird-CDN]）。该库 API 实现与原生完全相同。

[bluebird]:http://bluebirdjs.com/docs/api/new-promise.html

[bluebird-CDN]:http://www.bootcdn.cn/bluebird/

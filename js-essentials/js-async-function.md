# async 函数

`async` 函数作为 `Promise` 对象的补充：

  1. 在写法上将可以将 `callback` 组织成为**同步**形式，即内部各个 `await` 之间都是同步执行。但对于 `async` 函数外部，`async` 函数整体仍是异步执行。

      - 从写法上改善了异步操作执行顺序不直观的问题。

  2. 从功能上，将一些多个异步操作全都**封装**在一个 `async` 函数中，形成一个**独立的异步模块**。这有利于协同开发。

      ```js
      // 将所有的 ajax 封装为一个异步模块 getResult
      // async 函数内部都是同步执行
      // await 接收一个 Promise 对象
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
      // 异步模块可在任意处引用并调用该异步模块获取数据
      getResult()
      ```
      - 在 `async` 函数内，函数执行至 `await` 处会`暂停`当前 `async` 函数的执行，直到 `await` 后的 `Promise` 对象状态发生改变后恢复 `async` 函数的内部代码执行。
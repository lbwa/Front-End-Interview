# 客户端存储

常见方法：

- cookie - 请求头部的一项

  - 本身用于客户端和服务端通信（主业），但它有本地存储（副业）的功能

- localStorage（[W3C][w3c-localStorage]） - 本地存储 - 有同源限制

  - 本地存储空间只对同源地址有效，非同源情况下将会建立新的存储空间

- sessionStorage（[W3C][w3c-sessionStorage]） - 会话存储 - 有同源限制

  - 只在当前会话阶段有效的存储空间，并且刷新页面不会清空当前 `sessionStorage`

- IndexedDB（[W3C][IndexedDB]） - 本质是数据库

  - 用于存储大量结构化数据，需要维护版本等配置

## cookie

本身是作为请求头部（`Request header`）的一个选项存在，用于在每次与服务端通信时，发送信息。

- 局限性：

  - 因为它每次都会随请求发送到服务端，那么它本地存储的空间就肯定比一般存储方式要小很多（5KB）。
  - 每次 `http` 请求都会携带 `cookie` ，那么对获取资源的效率有影响
  - API 过于简单，即 `document.cookie = '...'`。使用 `cookie` 存储数据就需要先封装方法才能使用。

## localStorage

`localStorage` 和 `sessionStorage` 都遵循同源策略。非同源地址都有自己独享的本地存储空间或会话存储空间。

现阶段，`localStorage` 在大部分浏览器的容量上限是 5MB。

```js
// 保存数据
localStorage.setItem('username', 'John Wick')

// 读取数据
localStorage.getItem('username') // 'John Wick'

// 删除数据
localStorage.removeItem('username')

// 清空当前源的 localStorage
localStorage.clear()
```

localStorage 默认没有过期设置，存储了就一直存在，除非主动清理。

## sessionStorage

现阶段，`sessionStorage` 在大部分浏览器的容量上限是 5MB。

```js
// 保存数据
sessionStorage.setItem('username', 'John Wick')

// 读取数据
sessionStorage.getItem('username') // 'John Wick'

// 删除数据
sessionStorage.removeItem('username')

// 清空当前源的 sessionStorage
sessionStorage.clear()
```

`sessionStorage` 的存储空间**仅**在**当前会话**中有效，退出当前会话，即关闭窗口会重置 `sessionStorage`。重新加载页面并**不会**重置当前 `sessionStorage`。

## 拓展

ios safari 的隐藏模式下，`localStorage.getItem` 会报错。所以使用 `localStorage` 和 `sessionStorage` 最好封装在 `try ... catch` 中。

[IndexedDB]:https://www.w3.org/TR/IndexedDB/

[w3c-localStorage]:https://www.w3.org/TR/webstorage/#the-localstorage-attribute

[w3c-sessionStorage]:https://www.w3.org/TR/webstorage/#the-sessionstorage-attribute
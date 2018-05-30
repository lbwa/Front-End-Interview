# Ajax

## XMLHttpRequest

Ajax 原理如下：

```js
const xhr = new XMLHttpRequest()

// 第三个参数（Boolean）为是否异步执行请求，即待服务器响应后再继续执行 Ajax 接下来的代码
xhr.open('GET', 'https://api.github.com', true)
xhr.onreadystatechange = function () { // 异步回调
  if (xhr.readyState === 4) {
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
      console.log(xhr.responseText)
    } else {
      throw new Error(`Request was unsuccessful : ${xhr.status}`)
    }
  }
}
xhr.send(null)
```

**注**：根据最新 [xhr Standard - open() method][xhr-Standard]，主线程中的同步的 `XMLHttpRequest` 已被废弃，默认地，`open()` 方法第三参数为 `true`，即默认异步请求。

[xhr-Standard]:https://xhr.spec.whatwg.org/#the-open()-method

## 状态码

- 2XX - Success - 表示成功处理请求。如 200。

- 3XX - Redirection - 需要重定向，浏览器直接跳转。

- 4XX - Client Error - 客户端请求错误。

- 5XX - Server Error - 服务端响应错误。

## 客户端跨域

（以下是重新整理[我的博客 —— 客户端跨域解决方案][Cross-domain-solution]）

[Cross-domain-solution]:https://lbwa.github.io/2018/04/19/Cross-domain-solution/

### 跨域的定义

客户端为因安全问题，会默认**阻止解析（并不阻止请求，这也是 CORS 的原理）** Ajax 请求的非同源（请求地址的协议、域名、端口任意一项与当前页面不同）资源。即浏览器并不会阻止 Ajax 跨域请求，阻止的是解析 Ajax 跨域请求返回的数据。

![NO-CORS][No-CORS]

上图中，请求地址是非同源地址，由 `response` 可看出客户端并未阻止跨域 Ajax 请求，但是浏览器在服务端返回数据后进行 `Access-Control-Allow-Origin` 验证时，发现当前源（`http://localhost:8889`）并没有跨域权限（没有在服务端的白名单中）中，故浏览器拒绝解析服务端返回给客户端的数据，此时的客户端是已经接受了跨域请求的数据了的，只是客户端拒绝解析。

浏览器默认执行**同源策略**。即只会解析与当前源对比**同协议，同域名，同端口**的请求地址返回的数据请求。

正确在服务端配置 `CORS` 后的返回数据如下：

![Set-CORS][Set-CORS]

![Set-CORS1][Set-CORS1]

[No-CORS]:https://raw.githubusercontent.com/lbwa/Front-End-Interview/master/web-api/web-api-ajax/No-CORS.PNG

[Set-CORS]:https://raw.githubusercontent.com/lbwa/Front-End-Interview/master/web-api/web-api-ajax/Set-CORS.PNG

[Set-CORS1]:https://raw.githubusercontent.com/lbwa/Front-End-Interview/master/web-api/web-api-ajax/Set-CORS1.PNG

由上图可看出，浏览器在跨域请求后，通过验证 `Access-Control-Allow-Origin` 得到允许当前域（`http://localhost:8889`）跨域请求目标服务器（`https://api.github.com`）。

**重要**：一般情况下，浏览器并不会阻止跨域请求，但会阻止跨域请求后的数据解析。

### 客户端跨域解决方案

只有在客户端才会存在同源策略，那么可以依据此原理并结合 `HTML` 标签的 `src` 属性（如 `script`、`img`（可能有防盗链措施）、`link` 标签）不受客户端同源策略限制，得到以下客户端跨域解决方案：

- JSONP (JSON with padding)

  - 利用 `script` 标签的 `src` 属性是不受客户端同源策略限制的原理，但必须保证请求源的安全性

- 目标服务器设置 `header：Access-Control-Allow-Origin`，即服务端配置 `CORS` - **趋势**

  - 需要客户端和服务端同时支持，若客户端不支持跨域请求，那么即使服务端开启 `CORS` 也无济于事

- 中转服务器代理转发客户端请求

  - 利用只有客户端存在同源限制，服务端不存在同源限制的原理

**拓展**：

利用元素标签的 `src` 属性跨域的使用场景：

- `img` 用于统计

- `link`、`script` 用于 CDN

- `script` 用于 `JSONP`

### JSONP 实现原理

```html
<script>
window.callBack = function (data) {
  console.log(data)
}
</script>
<script src="https://example.com/api.js?jsonpCallback=callBack"></script>
<!-- src 将返回 callBack({ x: 100, y: 200 }) -->
```
前置知识：

- `HTML` 在 `src` 请求 JS 脚本后就会立即执行得到的 JS 脚本（除非设置 `defer` 属性，表示在下载 JS 同时，不阻塞 DOM 渲染，并延迟至 DOM 树建立后执行）。

- 因为浏览器会默认会将不同的 `script` (包含外联 JS 和嵌入式 JS)合并为一个模块。那么，一个 `document` 文档内的 `script` 标签中 `src` 请求的 JS 代码默认（除非设置 `type="module"` ，表示当前 JS 脚本文件是一个单独模块）都属于同一模块（都在同一个容器中）。

- `JavaScript` 中圆括号即表示函数调用，如 `fn()` 表示调用 `fn`。

示例中，`JSONP` 将返回数据作为 `callBack` 的参数返回。并且此时执行 `callBack` 调用，那么数据得以解析。进而绕过浏览器同源策略。

### JSONP 局限性

- 只支持 `GET` 请求。

- 因为是通过 `HTML` 标签的 `src` 属性来实现跨域的，那么无法验证请求数据的安全性，那么一定要保证请求域的安全性的情况下使用 `JSONP` 来实现跨域。

- 必须另外添加计时器来判断请求是否超时。

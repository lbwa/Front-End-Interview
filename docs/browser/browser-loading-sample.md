# 页面加载原理的应用

## `load` 事件和 `DOMContentLoaded` 事件的区别

### 前置

- `CSS` 文件下载 ***不阻塞*** `DOM` 树的构建与解析。但是因为浏览器是根据渲染树生成最终页面，而渲染树是由 `DOM` 树与 `CSSOM` 树合并而成，那么 `CSS` 文件的下载与解析将 ***阻塞*** 页面的渲染。

- 阻塞式 `JS` 文件（即 `blocking JS files`, 除了具有 `async` 或 `defer` 属性的 ***外联*** 脚本以外的其他形式脚本）因可能存在查询 `DOM` 树的语句，那么它一定 ***阻塞*** `DOM` 树的解析构建进程。

    - `async` 或 `defer` 属性只对外联脚本生效。

    - JS 下载执行的优先级高于 `DOM` 树的解析生成是出于避免 `DOM` 树的构建冲突，并且 ***一次性***（可与 `CSSOM` 的下载构建优先级高于 JS 脚本执行做对比。） 构建出 `DOM` 树的目的。

    - 阻塞式 `JS` 脚本执行之前，其中可能包含查询 `CSSOM` 的语句，那么阻塞式 `JS` 脚本执行一定是在 `CSSOM` 下载并完成构建之后。

    - 阻塞式脚本文件对于 `DOM` 与 `CSSOM` 是不同的优先级，这是浏览器的实现，即可理解为 `DOM < blocking JS` 和 `CSSOM > blocking JS`，但 `DOM` 与 `CSSOM` 二者之间不具有可比性。

### Load 事件

`load` 事件（触发时机：[HTML5 whatwg][whatwg-l] 和 [W3C 5.3 草案][w3c-draft-l] ）表示当前页面的 **全部** 依赖资源加载完时成才会触发事件，包括图片、视频等一切依赖。

### DOMContentLoaded 事件

`DOMContentLoaded`（触发时机：[HTML5 whatwg][whatwg-d] 和 [W3C 5.3 草案][w3c-draft-d] ）表示在 DOM 树**建立**完成后就会触发，无需等待**样式表**（[MDN][MDN-d]和 `JS 高程 p390`）、图像等外部资源加载完成。

值得注意的是，当 `HTML` 中包含阻塞式 `JS` 脚本时，`DOMContentLoaded` 需要等到 `HTML` 中阻塞式脚本执行完成后触发，而阻塞式脚本执行的时机 ***一定*** 是在 `CSSOM` 构建完成之后。

1. 当 `HTML` 中不存在阻塞式脚本时，那么 `DOMContentLoaded` 在 `DOM` tree 被解析构建完成时触发，而不用等待其他如 `CSS` 等依赖的下载解析完成。

2. 当 `HTML` 中存在阻塞式脚本时，那么 `DOMContentLoaded` 一定是在 JS 脚本执行之后触发，而 JS 可能包含查询 `CSSOM` 的语句，那么阻塞式 JS 脚本必须阻塞至 `CSSOM` 构建完成之后执行（与 `DOM` 的暂停解析不同，`CSSOM` 的解析构建优先级高于阻塞式 JS 执行）。那么此时， `DOMContentLoaded` 触发的时机一定是在 `CSSOM` 完成构建，且阻塞式脚本已经执行完成时（[google web fundamentals]）。

### 事件目标的区别

`load` 事件在 `window` 和 `document` 对象上触发。

`DOMContentLoaded` 事件在 `document` 对象上触发。

### Reference

- [google web fundamentals]

- [再谈 DOMContentLoaded ]

[google web fundamentals]:https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp#adding_javascript_and_css_into_the_mix

[再谈 DOMContentLoaded ]:http://blog.51cto.com/zhoulujun/2118990

## 从输入 `url` 到得到 `HTML` 的详细过程

1. 浏览器根据 `DNS` 服务器（本地 `DNS` 优先级最高）得到域名的 `IP` 地址

2. 向该 `IP` 的服务器发送请求（`http` 或 `https`）

    - `HTTP/HTTPS` 协议（[My blog][http-protocol]）

3. 服务端接受请求，处理之后并返回请求

4. 客户端得到服务端返回的内容

[whatwg-l]:https://html.spec.whatwg.org/multipage/indices.html#event-load

[w3c-draft-l]:https://w3c.github.io/html/single-page.html#eventdef-global-load

[whatwg-d]:https://html.spec.whatwg.org/multipage/parsing.html#the-end

[w3c-draft-d]:https://w3c.github.io/html/single-page.html#the-end

[MDN-d]:https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded

[http-protocol]:https://lbwa.github.io/2018/06/06/180606-http-protocol/

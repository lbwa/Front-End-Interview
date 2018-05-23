# 页面加载原理的应用

## `load` 事件和 `DOMContentLoaded` 事件的区别

- 触发条件的区别

`load` 事件（触发时机：[HTML5 whatwg][whatwg-l]和[W3C 5.3 草案][w3c-draft-l]）表示页面的**全部**资源加载完成才会触发事件，包括图片、视频等。

`DOMContentLoaded`（触发时机：[HTML5 whatwg][whatwg-d]和[W3C 5.3 草案][w3c-draft-d]）表示在 DOM 树**建立**完成后就会触发，无需等待**样式表**（[MDN][MDN-d]和 `JS 高程 p390`）、图像等外部资源加载完成。

- 事件目标的区别

`load` 事件在 `window` 和 `document` 对象上触发。

`DOMContentLoaded` 事件在 `document` 对象上触发。

## 从输入 `url` 到得到 `HTML` 的详细过程

1. 浏览器根据 `DNS` 服务器得到域名的 `IP` 地址

2. 向该 `IP` 的服务器发送请求（`http` 或 `https`）

3. 服务端接受请求，处理之后并返回请求

4. 客户端得到服务端返回的内容

[whatwg-l]:https://html.spec.whatwg.org/multipage/indices.html#event-load

[w3c-draft-l]:https://w3c.github.io/html/single-page.html#eventdef-global-load

[whatwg-d]:https://html.spec.whatwg.org/multipage/parsing.html#the-end

[w3c-draft-d]:https://w3c.github.io/html/single-page.html#the-end

[MDN-d]:https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded

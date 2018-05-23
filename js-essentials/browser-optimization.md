# web 性能优化

## 原则

- 多使用内存、缓存或其他方法

- 减少 CPU 计算、减少网络请求，减少 I/O（存储器读写）

## 核心

- 加载页面和静态资源的速度

- 页面渲染

## 加载资源的优化

- 静态资源的压缩合并。

  - 一般通过构建工具（如，`webpack`）来合并模块。

```html
<script type="text/javascript" scr="a.js">
<script type="text/javascript" scr="b.js">

<!-- 合并为 -->
<script type="text/javascript" scr="bundle.js">
```

- 使用 `CDN` 让资源加载更快。

- 静态资源缓存。浏览器默认策略是在静态资源名称**未改变**的情况下，**优先**使用缓存。

  - 通过连接名称控制缓存，如对样式表设置只有内容改变的时候，浏览器才会请求新的样式表。此处，可联系 `webpack` 中的静态资源输出名称 `[name]-[hash:8].[ext]`（`[ext]` 表示文件后缀名）、`[chunkHash:8].js`、`[contentHash:8].js`等。

- 使用 `SSR` 服务端渲染，数据直接输出到 `HTML` 中（[示例仓库 vue-ssr][vue-ssr]）。

  - 使用 `SSR` 必须有强大的服务端支持，因为 `SSR` 将会给服务端带来更大的压力。

  - 原本 `HTML` 是先被解析，后填充 `Ajax` 请求返回的数据。`SSR` 将直接在服务端填充数据，返回给客户端填充好数据的 `HTML` 文档。

## 渲染优化

- CSS 放在 `head` 标签中，外部 JS 文件放在 `body` 标签的结尾处。

- 外部图片资源懒加载，下拉加载更多。

```html
<!-- img 默认显示默认图像 -->
<img id="pic" src="default.png" alt="img" data-src="https://example.com/a.png">

<!-- 图像懒加载 -->
<script>
  const img = document.querySelector('#pic')

  // 判断进入视口内，替换 src 属性
  img.src = img.getAttribute('data-src')
</script>
```

- 减少 DOM 查询，对 DOM 查询结果做缓存。

```js
// targets 缓存了元素数组，对目标元素组只有一次查询
const targets = document.querySelectorAll('.target')
const len = targets.length

for (let i = 0; i < len; i++) {
  // ...
}
```

- 减少 DOM 操作，多个操作尽量合并在一起执行。

```js
const list = document.querySelector('ul.target')
const fragment = document.createDocumentFragment()

for (let i = 0; i < 5; i++) {
  const li = document.createElement('li')
  // ...
  fragment.appendChild(li)
}

// 多次 li 元素插入改为一次插入一个包含目标个数的 li 元素的文档片段
list.appendChild(fragment)
```

- 可能频繁被调用的事件（如 `input` 事件、`resize` 事件等以高频率触发的事件）回调函数使用防抖与节流（[我的博客][debounce and throttle]）

- 尽早执行操作，如在 `DOMContentLoaded` 事件执行操作，那么此时留给操作的活动时间一定长于 `loaded` 事件。

[vue-ssr]:https://github.com/lbwa/vue-ssr

[debounce and throttle]:https://github.com/lbwa/lbwa.github.io/issues/10
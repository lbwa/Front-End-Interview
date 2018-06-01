# 事件绑定

## 通用事件绑定

```js
/**
 * 通用事件绑定
 * 
 * @param {Element} el 事件处理程序所在元素
 * @param {String} type 事件类型
 * @param {Function} fn 事件处理程序
 * @param {String} [proxy=null] 被事件委托的元素，即 proxy 上的事件将冒泡到 el 上触发监听程序
 * @param {boolean} [capture=false] 是否于捕获阶段触发事件处理程序
 */
function bindListener(el, type, fn, proxy = null, capture = false) {
  // 长单词无法在代码压缩时被压缩，使用工厂函数 bindListener 代替每次 addEventListener 的调用
  el.addEventListener(type, function (evt) {
    const target = evt.target

    // Element.matches(string) 如果元素 Element 被指定的选择器字符串 string 选择，该方法返回 true
    // 即使用 matches 方法判断 target 是否是目标元素，而不是使用 evt.target.className === 'app' 等方法判断
    if (proxy && target.matches(proxy)) {

      // 指定 this 对象就相当于在 target 上调用 fn 监听程序，就相当于在 target 设置了监听程序
      fn.call(target, evt)
    } else {
      // target 为非委托（被代理）元素
      fn(evt)
    }
  }, capture)
}

const el = document.querySelector('.target')
bindListener(el, 'click', evt => {
  evt.preventDefault() // 阻止 type 事件的默认行为
  evt.stopPropagation() // 阻止 type 事件进一步传播（如冒泡）
  console.log('activate listener')
})
```

## 事件冒泡

DOM2 级事件流，分为事件捕获阶段、处于目标阶段、事件冒泡阶段。事件捕获阶段不会涉及事件目标。

事件冒泡是指事件由最具体的元素接收后，然后逐级向上**沿 DOM 树**，传播到顶层 document 节点。

`event.stopPropagation()` 可阻止事件的进异步传播。

## 事件委托（代理）

事件委托利用**事件冒泡**原理，只使用一个事件处理程序监听所有子节点的所有同类事件。

``` html
<body>
  <div class="app">
    <p class="area-1">area 1</p>
    <p class="area-2">area 2</p>
  </div>
  <script>
    const target = document.querySelector('.app')
    target.addEventListener('click', evt => {
      const target = evt.target
      // do something
    }, false)
  </script>
</body>
```

示例中，app 所有的后代节点的 click 事件都将触发 app 的 listener。

### 事件委托优势

- 代码简洁

- 减少内存占用

### 事件委托的应用

- 无限加载时，被加载元素的事件监听。新加入的子元素不用添加事件监听程序，转而在父容器元素监听所有子元素的某类事件。
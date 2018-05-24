# DOM

## DOM 含义

`DOM` 的数据结构（计算机中存储、组织数据的方式）属于树（`Tree`）结构。

`HTML` 本质是字符串，浏览器将 `HTML` 解析为一种树状结构模型（`model`），即 `DOM` 树。

`DOM` 节点本质上是一个可被操作的 JS 对象（`Object` 的实例）。

在 `DOM` 节点中，对象的本身的属性称为 `property`，节点（`HTML` 标签）的属性称为 `attribute`。

``` js
const p = document.querySelectorAll('p') // 类数组集合

// property
p.length

// attribute
p[0].style.color
```

## DOM 操作

```js
// 创建节点，参数均为字符串类型
document.createElement(节点名) // Element 类型节点，即 HTML 元素
document.createTextNode(文本节点内容) // Text 类型节点，即文本节点

const p = document.querySelector('p')

// 父节点
p.parentNode // 优先使用 parentNode，而非 parentElement

// 子节点
p.childNodes // 包含 Text 类型节点（标签之间空白算做文本节点）的类数组合集，即包含文本节点和元素即节点的合集。
p.children // 只包含 Element 类型节点（即只有 HTML 元素）的类数组合集，即不包含文本节点的合集。

// 移除子节点
p.removeChild(node)

// 新增子节点
p.appendChild(node) // 在 childNodes 最后插入新的节点作为 p 的子节点
p.insertBefore(newNode, referenceNode) // 在 referenceNode 前插入 newNode，作为 p 的子节点

// 克隆节点
const newP = p.cloneNode(deep) // deep 为是否深克隆，即是否克隆子节点和 DOM0 级事件监听程序。最后得到 p 节点的一个副本。
```

注：

1. DOM0 级事件处理程序指类似 `onclick` 定义的处理程序。在深克隆节点时，只克隆在属性中定义的 DOM0 级事件处理程序，即`onclick="console.log(a)"`会被深克隆，`onclick=fn`是不会被深克隆。`addEventListener` 定义的事件处理程序属于 DOM2 事件处理程序，是不会被 `cloneNode` 方法克隆的。

2. 直接复写节点的 `innerText` 属性，可直接复写节点的文本节点。

3. 直接复写节点的 `innerHTML` 属性，可直接复写节点的所有子节点。

4. 直接复写节点的 `outerHTML` 属性，可直接复写节点的所有子节点及其自身（`Vue.js` 中的挂载功能）。

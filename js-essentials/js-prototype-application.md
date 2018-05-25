# 原型的实际应用

- 在 jQuery 和 zepto 的原型应用

```js
// jQuery
const ele = $('.target')
ele.css('color', 'red') // true
ele.html() // true

// 在 ele 的原型链上是否存在 css 和 html 属性
'css' in ele // true
'html' in ele // true

// zepto.js 中是与 $.fn 全等
ele.__proto__ === $.prototype // true
// ele 是构造函数 jQuery 对象（别名为 $）的实例
ele instanceof jQuery // true

ele.hasOwnProperty('css') // false
ele.hasOwnProperty('html') // false

// css 是 jQuery 构造函数的原型方法
ele.__proto__.hasOwnProperty('css') // true

// html 是 jQuery 构造函数的原型方法
ele.__proto__.hasOwnProperty('html') // true
```

```js
// zepto
(function (window) {
  const zepto = {}

  // Zepto 构造函数，实例化后得到一个对象
  function Z (dom, selector) {
    const len = dom ? dom.length : 0
    for (let i = 0; i < len; i++) {
      // this 即为 $(selector) 的返回结果（一个对象）
      this[i] = dom[i]
      this.length = len
      this.selector = selector || ''
    }
  }

  zepto.Z = function (dom, selector) {
    /**
     * 1. 关键点：与 jQuery 的不同之处，Zepto 在此处实例化
     * 2. 不同于 jQuery 中直接暴露构造函数 jQuery（别名 $），zepto.js 中 $ 并非构造
     * 函数对象，而是在内部构实现构造函数 Z，不直接向外部暴露构造函数
     */
    return new Z(dom, selector)
  }

  zepto.init = function (selector) {
    // 此处为 Zepto.js 中的逻辑简化
    // const slice = Array.prototype.slice
    // const dom = slice.call(document.querySelectorAll(selector))
    const dom = Array.from(document.querySelectorAll(selector))
    return zepto.Z(dom, selector)
  }

  // $(selector) 本质就是构造函数 Z 的一个实例
  const $ = function (selector) {
    return zepto.init(selector)
  }

  window.$ = $

  // Zepto 原型对象
  $.fn = {
    // constructor: zepto.Z 呼应后面的 zepto.Z.prototype = $.fn
    constructor: zepto.Z,
    css: function (key, value) {},
    html: function (value) {},
    // ...
  }

  // Z 的显式原型对象对外暴露的接口是 $.fn
  // 复写构造函数 Z 的原型
  // zepto.Z.prototype = Z.prototype 阻止外部访问 Z，$.fn.constructor 将返回 zepto.Z 函数
  zepto.Z.prototype = Z.prototype = $.fn

  // 内部 zepto 对象对外暴露的接口是 $.zepto
  $.zepto = zepto
})(window)

// $(selector) 返回一个内部构造函数 Z 的实例其中包含选择器的 结果项，长度，选择器 组成的类数组对象
const ele = $('.target') // { 0: div.target, length: 1, selector: '.target' }
!!ele.css // true
!!ele.html // true

// 在 ele 的原型链上是否存在 css 和 html 属性
'css' in ele // true
'html' in ele // true

// 不同于 jQuery，zepto.js 中 $ 并非构造函数对象
// 可对比使用 jQuery 时，ele.__proto__ === $.prototype 为 true
// 判断 $.fn 是否指向构造函数 Z 的原型对象
ele.__proto__ === $.fn // true

// Z 实例本身不具有 css 和 html 等方法
ele.hasOwnProperty('css') // false
ele.hasOwnProperty('html') // false

// 构造函数 Z 的原型对象上有所有实例共享的方法 css 和 html
ele.__proto__.hasOwnProperty('css') // true
ele.__proto__.hasOwnProperty('html') // true
```

- jQuery 中如何使用原型

- zepto 如何使用原型

# 原型对象的拓展性
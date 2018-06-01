# 原型的实际应用

以下简要叙述 `jQuery` 和 `zepto` 中的原型应用。

前置知识：

- 构造函数实例化时将生成一个**新对象**（章节 - [描述 new 的实例化过程][new-instance]）

[new-instance]:https://lbwa.github.io/Front-End-Interview/js-essentials/js-prototype.html#描述-new-的实例化过程

## jQuery 和 zepto 中的原型应用

- jQuery 中如何使用原型

```js
(function (window) {
  // jQuery 是真正的构造函数 init 的一个实例
  // jQuery 在一开始就进行了实例化
  const $ = jQuery = function (selector) {
    return new jQuery.fn.init(selector)
  }

  // 重写构造函数 init 的实例的原型对象
  /**
   * 1. 重写构造函数原型对象和经由 $.fn 来重写原对象的原因都是在于规范构造函数的功能拓展
   * 2. 因为不对外暴露构造函数，那么外部拓展原型对象，只能通过 $.fn 来拓展
   */
  jQuery.fn = jQuery.prototype = {
    // 因为 jQuery 变量是 jQuery.fn.init 的实例，那么此处指明了 $ 的 constructor 为 jQuery
    constructor: jQuery,
    css: function (key, value) {
      return `Simulate function named css`
    },
    html: function (value) {
      return `Simulate function named html`
    }
    // ...
  }

  // jQuery 库的构造函数 init（简化）
  // jQuery 在构造函数中进行类数组 nodeList 的转换，zepto 则是分离操作
  const init = jQuery.fn.init = function (selector) {
    const dom = Array.from(document.querySelectorAll(selector))
    const len = dom ? dom.length : 0
    for (let i = 0; i < len; i++) {
      this[i] = dom[i]
    }
    this.length = len
    this.selector = selector || ''
  }

  /**
   * 1. 重写 jQuery 的构造函数 init 的原型对象，并且 constructor 指向 jQuery
   * 2. 结合 jQuery.fn = jQuery.prototype 和 constructor: jQuery 可知，对于外部，
   * jQuery 是构造函数，对于内部，真正的构造函数是 init。对于外部，所有的共享方法在
   * jQuery 的原型对象上，对于内部，因为下面赋值，那么所有的的共享方法也在 init 的原型
   * 对象上。也就是说实例 jQuery 与构造函数 init 共用一个原型对象
   */
  init.prototype = jQuery.fn // jQuery.fn = jQuery.prototype

  window.$ = window.jQuery = jQuery
})(window)
```

实例如下：

```js
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

- zepto.js 如何使用原型

```js
(function (window) {
  const zepto = {}

  // zepto.js 构造函数，实例化后得到一个对象
  function Z (dom, selector) {
    const len = dom ? dom.length : 0
    for (let i = 0; i < len; i++) {
      // this 即为 $(selector) 的返回结果（一个对象）
      this[i] = dom[i]
    }
    this.length = len
    this.selector = selector || ''
  }

  zepto.Z = function (dom, selector) {
    /**
     * 1. 关键点：与 jQuery 的不同之处，Zepto 在此处实例化
     * 2. 不同于 jQuery 中直接暴露构造函数 jQuery（别名 $），zepto.js 中 $ 并非构造
     * 函数对象，而是在内部构实现构造函数 Z，因为后文有 Z.prototype = $.fn 直接重写了
     * Z 的原型对象，那么先前的 constructor 属性已经丢失，且重写后的原型中指定
     * constructor 为 zepto.Z，那么外部是无法访问构造函数 Z 的
     */
    return new Z(dom, selector)
  }

  // zepto 将变量 dom 由类数组 nodeList 转换为真正的数组的操作与构造函数是分离的，
  // jQuery 则都在构造函数中进行
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

  // Zepto 原型对象
  /**
   * 1. 重写构造函数原型对象和经由 $.fn 来重写原对象的原因都是在于规范构造函数的功能拓展
   * 2. 因为不对外暴露构造函数，那么外部拓展原型对象，只能通过 $.fn 来拓展
   */
  $.fn = {
    // constructor: zepto.Z 呼应后面的 zepto.Z.prototype = $.fn
    constructor: zepto.Z, // Z.prototype.constructor 将返回 zepto.Z 而不是 Z，也不是对外接口 $
    css: function (key, value) {
      return `Simulate function named css`
    },
    html: function (value) {
      return `Simulate function named html`
    },
    // ...
  }

  // Z 的显式原型对象对外暴露的接口是 $.fn
  // 重写构造函数 Z 的原型
  // $.fn.constructor 将返回 zepto.Z 函数，因为 $.fn 中已经指定 constructor
  zepto.Z.prototype = Z.prototype = $.fn

  // 内部 zepto 对象对外暴露的接口是 $.zepto
  $.zepto = zepto
  window.$ = $
})(window)
```

实例如下：

```js

// $(selector) 返回一个内部构造函数 Z 的实例其中包含选择器的 结果项，长度，选择器 组成的类数组对象
const ele = $('.target') // { 0: div.target, length: 1, selector: '.target' }
ele.css() // Simulate function named css
ele.html() // Simulate function named html

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

## 总结

- 二者实现原型链应用方面的差异

  - `zepto.js` 在外部无法访问构造函数 `Z`，只能访问到内部实例化方法 `zepto.Z`（关键点在于重写原型时的 `constructor` 属性）

  - `jQuery` 向外部暴露与真正构造函数 `init` 共用一个原型对象的实例对象 `jQuery` 接口，并非暴露真正构造函数 `init`

- 二者实现原型链应用方面的共同点

  - 直接在内部以**对象字面量**形式（对象字面量是**重写**原型对象，原来的原型对象将丢失）重写内部真正构造函数的原型对象，该原型对象包含了所有实例共有的一些方法（如 DOM 操作等）。

在调用二者相同的实例化方法 `$(selector)` 后，此时的实例就已经可以使用内部构造函数的原型方法了。

# 原型对象的拓展性（插件机制） —— 重要

（以下 `$` 指代在 `jQuery` 中的 `jQuery` 和 `$`，在 zepto.js 中的 `$`）

```js
// 以 jQuery 为例，zepto.js 同理
jQuery.fn = jQuery.prototype = {
  // ...
}

// jQuery 中拓展插件
jQuery.fn.getNodeName = function () {
  return this[0].nodeName
}

// 将拓展后的原型对象重写为内部构造函数 init 的原型对象
// 在实例化 init 后（即调用 $(selector)），即可使用插件
init.prototype = jQuery.fn
```

二者将新的原型对象先赋值给 `$.fn` 的原因就是在于赋值后可拓展插件，即 `$.fn` 相当于是对外可**拓展插件的接口**。

- 通过 `$.fn` 拓展插件而不直接重写构造函数原型的原因（优势）

    - 在模块外部二者均未暴露内部构造函数，只暴露了实例化方法 `$` 变量，保证了对全局变量的最小影响，同时又不影响拓展构造函数原型对象。而且外部也不用关心内部的构造函数的实现。（减小污染）

    - 将拓展插件功能统一在 `$.fn` 接口上，方便管理（集中接口）

## 总结

原型对象的拓展性对后续的库的拓展性开发，SDK 封装等都是非常重要的一个**核心点**。

为了拓展性需要建立一个新的对象重写构造函数的原型对象，因为不对外暴露构造函数，只能通过这个新的对象作为实例化方法的一个属性（拓展接口）向外暴露，以达到拓展构造函数原型对象的目的。

- 如何拓展库的原型对象（定义库的拓展性）？

    - 内部实现：在模块内部中，在重写构造函数对象之前，先将新的原型对象赋值给 `$.extend` 接口，再由 `$.extend` 重写内部构造函数的原型对象。这样保证了在重写之前就已经拓展了库的插件。

    - 外部体现：对外**只暴露**实例化方法（如 `jQuery` 中暴露 `$(selector)` 实例方法）的变量 `$`，以该变量的某一属性定义为插件接口（此处自定义 `$.extend` 指代该接口），通过该外部接口来修改内部构造函数原型对象，同时保证构造函数的私有化。

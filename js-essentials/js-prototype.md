# 原型和原型链

## 原型

所有 **对象** 都有一个隐式原型（`__proto__` 属性），所有 **非箭头函数的函数** 都有一个显式原型（[prototype][yx-prototype] (ES2019) 属性，显式原型是 **非箭头函数的函数独有**，在创建函数时，被创建。）。所有引用类型的隐式原型指向他的 **构造函数的** 显式原型。构造函数的显式原型作用在于存储所有当前构造函数的所有实例可共享的方法和属性。

```js
const obj = {} // const obj = new Object()
obj.__proto__ === Object.prototype // true

const fn = function () {} // const fn = new Function()
fn.__proto__ === Function.prototype // true
fn.prototype.__proto__ === Object.prototype // true

Object.prototype.constructor === Object // true，指向原型对象所在的构造函数
Object.prototype.__proto__ === null // true，指向 Object.prototype 的构造函数的原型对象

Function.__proto__ === Function.prototype // true，Function.__proto__ 指向自身原型对象
```

**注**：箭头函数**没有** `prototype` 属性。

[yx-prototype]:https://tc39.github.io/ecma262/#sec-terms-and-definitions-prototype

## 原型链

一个引用类型实例在被调用自身不存在的属性或方法时，将会通过实例的 `__proto__` 属性继续查找（或理解为在构造函数的原型对象中查找，因为 实例的 `__proto__` 和该实例的构造函数的 `prototype`，它们引用的是同一对象。）。当在当前实例的构造函数的原型对象中仍未找到目标属性（方法）时，此时将该构造函数的原型对象看作**另一个实例**（抽象为一个对象整体），继续通过 `__proto__` 向上一级构造函数的原型对象查找，直至 `Object.prototype` 或目标属性（方法）被找到。

## 原型链的的简单应用

```js
class Ele {
  constructor (id) {
    this.ele = document.querySelector(id)
  }

  html (val) {
    const ele = this.ele
    if (val) {
      ele.innerHTML = val
      return this // 链式操作 功能
    } else {
      return ele.innerHTML
    }
  }

  on (type, fn, capture = false) {
    const ele = this.ele
    ele.addEventListener(type, fn, capture)
  }
}

const app = new Ele('#app')
app.html()
app.html('<p>Pure JavaScript</p>').on('click', () => console.log('click element'))

// 子类 SuperEle 继承父类 Ele
class SuperEle extends Ele {
  constructor (id) {
    // 子类中必须调用 super() 以调用父类的 constructor()
    super(id)
  }

  replace (val) {
    const ele = this.ele
    if (val) {
      ele.outerHTML = val
      return this
    } else {
      return ele.outerHTML
    }
  }
}

const app1 = new SuperEle('.target')

// 调用 Ele 原型上的方法
app1.html()

// 调用 SuperEle 原型上的方法
app1.replace('<p>I am SuperEle instance</p>')
```

对于原型链继承的应用详细介绍，可查看章节 [class 章节 class 继承](js-class.md) 。

## 依照原型对象和原型链拓展的知识点

### 检测原型对象

```js
obj instanceof Object // 检测 obj 是否是 Object 的实例

Object.prototype.isPrototypeOf(obj) // 检测 Object.prototype 是否是存在于 obj 的原型链上
```

`instanceof` 是基于构造函数的原型对象的检测，即 `obj.__proto__` 向上查找是否存在 `Object.prototype`。

### 枚举键名

```js
for (let key in obj) {} // 包含原型链中可枚举属性

Object.keys(obj) // 只枚举实例自身可枚举属性，不包含原型链中可枚举属性

Object.getOwnPropertyNames(obj) // 只枚举实例自身所有属性，包含不可枚举属性

obj.hasOwnProperty('name') // 检测 name 属性是否是 obj 对象的实例属性
```

在默认情况下，除使用 `Object.defineProperty` 特别指定属性描述符外，开发人员定义的属性都是可枚举属性。

`Object.keys(obj)` 和 `Object.getOwnPropertyNames(obj)` 返回实例键名组成的数组。

### 描述 new 的实例化过程

1. 创建一个新对象，此时对象为空；

2. 将构造函数和的作用域（this 对象引用）赋给新对象；

3. 执行构造函数中的代码（目的是为了给这个新对象添加属性）；

4. 返回新对象。

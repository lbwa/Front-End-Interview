# 回顾和强化 JavaScript 基础知识

本文主要内容是梳理和强化自己在学习前端过程中的 JavaScript 基础知识，以为将来的面试做准备。

# 思考原则

1. 微观考点（现象）

透过现象看本质，通过面试题，首先想到的是，考点是什么。

2. 宏观知识（本质）

通过该面试题，推广到的宏观知识点是什么，及其基本解决思路是什么。以有限的精力时间应对无尽的题目。

3. 回归微观，拓展题目（拓展）

由宏观知识点拓展的其他相关知识点是什么，以及他们的基本解决思路是什么。由题目到知识再到题目。

# 标准

JavaScript 基础语法和规则：ECMA 262 标准（[最新版本][ecma262]、[草案][ECMA262-草案]），其中**只**包含 JavaScript 最基础的语法规则和实现原理。

JavaScript Web API：W3C 标准（[最新版本][w3c]、[草案][W3C 草案]），其中包含 DOM、BOM、事件绑定、Ajax 请求、存储等只针对浏览器客户端的 Web API。

以上两个标准互不重合。

注：Node.js 同样遵循 ECMA 262 标准，但它的 Server API 有其他的实现标准。

[ecma262]:https://www.ecma-international.org/ecma-262

[w3c]:https://www.w3.org/TR/html5/webappapis.html#webappapis

[ECMA262-草案]:https://tc39.github.io/ecma262/#sec-intro

[W3C 草案]:https://w3c.github.io/html/single-page.html#introduction

# JS按存储方式区分变量类型

JS按存储方式区分变量类型可分为 **基础类型值** 和 **引用类型值**。可抽象为每个（不论是否相等）基础类型值都在内存中开辟了一个新的区域存储值，每个 **相等** 引用类型值都是引用的 **同一个** 内存存储区域中的值。

```js
// 基础类型值
const a = 10
const b = a // 此时，a 和 b 均开辟了一个新的内存区域存储值

// 引用类型

// 创建一个新的内存区域存储该对象，并创建一个指针指向该对象，将该指针赋值给变量 a。
const c = { sum: 20 }
// 此时，a 和 b 是指向同一内存区域中的值，他们之间的赋值行为本质是赋值的指针，而非复制对象。
const d = c
```

ES 标准中称指向对象的指针（亦可称为对象的引用）为 [accessor property][js-type]。不论称作指针还是引用，要记住的是变量存储的不是真正的引用类型值，而是存储的是读取引用类型值的一种读取途径。

此处，可拓展为 a 和 b 的值的修改是 **互不影响** 的。但是，变量 c 和 d 的某个变量值（对象）的 **属性** 变化（修改或增加或删除）是 **相互影响** 的。

## 常用检测值类型的方法

`typeof` 仅可区分基本类型值和 `'object'` 和 `'function'`。

`a instanceof B` 用于检测对象 a 的原型链是否包含构造函数 B.prototype，一般情况下，检测某个对象是否是构造函数的实例。

`Object.prototype.toString.call` 是精确检测某个值的类型。

[js-type]:https://tc39.github.io/ecma262/#sec-object-type

## null 为原始类型值

[null][null-null] 表示空指针，错误的对象引用。

> 4.3.12 null value
>> primitive value that represents the intentional absence of any object value

在一般情况下会出现以下奇怪情况：

```js
typeof null // object
```

查阅 [ES2019][null-ES2019]和[ES8][null-ES8]，可知，`null` 值为 **原始类型值**，并非引用类型值。

> member of one of the types Undefined, Null, Boolean, Number, Symbol, or String as defined in clause 6

另有以下验证：

```js
null instanceof Object // false
```

[null-null]:https://tc39.github.io/ecma262/#sec-null-value

[null-ES2019]:https://tc39.github.io/ecma262/#sec-primitive-value

[null-ES8]:https://www.ecma-international.org/ecma-262/8.0/#sec-primitive-value

### 除一种情况外，其他情况均使用全等符号

```js
obj.a == null

//相当于
obj.a === null || obj.a === undefined
// 这是 jQuery 中的写法
```

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

一个引用类型实例在被调用自身不存在的属性或方法时，将会通过实例的 `__proto__` 属性继续查找（或理解为在构造函数的原型对象中查找，因为 实例的 `__proto__` 和该实例的构造函数的 `prototype`，它们引用的是同一对象。）。当在当前实例的构造函数的原型对象中仍未找到目标属性（方法）时，此时将该构造函数的原型对象看作另一个实例，继续通过 `__proto__` 向上一级构造函数的原型对象查找，直至 `Object.prototype` 或目标属性（方法）被找到。

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
```

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

# 变量提升

## 现象

当变量使用 [var][declarations-var] 声明时，在执行当前作用域内（此时，因为 `var` 关键字的特性，仅需区分全局或函数作用域，而不是代码块。）的代码之前，会首先将作用域内所有 `var` 关键字所声明的变量提前到当前作用域的最前处统一声明，且 **初始化** 为统一值 `undefined`。

## 函数声明提升

使用 `function` 关键字声明函数（另外，函数表达式中，函数本身并不提升）时，存在与 `var` 关键字同样的声明提升现象。特别地，函数声明提升的优先级 **高于** 变量提升的优先级。

```js
console.log(test) // function test () {}
var test = 1 // test 变量被覆盖，最终该作用域内的 test 变量将存储基本类型值 1
function test () {}
```

另外，只有函数声明存在提升现象，函数表达式函数体不会被提升。

## 拓展

ES6 之后的 [let][declarations-let-const] 和 [const][declarations-let-const] 他们都是不存在声明提前的。即只能在使用 `let` 和 `const` 关键字声明变量之后才能使用该变量，之前的区域称为暂时性死区。

对变量提升的理解可拓展为对作用域的理解。

# 作用域

作用域限定了变量的有效范围。ES6 之前（不包含 ES6），`JavaScript` 中只有函数和全局作用域。ES6 之后，`JavaScript` 有函数、全局和**块级作用域**。

块级作用域因 `let` 和 `const` 声明变量而出现，它**只**对 `let` 和 `const` 声明的变量有效。常见块级作用域有大括号内的区域，for 循环中的小括号区域，即条件区域。

当变量使用 [var][declarations-var] 声明时，分为函数体内和全局作用域两种情况。在函数体内使用 `var` 声明的变量只能在该函数体内使用，外部是无法调用该函数体内的声明变量。在全局作用域内声明的变量，可在任意位置调用。

当给一个变量赋值时，若之前未使用 `var`、`let`、`const` 之一的关键字显式声明该变量，那么该变量将默认隐式声明为全局变量。

为了规范变量的有效范围，防止变量提升（因为极易造成混乱，遵循 `先声明后调用` 的原则有利于后期维护。），ES6 定义了新的变量声明方式 —— `let` 或 `const`。由它们所定义的变量只能在声明时的代码块（**块级作用域**）内（即声明时所在的大括号内）使用。即使得变量只会出现在它们应该出现的区域。二者的不同是 `let` 声明的是初始化后**可被修改**的变量，`const` 声明的是初始化后**不可被修改**的变量（`constant variable`）。

## 作用域链

原则：后代作用域能够访问在祖先作用域声明的变量，反之，不成立。

原理：在 `JavaScript` 中，当调用某个变量时（示例为 a），首先会找到当前被调用变量的声明，并且搜索始于当前作用域。在当前作用域内未找到 a 变量的声明时，会继续向上级父作用域搜索变量 a 的声明，依照这个规律直至变量 a 的声明被找到或搜索完全局作用域。这即是 `JavaScript` 中的作用域链的执行原理。

特别地，浏览器对于函数声明的处理如同处理 `var` 声明变量时一样（仅有函数内声明或全局声明），那么调用函数时的查找函数声明的原理同上。另外，函数的父级作用域是**定义时**的就已经确定的，而不是调用时确定。

使用 `let`和 `const` 声明变量，会形成块级作用域，那么使用他们声明变量优于使用 `var` 声明变量。因为他们更严格的限制了变量的有效范围，并形成了更为严格的作用域链，避免了因变量提升和非块级作用域导致的变量意外覆盖。那么这使得代码的健壮性得到大大提高。

## 闭包
> 自由变量
> 作用域链
> 闭包的两个场景

闭包即是对作用域理解的实际应用。

**重要（应用闭包的原理）**：

1. 闭包的父级作用域因与闭包关联（二者至少有一个联系，如一个变量引用）而得以保存。

2. 闭包的父级作用域在**创建**（而非调用）闭包时确定。

闭包的本质是一个函数，它是一个有权访问其他函数作用域的函数（出自 `JavaScript 高级程序设计`）。

通常情况下，函数在执行完成后，弹出调用栈，那么该函数内部的变量和作用域都将被销毁。但是，执行完该函数（指定为 a）返回一个函数（即返回一个闭包，或理解为形成一个闭包），那么此时 a 中的作用域和变量会在内存中保存到闭包不存在为止。

依据闭包形成对父级作用域和其中变量的影响，我们可以人为地去间接性（不能直接访问）临时性（生命周期因闭包是否存在而变化）存储我们所需要的一些变量。

以下示例展示控制台输出 0~9

```js
function fn0 () {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      console.log(i)
    }, i*1000)
  }
}
fn0()

// 等价
function fn1 () {
  for (var i = 0; i < 10; i++) {
    // 通过创建闭包并传入当前循环时的 i 值，将闭包与当前循环体内作用域关联，使得当前循环时的作用域得以保存
    (function (i) {
      setTimeout(() => {
        console.log(i)
      }, i*1000)
    })(i)
  }
}
fn1()
```

### let 在 for 循环中的应用

fn0 中 `let` 声明变量 i 时，形成块级作用域，那么当前变量 i **只在本轮循环有效**（与 `var` 区分）。依据 [ES8 13.7.4.7][bb-ES8-for-let] 中 `IterationStatement:for(LexicalDeclarationExpression;Expression)Statement` 的相关解释：

在每次 for 循环结束时，会隐式的**保存**当前的执行上下文以及当前的循环结果（ES8 13.7.4.7 条款 12 和 9.a）。

在每次新的循环开始时，都会**重新**声明并**重新**绑定 (re-bind) 变量 i 为上一次循环结束时变量 i 的值，并继续判断循环条件进行或跳出循环（ES8 13.7.4.7 条款 2）。

此时的执行上下文中的变量 i 是与 `setTimeout()` 任务分发器中的函数是相关联的，就如同创建闭包时，闭包的父级作用域与闭包相关联。

其他参考：
1. [You dont know JS - let Loops][bb-you-dont-know-js-let-loops]
2. [You dont know JS - Block Scoping Revisited][bb-you-dont-know-js-let-loops]

### 闭包在 for 循环中的应用

匿名自执行函数（必须传入变量 i，以维持对变量的引用。）形成一个闭包（针对 fn1），那么在循环时，当前的循环体内作用域链（其中包含当前变量 i 值）因与闭包关联而**得以保存**。进而在每次控制台输出 i 时，`setTimeout` 中的匿名函数**向上**查找变量 i 时，都是查找的分发匿名函数时的变量 i。因而每次输出的 i 都是之前循环的值。

[bb-ES8-for-let]:https://www.ecma-international.org/ecma-262/8.0/#sec-for-statement-runtime-semantics-labelledevaluation

[bb-you-dont-know-js-let-loops]:https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch3.md#let-loops

[bb-you-dont-know-js-let-loops]:https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch5.md#block-scoping-revisited

### 私有变量

依据调用函数时，在作用域链中查找函数声明的原理（详见上一节），函数的父级作用域是在 **定义时** 确定。那么可创建闭包来保护变量不被意外修改。

```js
function fn () {
  let _private = [] // 被保护的变量
  return function (val) {
    _private.push(val)
    console.log(_private)
  }
}

const addNum = fn()
addNum(10) // [10]
```

示例中，外部无法修改且无法访问 `_private` 变量，只有通过暴露的公有方法才能修改和访问 `_private`。

### 私有函数

```js
function fn () {
  function privateFn () {
    console.log(`I am a private function`)
  }
  return function () {
    privateFn()
  }
}

const ins = fn()
ins()
```

在以上示例中，闭包是有权访问私有变量和私有函数的唯一公有接口。私有变量和私有函数对外都是不可访问不可修改的。

### 闭包的弊端

因本节开头介绍闭包的存在机理，父级作用域及其中变量会一直在内存中保存至该闭包被销毁。那么据此引出，创建过多的闭包将**可能导致内存溢出**。

# this 对象

（以下为 [我的博客][this-blog] 的浓缩版）

this 对象是指函数的执行上下文。

在非箭头函数的函数中， `this` 对象只有在该函数被 **调用时**，才能确定 `this` 的值。箭头函数本身是没有 `this` 对象的，它内部的 `this` 对象是借用的定义函数时外部环境的 `this` 对象。即只有箭头函数中的 `this` 对象是固定的，它在定义时确定。

```js
const obj = {
  fn: () => this
}
obj.fn() === window // true，箭头函数中的 this 在定义时确认，它内部的 this 对象是借用的外部 this 对象
```

以下所指函数均为非箭头函数。

1. 一般情况下，函数内部的 `this` 指向 **最近的** 调用该函数的对象。

```js
const obj = {
  fn () {
    return this
  }
}
obj.fn() === obj //  true，fn 中的 this 指向 obj

const object = {
  childObj: {
    fn () {
      return this
    }
  }
}
object.childObj.fn() === object.childObj // true，fn 中的 this 指向 childObj
```

2. 将某对象的一个方法赋值给一个变量之后，再调用该变量执行函数时，函数内部的 `this` 指向全局对象或 `undefined`（严格模式）

```js
const obj = {
  fn0 () {
    return this
  }
}

const fn = obj.fn0
fn() === window // true，fn0 中的 this 将指向全局对象或 undefined (严格模式) 
```

3. 在一个函数内部调用函数 A 时，A 中的 `this` 将指向全局对象或 `undefined` (严格模式)

```js
function foo () {
  return this
}
function fn () {
  return foo()
}

fn() === window // true 
```

从逻辑上讲，`this` 是指向调用该函数的对象（通过显式或隐式调用），即 fn 函数（fn 隐式调用 foo 函数）。但实际情况是指向全局对象。`JavaScript 语言精粹`(P27) 中作者认为这是 `JavaScript` 语言设计的一个缺陷。

4. 当构造函数与 new 连用时，构造函数中的 `this` 将指向实例

```js
function Fn (name) {
  this.name = name
}

const fn = new Fn('JS') // { name: 'JS' }
```

[this-blog]:https://lbwa.github.io/2018/02/06/Understand-this/

[declarations-let-const]:https://www.ecma-international.org/ecma-262/8.0/#sec-let-and-const-declarations

[declarations-var]:https://www.ecma-international.org/ecma-262/8.0/#sec-variable-statement

# 事件循环 event loop

（本节为 [我的博客 —— 理解 event loop 机制][event-loop-blog] 的简要叙述。）

存在两种 event loops（[w3c —— event loops]），即一种在 browsing context 下的事件循环，一种是在 workers 下的循环。本文讨论在 browsing context 下的事件循环。

一般地，在完成一个宏任务，并清空因宏任务产生的微任务队列时，称之为一个事件循环。

## 任务源

宏任务（macro-task）: script(整体代码), setTimeout, setInterval, setImmediate, I/O（用户输入、输出）, UI rendering

微任务（micro-task）: process.nextTick, Promise（特指 then 中被执行的函数）, Object.observe(已废弃), MutationObserver（HTML5新特性）

`macro-task` 和 `micro-task` 中的每一项都称之为一个 **任务源**。

## 任务队列 task queue

任务队列分为 `宏任务队列` 和 `微任务队列`。一个事件循环中可能有一个或多个任务队列。因为在执行一个宏任务时，可能产生微任务调用，即产生新的微任务队列。

相同任务源的任务被调用时进入相同的任务队列，反之进入不同的任务队列。

以一个示例讲解事件循环：

```js
// script
// 1
console.log('I am from script beginning')

// 2
setTimeout(() => { // 该匿名函数称为匿名函数a
  console.log('I am from setTimeout')
}, 1000)

// 3
const ins = new Promise((resolve, reject) => {
  console.log('I am from internal part')
  resolve()
})

// 4
ins.then(() => console.log('I am from 1st ins.then()')).then(() => console.log('I am from 2nd ins.then()'))

// 5
console.log('I am from script bottom')
```

以上整个代码段即是，`macro-task` 中的 `script` 任务源。

执行原理（依据 Chrome 66 的 V8 实现）如下：

1. 整个代码段 `script` 进入调用栈（`call stack`），执行 1 处代码调用 `console.log` 函数，该函数进入调用栈，之前 `script` 执行暂停（冻结），转交执行权给 `console.log`。`console.log` 执行完成立即弹出调用栈，`script` 恢复执行。

2. `setTimeout` 是一个任务分发器，该函数本身会立即执行，延迟执行的是其中传入的参数（匿名函数 a）。`script` 暂停执行，内部建立一个 1 秒计时器。`script` 恢复执行接下来的代码。1 秒后，再将匿名函数 a 插入宏任务队列（根据任务队列，可能不会立即执行）。

3. 声明恒定变量 `ins`，并初始化为 `Promise` 实例。特别地，`Promise` 内部代码会在本轮事件循环立即执行。那么此时， `script` 冻结，开始执行 `console.log`，`console.log` 弹出调用栈后，`resolve()` 进入调用栈，将 `Promise` 状态 `resolved`，并之后弹出调用栈，此时恢复 script 执行。

4. 调用 `ins` 的 `then` 方法，将第一个 `then` 中回调添加到 `微任务队列`，继续执行，将第二个 then 中回调添加到 `微任务队列`。

5. 如同 1 时的执行原理。

6. script 执行完成，弹出调用栈。此时，若距 2 超过 1 秒钟，那么宏任务队列中有一个匿名函数 a 等待执行，否则，此时宏任务队列为空，微任务队列中有两个 `then` 加入的回调函数等待执行。

7. 在当前宏任务执行完成并弹出调用栈后，开始**清空**因宏任务执行而产生的微任务队列。首先执行 `console.log('I am from 1st ins.then()')`，之后执行 `console.log('I am from 2nd ins.then()')`。

8. 微任务队列清空后，开始调用下一宏任务（即进入下一个事件循环）或等待下一宏任务加入任务队列。此时，在 2 中计时 1 秒后，加入匿名函数 a 至宏任务队列，此时，因之前宏任务 script 执行完成而清空，那么将匿名函数 a 加入调用栈执行，输出 `I am from setTimeout`。

**注**：`JavaScript` 中在某一函数内部调用另一函数时，会暂停（冻结）当前函数的执行，并将当前函数的执行权转移给新的被调用的函数（出自 `JavaScript 语言精粹` P27）。

总结：

1. **在一个代码段中**，所有的代码都是基于一个 `script` 宏任务进行的。

2. 在当前宏任务执行完成后，**必须**要清空因执行宏任务而产生的`微任务队列`。

3. 只有当前微任务队列清空后，才会调用下一个宏任务队列中的任务。即进入下一个事件循环。

4. `new Promise` 时，`Promise` 参数中的匿名函数是**立即执行**的。被添加进`微任务队列`的是 `then` 中的回调函数。特别地，只有 `Promise` 中的状态为 `resolved` 或 `rejected` 后，才会调用 then 函数（或 catch，或 finally 函数，原理同 then），才会添加微任务至队列中。

5. `setTimeout` 是作为任务分发器的存在，他自身执行会创建一个计时器，只有待计时器结束后，才会将 `setTimeout` 中的第一参数函数添加至`宏任务队列`。换一种方式理解，`setTimeout` 中的函数**一定**是在**下一个事件循环**中被调用。

以下是在客户端（Node.js 可能有不同结果）的输入结果：

```bash
I am from script beginning
I am from internal part
I am from script bottom
I am from 1st ins.then()
I am from 2nd ins.then()
I am from setTimeout
```

## 事件循环拓展应用 —— 异步操作

1. 定时任务：setTimeout，setInterval

2. 请求数据：Ajax 请求，图片加载

3. 事件绑定

一般地，在 JS 开发过程中，凡是可能造成代码阻塞的地方都可根据实际情况考虑使用异步操作。比如，数据获取等等。

[event-loop-blog]:https://lbwa.github.io/2018/03/08/Event-loop/

[w3c —— event loops]:https://www.w3.org/TR/html5/webappapis.html#event-loop

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

# BOM

```js
// 客户端信息对象
navigator

// 屏幕信息对象
screen

/**
 * 地址栏 url 信息对象
 * 实际应用：Vue router 的路由信息对象 vm.$route 和路由实例 vm.$router 的应用
 * vm.$route.path 对应 location.pathname
 * vm.$route.query 对应 location.search
 * vm.$route.hash 对应 location.hash
 * vm.$route.fullPath 对应 location.href
 * vm.$router.push(path) 对应 location.assign(path)
 * vm.$router.replace(path) 对应 location.replace(path)
 */
location
location.href // 全 url
location.protocol // 当前 url 协议，如 https:，http:，file:
location.host // 域名主机
location.pathname // 路径，即主机后的字符串
location.search // 查询字符串，即 ? 后字符串
location.hash // 路由 hash 值，即 # 后字符串

// 历史记录信息对象（Vue router 的路由实例 vm.$router 应用，如 vm.$router.back()，vm.$router.go(n)）
history
history.go(n)
history.back()
history.forward()
```

## 浏览器类型检测

```js
const ua = navigator.userAgent
const isChrome = ua.indexOf('Chrome')
```

原则：根据目标浏览器的 ua 字段制定特殊的过滤器。

# window.onload 和 DOMContentLoaded 的区别？

考点：浏览器的渲染过程

# 简述如何实现一个模块加载器，实现类似 require.js 的基本功能

考点：JS 模块化
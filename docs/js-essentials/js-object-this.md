# 函数 this 对象

（以下是重新整理了 [我的博客 —— 理解 this 指向][this-blog]。）

this 对象指向当前函数被调用时的执行上下文（`execution context`（[章节](js-execution-context/js-execution-context.md)））。

在非箭头函数的函数中， `this` 对象只有在该函数被 **调用时**（即函数的执行上下文成为当前正在执行的执行上下文（`running execution context`）），才能确定 `this` 的值。箭头函数本身是没有 `this` 对象的，它内部的 `this` 对象是借用的定义函数时外部环境的 `this` 对象。即只有箭头函数中的 `this` 对象是固定的，它在定义时确定。

```js
const obj = {
  fn: () => this
}
obj.fn() === window // true，箭头函数中的 this 在定义时确认，它内部的 this 对象是借用的外部 this 对象
```

以下所指函数均为非箭头函数。

## 以方法的形式调用

一般情况下，函数内部的 `this` 指向 **最近的** 调用该函数的对象。

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

## 赋值后调用

将某对象的一个方法赋值给一个变量之后，再调用该变量执行函数时，函数内部的 `this` 指向全局对象或 `undefined`（严格模式）

```js
const obj = {
  fn0 () {
    return this
  }
}

const fn = obj.fn0
fn() === window // true，fn0 中的 this 将指向全局对象或 undefined (严格模式) 
```

## 其他函数内部调用

在一个函数内部调用函数 A 时，A 中的 `this` 将指向全局对象或 `undefined` (严格模式)

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

## 构造函数实例化

当构造函数与 new 连用时，构造函数中的 `this` 将指向实例

```js
function Fn (name) {
  this.name = name
}

const fn = new Fn('JS') // { name: 'JS' }
```

[this-blog]:https://lbwa.github.io/2018/02/06/Understand-this/

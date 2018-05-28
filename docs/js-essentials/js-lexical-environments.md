# 作用域

在 `JavaScript` 中 作用域的工作模式是 **词法作用域（lexical scope）**，标准中称为 **词法环境（lexical environments）**。

作用域（lexical environments）限定了变量的有效范围。ES6 之前（不包含 ES6），`JavaScript` 中只有函数和全局作用域。ES6 之后，`JavaScript` 有函数、全局和**块级作用域**。

块级作用域因 `let` 和 `const` 声明变量而出现，它**只**对 `let` 和 `const` 声明的变量有效。常见块级作用域有大括号内的区域，for 循环中的小括号区域，即条件区域。

当变量使用 [var][declarations-var] 声明时，分为函数体内和全局作用域两种情况。在函数体内使用 `var` 声明的变量只能在该函数体内使用，外部是无法调用该函数体内的声明变量。在全局作用域内声明的变量，可在任意位置调用。

当给一个变量赋值时，若之前未使用 `var`、`let`、`const` 之一的关键字显式声明该变量，那么该变量将默认隐式声明为全局变量。

为了规范变量的有效范围，防止变量提升（因为极易造成混乱，遵循 `先声明后调用` 的原则有利于后期维护。），ES6 定义了新的变量声明方式 —— `let` 或 `const`。由它们所定义的变量只能在声明时的代码块（**块级作用域**）内（即声明时所在的大括号内）使用。即使得变量只会出现在它们应该出现的区域。二者的不同是 `let` 声明的是初始化后**可被修改**的变量，`const` 声明的是初始化后**不可被修改**的变量（`constant variable`）。

[declarations-var]:https://www.ecma-international.org/ecma-262/8.0/#sec-variable-statement

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

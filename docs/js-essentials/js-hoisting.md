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

[declarations-let-const]:https://www.ecma-international.org/ecma-262/8.0/#sec-let-and-const-declarations

[declarations-var]:https://www.ecma-international.org/ecma-262/8.0/#sec-variable-statement
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

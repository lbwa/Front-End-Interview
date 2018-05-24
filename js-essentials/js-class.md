# JS 构造函数

```js
function Fn (x, y) {
  this.x = x
  this.y = y
}

Fn.prototype.sum = function () {
  return this.x + this.y
}

const ins = new Fn(1, 2)
ins.sum() // 3 
```

常规的 JS 构造函数的一个显著特点是构造函数的定义与构造函数原型上的实例共有方法定义是**分离**的。

# class

- class 语法

```js
class Person {
  constructor (name, age) {
    this.name = name
    this.age = age
  }

  // 等价于 Person.prototype.name = function () {}
  sayName () {
    console.log(`My name is ${this.name}.`)
    return this
  }

  sayAge () {
    console.log(`My age is ${this.age}`)
    return this
  }
}

const jane = new Person('Jane', 20)
jane.sayName() // "My name is Jane."
jane.sayAge() // "My age is 20"
```

JS 类中除 `constructor` 和有前缀 `static` 的方法外，定义的所有方法都是定义在**类的原型对象**上的。

```js
typeof Person // "function"
Person instanceof Function // true
```

JS 中的类本质就是**函数**。

```js
Person === Person.prototype.constructor // true
jane.__proto__ === Person.prototype // true
```

**总结**：JS 中 `class` 严格说是一种**语法糖**，它封装了普通 JS 构造函数的创建（`constructor (val) {}`），原型对象方法和构造函数静态方法（`static`）的定义，原型链继承的实现（`extends`）等功能。

- class 继承

```js
class FullPerson extends Person {
  constructor (name, age, gender) {
    // 子类必须调用 super() 以调用父类的 constructor(name, age)
    // 因为子类构造函数中的 this 是基于父类构造函数的 this 对象再加工的
    // super() 将返回父类构造函数 this 对象（即子类的实例）
    // super() 相当于 Person.prototype.constructor.call(this)
    super(name, age)
    this.gender = gender
  }

  sayGender () {
    console.log(`${this.name} is ${this.gender}`)
    return this
  }
}

const john = new FullPerson('John', 20, 'male')
john.sayName().sayAge().sayGender() // "My name is John." "My age is 20" "John is male"
```

示例中，`FullPerson` 继承了 `Person` 的方法。

# 拓展：class 与普通 JS 构造函数的区别

- 原型对象方法的定义

`class` 中构造函数与原型对象的方法定义更为**统一**，而普通 JS 构造函数与原型对象上的方法定义是**分离**的。即 `class` 定义的构造函数与原型方法更为**简洁**。

- 原型链继承的实现

`class` 的原型继承语法（`extends`即可实现继承）较使用普通 JS 构造函数实现原型链继承**逻辑更为清晰**。

在使用普通 JS 构造函数实现的一般方法是：

```js
function Fn0 () {/* do something */}
function Fn1 () {/* do something */}

// 赋值对象字面量将直接导致 Fn1 原型被复写而非被修改，那么 Fn1 原型将丢失 constructor
Fn1.prototype = new Fn0()
Fn1.prototype.hasOwnProperty('constructor') // false

// 另一种实现方式如下，二者区别在于 Object.create() 创建出的新对象的 __proto__ 可设置为 null
Fn1.prototype = Object.create(Fn0.prototype)

/**
 * 1. 经过以上继承，Fn1.prototype.__proto__ === Fn0.prototype，此时，把 Fn1.prototype
 * 看作一个实例整体，即为 Fn0 的一个实例，那么 Fn1.prototype 就不存在 constructor 属性，那么
 * Fn1.prototype.constructor 访问的实际上是原型链上 Fn1.prototype 的原型对象 Fn0.prototype 的
 * constructor，即 Fn1 原型已丢失 constructor。
 */

Fn1.prototype instanceof Fn0 // true

// 极易忽略的一步，将 Fn1 原型的 constructor 指回原构造函数，重新定义 Fn1 函数原型的 constructor。

// 另外之前直接使用对象字面量重写了 Fn1 的原型，若直接重新定义 constructor，这些行为将导致 constructor 成为了可枚举属性，即 [[enumerable]] 为 true
Object.defineProperty(Fn1.prototype, 'constructor',{
  enumerable: false
})
```

在 `class` 中只需要使用 `extends` 即可实现原型链。从代码量和直观感受来看，`class` 实现原型链继承更为**简洁易读**，逻辑更为**清晰**，尽管二者实现的内部逻辑都是相似的，即 `class` 和 `extends` 本质都只是一种**语法糖**。

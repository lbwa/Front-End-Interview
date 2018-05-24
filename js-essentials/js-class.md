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
    return `My name is ${this.name}.`
  }

  sayAge () {
    return `My age is ${this.age}`
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
class BusyPerson extends Person {
  constructor (name, age) {
    super(name, age)
  }

  status () {
    return `${this.name} is busy right now.`
  }
}

const john = new BusyPerson('John', 20)
john.sayName() // "My name is John."
john.sayAge() // "My age is 20"
john.status() // 'John is busy right now'
```

# class 对比普通 JS 构造函数

- 原型对象方法的定义

`class` 中构造函数与原型对象的方法定义更为**统一**，而普通 JS 构造函数与原型对象上的方法定义是**分离**的。即 `class` 定义的构造函数与原型方法更为**简洁**。

- 原型链继承的实现

`class` 的原型继承语法（`extends`即可实现继承）较使用普通 JS 构造函数实现原型链继承**逻辑更为清晰**。

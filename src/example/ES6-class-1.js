// ES5 的类
// function Point (x, y) {
//   this.x = x
//   this.y = y
// }
// // 原型方法
// Point.prototype.getPosition = function () {
//   return `(${this.x},${this.y})`;
// }
// let p1 = new Point(1, 2)
// console.log(p1)
// console.log(p1.getPosition())
// class Point {
//   constructor(x, y) {
//     this.x = x
//     this.y = y
//   }
//   getPosition () {
//     return `(${this.x},${this.y})`
//   }
// }
// let p1 = new Point(2, 3)
// console.log(p1)
// console.log(p1.getPosition())
// console.log(p1 instanceof Point)
// console.log(p1.hasOwnProperty('x'))
// console.log(p1.hasOwnProperty('getPosition'))
// console.log(p1.__proto__.hasOwnProperty('getPosition'))
let info = {
  _age: 18,
  // 存值函数
  set age (age) {
    if (age > 18) console.log('怎么老了')
    else console.log('我还年轻')
  },
  // 取值函数
  get age () {
    console.log('获取年纪')
    return this._age
  }
}
console.log(info._age)
console.log(info.age)
info.age = 20
info.age = 17

class Point {
  constructor(x, y) {
    if (new.target === Point) {
      console.log('通过 new 调用')
    } else {
      console.log('不通过 new 调用')
    }
    this.x = x
    this.y = y
  }
  // 静态方法
  static getClassName () {
    return Point.name
  }
  // 实例方法
  getPosition () {
    return `(${this.x},${this.y})`
  }
}
Point.z = 100
const p = new Point(1, 2)
// const p1 = Point(1, 2) 报错
// console.log(p.getClassName())//在实例上调用静态方法，报错
console.log(Point.getClassName())//使用类调用静态方法
console.log(p.getPosition())
console.log(p.z)
// ES6 类的继承
console.log('************');
class Parent {
  constructor(name) {
    this.name = name
  }
  static hello () {
    console.log('Hello ' + this.name)
  }
  getName () {
    return this.name
  }
}
class Child extends Parent {
  constructor(name, age) {
    super(name)//必须先调用 super 传递父类的参数
    this.age = age
  }
}
const jack = new Child('jack', 23)
console.log(jack.getName())//调用父类的实例方法
//console.log(jack.hello())//子类实例不可调用父类静态方法
console.log(Child.hello())//子类可调用父类静态方法
console.log(jack instanceof Child)//true
console.log(jack instanceof Parent)//true



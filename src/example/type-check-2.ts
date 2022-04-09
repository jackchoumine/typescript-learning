/*
 * @Description: 类型检查机制 - 类型兼容
 * @Date: 2020-05-21 23:08:08
 * @Author: JackChouMine
 * @LastEditTime: 2022-04-09 19:39:44 +0800
 * @LastEditors : JackChou
 */
// 类型兼容：Y 类型的变量可赋值给 X 类型的变量，我们说 X 类型兼容 Y 类型，X 类型更加宽泛。
// X 兼容 Y: X(目标类型) =  Y(源类型)
let testStr = 'test'
// testStr = null // 把 null 赋值给 string 类型的变变量，没有报错，string 兼容 null
// 类型兼容可能会引发不可预知的问题，但是增加了灵活性，广泛的存在接口、类和函数中。

// 接口兼容:成员少的类型可以兼容成员多的类型
// 源类型具备目标类型的必要属性，就可以进行赋值
interface X {
  a: any
  b: any
}
interface Y {
  a: any
  b: any
  c: any
}

let x: X = { a: 'a', b: 'b' }
let y: Y = { a: 'a', b: 'b', c: 'c' }
x = y // y 可赋值给 x
// y = x; // x 赋值给 y ，提示属性丢失

// 类的兼容
// 类的兼容性和接口比较相似，都是比较结构，具有少数成员的类可能兼容多数的，反之不行。
// 在比较两个类的兼容性时，静态成员和构造函数不参与比较。两个类具有相同的实例成员，则类的实例相互兼容，成员少的兼容成员多的，反过来不行。
class A {
  public id = 1
  constructor (p: number, q: number) {}
}

class B {
  // 静态成员
  public static s = 'jack'
  public id = 1
  // 构造函数和 A 的不同
  constructor (p: string) {}
}

let aa = new A(20, 21)
let bb = new B('20')
aa = bb // A 的实例兼容 B 的实例
bb = aa // B 的实例兼容 A 的实例

class D {
  // 静态成员
  public static s = 'jack'
  public id = 1
  public city = 1 // 比 B 多一个成员
  // 构造函数和 A 的不同
  constructor (p: string) {}
}
let dd = new D('jack')
bb = dd // B 的实例兼容 D 的实例
// dd = bb; // D 的实例不兼容 B 的实例，提示 city 属性丢失

// 函数类型兼容
type Handler = (a: number, b: number) => void
// 定义了一个高阶函数，当给高阶函数传递参数，会判断形参数否兼容实参
// 满足三个条件即可兼容：
// 1. 形参的参数个数大于等于实参的参数个数
// 2. 参数类型兼容
// 3. 返回值类型相同或者兼容
function hof (callback: Handler) {
  return callback
}

let handler1 = (a: number) => {}
hof(handler1) // 实参只一个参数，兼容
let handler2 = (a: number, b: number, c: number) => {}
// hof(handler2); // 实参的参数个数比形参的多，不兼容

// 可选参数和剩余参数的情况
let a = (p1: number, p2: number) => {}
let b = (p2?: number, p3?: number) => {}
let d = (...rest: number[]) => {}
// a = b // 固定参数兼容可选参数
// b = a // 可选参数兼容固定参数
// a = d // 固定参数兼容剩余参数
// d = a // 剩余参数兼容固定参数
// b = d // 可选参数兼容剩余参数
// d = b // 可选参数兼容可选参数

// 参数类型
const handler3 = (p1: string) => {}
// hof(handler3); // 参数类型不兼容

// 当参数为对象等复杂的类型时，也比较复杂
interface Point3D {
  x: number
  y: number
  z: number
}
interface Point2D {
  x: number
  y: number
}

let p3d = (point: Point3D) => {}
let p2d = (point: Point2D) => {}
p3d = p2d // 成员多的兼容成员少的，和接口兼容正好相反，可对象拆分成独立参数，那么就是参数多的兼容参数少的，和参数个数兼容一致。
// p2d = p3d // 成员少的，不兼容成员多的。关闭 strictFunctionTypes 可做到兼容。
// 函数参数之间可双向赋值叫参数双向协变。允许把一个精确的类型赋值给一个不那么精确的类型，把非精确的类型赋值给精确类型可能报错。

// 函数返回值类型
let h = () => ({ name: 'jack' })
let l = () => ({ name: 'jack', age: 23 })
h = l // h 兼容 l，h 的返回值类型是 l 返回值的子类型。成员少的兼容成员多的，和鸭式变形法一致。
// l = h; // l 兼容 h

// 函数重载
// 函数声明列表是目标函数，具体的实现是源函数。编译器执行时会查找声明列表，使用匹配的声明执行实现，声明列表的参数要多余实现的参数，返回值类型也要兼容。
function overload (a: number, b: number): number
function overload (a: string, b: string): string
// function overload(a: any, b: any, c: any): any { }// 实现的参数比声明的多
// function overload(a: any, b: any): number { }// 返回值不兼容第二个声明
function overload (a: any, b: any): any {} // 返回值不兼容第二个声明

// 枚举的兼容
// 数字枚举和number相互兼容 string兼容字符串枚举
// 枚举之间相互不兼容，即使类型相同
enum Fruit {
  Apple,
  Banana,
}
enum Book {
  CS,
  Math,
}
enum Color {
  Yellow = 'yellow',
  Red = 'red',
}
console.log(typeof Fruit) // object
console.log(typeof Fruit.Apple) // number
console.log(typeof Color) // object
console.log(typeof Color.Red) // string
const fruit: Fruit.Apple = 3 // 枚举兼容number
const no: number = Fruit.Banana // number 兼容枚举
// const no2: number = Color.Yellow; // number 兼容 string
const id: string = Color.Red // string 兼容字符串枚举
// const idTest: Color.Red = 'Color.Red'; // 字符串枚举不兼容string
// const idTest: Fruit.Apple = 'Color.Red'; // 字符串枚举不兼容number
// const color: Color.Red = Fruit.Banana; // 枚举之间不兼容
// const book: Book.CS = Fruit.Apple; // 数字枚举不兼容

//  泛型兼容性
interface Empty<T = number> {}
let obj1: Empty<string> = {}
let obj3: Empty = {}
obj1 = obj3 // 空的接口类型的变量相互兼容
obj3 = obj1
//  泛型接口里面有成员的情况
interface NotEmpty<T = number> {
  value: T
}
let obj4: NotEmpty<string> = { value: 'ts' }
let obj5: NotEmpty = { value: 12 }
// obj4 = obj5; // 泛型接口里面有成员，不再兼容
// obj5 = obj4;
// 类型参数被接口成员使用时，不再兼容

// 泛型函数类型兼容性
// 定义相同的泛型函数相互兼容
let genFun1 = <T>(x: T): T => {
  return x
}
let genFun2 = <U>(x: U): U => {
  return x
}
genFun1 = genFun2 // 兼容
genFun2 = genFun1 // 兼容

let genFun3 = <U, V>(x: U, y: V): U => {
  return x
}
// genFun2 = genFun3; //定义不同，不兼容

// 兼容性总结：
// 结构（接口、对象、类型）的兼容：成员少的兼容成员多的
// 函数的兼容：参数多的兼容参数少的

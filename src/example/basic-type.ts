/*
 * @Description: ts 类型
 * @Date: 2019-12-07 21:52:05
 * @Author: JackChouMine
 * @LastEditTime: 2020-12-06 19:56:29 +0800
 * @LastEditors: JackChouMine
 */
// NOTE
/*

1. 基本类型：
string,boolean,number,symbol,null,undefined,void
以上是原始类型。
any,unknown,never,array,tuple,enum,object,Object,{}
*/
let age = 123
console.log(age)
// 元组
let tuple: [number, string, boolean, string] = [3, 'jack', true, 'zhou']
console.log(tuple.join(''))
// any
let nameN: any = 'jack'
console.log(typeof nameN)
let arr: number[] = [1, 2]
console.log('****')
// void类型
const consoleText = (text: string): void => {
  console.log(text)
}
consoleText('你好')
let v: void
console.log(typeof v)

// v = null
enum CardSuit {
  car = 'card',
  club = 10,
  heart,
  diamonds = 1,
}
// console.log(CardSuit['card']) // 报错，但是运行不报错
console.log(CardSuit.car) // card
console.log(CardSuit.club) // 10
console.log(CardSuit.heart) // 11
console.log(CardSuit[1]) // diamonds
type enumCard = typeof CardSuit
function testFun(enumValue: 'jack' | 'tom'): any {
  return enumValue
}
console.log(testFun('tom'))
console.log('**************')
function printInfo(person: {
  name: string
  age: number
  scores: number[]
}): { name: string; age: number; total: number } {
  const total = person.scores.reduce((total, current) => total + current)
  const { name, age } = person
  return { name, age, total }
}
console.log(printInfo({ name: 'jack', age: 23, scores: [1, 2, 3] }))

let test: string | number
test = 14
test = '24'
// null undefined
let un: null = null
let undef: undefined
// never 没有值的类型
const errorFun = (message: string): never => {
  throw new Error(message)
}
// let neverVar: never = (() => {
//   throw new Error('报错')
// })()
// never 仅能被赋值给另外一个 never 类型，因此你可以用它来进行编译时的全面的检查
// NOTE never 全面检查类型：比如 新增联合类型而没有对应的实现。
type Foo = string | number // | boolean
/*
// NOTE Foo 新增一个类型，而函数对应的实现，会产生一个错误
*/
function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === 'string') {
    // 这⾥ foo 被收窄为 string 类型
  } else if (typeof foo === 'number') {
    // 这⾥ foo 被收窄为 number 类型
  } else {
    // foo 在这⾥是 never
    const check: never = foo
  }
}

// NOTE
// void vs never
// void 没有任何类型 never 不存在值的类型
// void 可被赋值：const test3: void = null // 报错，strictNullChecks 设置为 false
// never 只能被赋值另一个 never 类型的值
// 使用场景：void 函数返回值 never 全面的类型检查，比如在 else|switch default 语句检查联合类型

function fun(age: number): string {
  return age.toString()
}
const funAge: (age: number) => string = (age: number): string => {
  return age.toString()
}
function sum(first: number = 0, ...rest: number[]): number {
  return rest.reduce((total, current) => total + current) + first
}
console.log('********************')
console.log(sum(undefined, 2, 3, 4, 5, 6)) // 21

// NOTE
// Object -- 1.接口，提供了所有 object 对象的属性，比如 toString hasOwnProperty 2.任何值都可赋值给 Object 类型的变量，它包含原始值
// NOTE 为何包含原始值：拆箱和装箱操作
// NOTE 不要用 Object 作为类型，因为它不够具体，编译器可能会报错
// const consoleObject = (arg: Object): { toString(): string } => {
//   console.log(arg)
//   return arg
// }
// consoleObject({ name: 'jack' })
// 属性冲突，报错
// const obj1: Object = {
//   toString() {
//     return 123
//   }, // Error
// }

/*
interface Object {
  constructor: Function;
  toString(): string;
  toLocaleString(): string;
  valueOf(): Object;
  hasOwnProperty(v: PropertyKey): boolean;
  isPrototypeOf(v: Object): boolean;
  propertyIsEnumerable(v: PropertyKey): boolean;
}

interface ObjectConstructor {
  new(value?: any): Object;
  (value?: any): any;
  readonly prototype: Object;
  getPrototypeOf(o: any): any;
  // ···
}
declare var Object: ObjectConstructor;

*/
// 不提示错误
const obj222: object = {
  toString() {
    return 123
  }, // Error
}
// object -- 引用类型(对象、数组、set、map,set 和 map 是特殊的对象)即非原始类型，
// NOTE -- 引入该类型的作用
/*
1. 限定需要引用类型参数的函数，比如 Object.create()

interface ObjectConstructor {
  /**
   * Creates an object that has the specified prototype or that has null prototype.
   * @param o Object to use as a prototype. May be null.
  create(o: object | null): any;

  /**
   * Sets the prototype of a specified object o to  object proto or null. Returns the object o.
   * @param o The object to change its prototype.
   * @param proto The value of the new prototype or null.

  setPrototypeOf(o: any, proto: object | null): any;

  // ...
}

2. 为 ES2015 的 WeakMap 引入数据结构 ，WeakMap 的键必须是对象
3. 使用这种类型，不能访问任何属性,因为只知道类型而不明确知道具体的属性

interface WeakMap<K extends object, V> {
  delete(key: K): boolean;
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): this;
}

*/
console.log('****object*****')
const set: object = new Set([1])
console.log(typeof set)
const consoleObj = (arg: object): void => {
  // Object.create(12)// 报错 不能传递原始类型
  // console.log(arg.name) // 报错:Property 'name' does not exist on type 'object'.
  // 不报错：原型上邮有该属性
  console.log(arg.toString())
  console.log(arg)
}
consoleObj({ name: 'jack' })
consoleObj([])
let strictTypeHeaders: { [key: string]: string } = {}
let header: object = {}
header = strictTypeHeaders // OK
// Type 'object' is not assignable to type '{ [key: string]: string; }'.
// NOTE 更通用的类型赋值给更具体的类型，会报错
// strictTypeHeaders = header // Error

const pt = { x: 666, y: 888 }
const id = { name: 'hi' }

// {} 类型 -- 空对象类型：描述没有任何成员的对象，可访问原型上的属性
const namedPoint = {}
Object.assign(namedPoint, pt, id)
console.log(namedPoint)
const testEmptyObj = {}
// @ts-ignore 类型“{}”上不存在属性“a”。
testEmptyObj.a = 'aaa'
console.log(testEmptyObj.hasOwnProperty('a'))

// NOTE 如何声明一个含有任意属性的对象？
type anyObject = { [key: string]: any }
const consoleAnyObject = (arg: anyObject): void => {
  console.log(arg)
}
consoleAnyObject({ nam: 'TS' })
// 映射类型
interface Point {
  x: number
  y: number
}

type PointCopy1 = {
  [Key in keyof Point]: Point[Key] // (A)
}

// 类型断言
// refers to a value but it is being as a value here  typescript
const getLength: (target: string | number) => number = (target: string | number): number => {
  if ((target as string).length || (target as string).length) {
    return (target as string).length
  } else {
    return target.toString().length
  }
}
console.log(getLength('JACK'))
console.log(getLength(123))
const tuple3: [string, number] = ['jack', 23]
const tuple2: [string, number][] = [['jack', 23]]
console.log(typeof tuple3)
console.log(Array.isArray(tuple3))

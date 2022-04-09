/**
 * @description symbol 学习记录
 */
const s = Symbol()
console.log('symbol', s)
const s1 = Symbol()
// console.log(s1 === s)//已经提示 返回 false
const s3 = Symbol('jack')
const s4 = Symbol('jack')
// console.log(s3 !== s4)
console.log(s3)
console.log(typeof s4)// symbol
console.log(Symbol(5))
console.log(!!Symbol(5))
// Symbol 可传入 字符串 数值  undefined
// console.log(Symbol({}))
// console.log(Symbol(true))
// symbol 作为属性名
// 严格模式下对象不能包含同名属性
// const obj = { name: 'jack', name: '小杰' }
// symbol 值作为属性 必须使用 [],否则报错
const obj = { [Symbol('name')]: 'jack', name: '小杰' }
console.log(obj)
const myName = Symbol('name')
const obj2 = { [myName]: 'Jack', myName: '小杰' }
console.log(obj2)
// 修改属性名，也必须使用 []
obj2[myName] = '小名'
console.log(obj2)
console.log('-------------------------')
// 属性的遍历
// symbol  属性不能在 for in 中遍历
for (const key in obj2) {
  console.log(key)
}
console.log('-------------------------')
// Object.keys 中也拿不到 key
Object.keys(obj2).map((key) => {
  console.log(key)
})
const testObj = { name: 'jack', age: 23 }
for (const key in testObj) {
  console.log(key)
}
Object.keys(testObj).map((key) => {
  console.log(key)
})
// Object.getOwnPropertyNames 不能获取 symbol 属性
console.log(Object.getOwnPropertyNames(testObj))
console.log(Object.getOwnPropertyNames(obj2))
console.log(Object.getOwnPropertySymbols(obj2))
// stringify 不能转换 symbol 属性
console.log(JSON.stringify(obj2))
// Reflect.ownKeys 可获取到 symbol 属性
console.log(Reflect.ownKeys(obj2))
// symbol 类型数据的方法 Symbol.for Symbol.keyFor
const s8 = Symbol('jack')
const s9 = Symbol.for('jack')
const s10 = Symbol.for('jack')
// console.log(s8 === s9)//false
// console.log(s10 === s9)//true Symbol.key 会使用传的参数寻找已创建的symbol 已经创建 就使用存在的 否则创建一个新的
// Symbol.keyFor 接收一个Symbol.for 创建的 symbol，返回symbol的标识
console.log(Symbol.keyFor(s10))// jack
console.log(Symbol.keyFor(s8))// undefined

// 11个内置的symbol值 一个对象用 Symbol 属性，使用 instanceOf 是会调用该方法
console.log(Symbol.hasInstance)
const inObj = {
  [Symbol.hasInstance] (obj: object) {
    console.log('Symbol.hasInstance')
    console.log(obj)
  },
}
const jack = { name: 'jack' }
console.log(jack instanceof (inObj as any))
console.log('-------------------')
//  iterator 遍历器 可给一个数组添加遍历器，那么该数组就具有遍历器方法
const testArry = [1, 2, 3]
// 返回一个遍历器
const iterator = testArry[Symbol.iterator]()
console.log(iterator)
console.log(iterator.next())
for (const value of testArry) {
  console.log(value)
}
const fun1 = (name: string): string => {
  return name
}
const fun2 = (age: number): void => {
  console.log(age)
}
const testArr = [fun1, fun2]
const it = testArr[Symbol.iterator]()
console.log(it.next().value('jack'))
it.next().value(23)
// const testObj2 = { name: 'jack' }
// const it = testObj2[Symbol.iterator]()
// console.log(it.next())
// 数组使用 concat 时不展开
// const arr1: number[] = [1, 2]
// const arr2: number[] = [3, 4]
//   < any > arr2[Symbol.isConcatSpreadable] = false
// console.log([].concat(<any>arr1, <any>arr2))


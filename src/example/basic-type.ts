/*
 * @Description: ts 类型
 * @Date: 2019-12-07 21:52:05
 * @Author: JackChouMine
 * @LastEditTime: 2020-12-06 19:56:29 +0800
 * @LastEditors: JackChouMine
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
console.log(CardSuit.club)// 10
console.log(CardSuit.heart)// 11
console.log(CardSuit[1]) // diamonds
type enumCard = typeof CardSuit
function testFun(enumValue: 'jack' | 'tom'): any {
  return enumValue
}
console.log(testFun('tom'))
console.log('**************')
function printInfo(person: { name: string, age: number, scores: number[] }): { name: string, age: number, total: number } {
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
// never 不存在的类型 任意类型的子类型
const errorFun = (message: string): never => {
  throw new Error(message)
}
// let neverVar: never = (() => {
//   throw new Error('报错')
// })()
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
console.log(sum(undefined, 2, 3, 4, 5, 6))// 21
// object
const consoleObj = (arg: object): void => {
  console.log(arg)
}
consoleObj({ name: 'jack' })
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
const test3: void = null

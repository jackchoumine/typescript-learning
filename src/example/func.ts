/*
 * @Description: ts 函数学习
 * @Date: 2020-05-10 22:09:30
 * @Author: JackChouMine
 * @LastEditTime: Mon May 11 2020 02:28:36
 * @LastEditors: JackChouMine
 */
// 定义了一个函数并使用内联方式对参数进行了注解
function addTest(n1: number, n2: number): number {
  return n1 + n2
}
// 对返回值进行注解不是必须的，TS会进行推断，但是提供返回值类有助于排错
const addTest2 = (n1: number, n2: number) => n1 + n2

const students = [{ name: 'jack', age: 13 }, { name: 'tom', age: 15 }]
// filter 接收一个函数作为回调
// 如何指定参数为的函数的函数的类型呢？
// 如何约束作为参数的函数呢？
const youngStudents = students.filter((student) => student.age < 14)
console.log(youngStudents)

// 声明一个函数类型
let compute: (x: number, y: number) => number
// 使用一个函数初始化变量
compute = (a, b) => a + b
console.log(compute(12, 12))
type Compute = (x: number, y: number) => number
let compute1: Compute = (n, m) => n + m
compute1(12, 40)

interface Lib {
  (): void;
  version: string;
  doSomething(): void
}
const getLib = () => {
  const lib: Lib = (() => { }) as Lib
  lib.version = '1.1.0'
  lib.doSomething = () => { }
  return lib
}
const lib = getLib()
console.log(lib())
console.log(lib.doSomething())

/*
 * @Description: 泛型函数和泛型接口
 * @Date: 2020-05-21 01:02:56
 * @Author: JackChouMine
 * @LastEditTime: 2020-05-21 01:49:26
 * @LastEditors: JackChouMine
 */
// 1. 泛型的概念
// 现在有一个函数
// function log(str: string): string {
//   console.log(str);
//   return str;
// }
// 需求有变化：现在希望函数能接受字符串数组
// 改进1：函数重载
function log(value: string): string
function log(value: string[]): string[]
// 在最宽泛的约束中实现函数
function log(value: any) {
  console.log(value)
  return value
}
// 缺点：代码多

// 改进2：联合类型
// 为了不报错，取另一个函数名
function log2(value: string | string[]): string | string[] {
  console.log(value)
  return value
}
// 缺点：无法提现参数和返回值之间的类型关系

// 改进3：希望函数能接受任意类型的参数
function log3(value: any) {
  console.log(value)
  return value
}
// 缺点：① 使用TS的目的是希望使用它的类型系统，但是这样又回到JS
// ② 想传入数组，也返回数组，但是使用 any 类型达不到这样的要求，不能提现参数和返回值之间的类型关系

// 泛型：不预先确定数据类型，在使用时才确定，但是约定函数参数和返回值之间的关系。
// 使用尖括号在函数名称后面指定泛型，泛型声明往往使用大写字母 T V U 等
function print<T>(value: T): T {
  console.log(value)
  return value
}
// 使用时指定泛型的具体类型
print<string>('generic') // 指定具体类型，vscode 类型提示很友好
print<string[]>(['generic'])
print(2) // 不指定，TS 会根据类型推断出来，vscode 在代码提示中使用具体的值代替类型

// 2. 使用泛型定义函数类型
// 使用类型别名定义函数类型

type Out = <T>(value: T) => T
// 定义一个函数
const myOut: Out = print
myOut<number>(3)

// 3.泛型接口
// tslint 规则中使用 "callable-types": false, 使用接口定义函数类型不转为类型别名
type Log = <T>(value: T) => T

// 泛型还可以约束其他成员，在接口名称后面使用<>声明泛型，在实现时必须指定具体的类型
// 还可以给泛型指定一个默认的具体类型，实现时不指定具体类型就使用默认类型
type In<T = string> = (value: T) => T
const myInt: In<number> = myOut

// NOTE 小结：
// 泛型把参数类型变成了变量，在使用时再给类型赋值。

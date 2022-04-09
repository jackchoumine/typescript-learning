
/*
 * @Description: ts 函数学习
 * @Date: 2020-05-10 22:09:30
 * @Author: JackChouMine
 * @LastEditTime: 2022-04-09 19:36:22 +0800
 * @LastEditors : JackChou
 */
/*
接口可用来约束类、函数、对象的结构和类型，是一种代码协作契约。
js 中访问一个对象的属性，可能属性不存在，可能属性值为假值
if(obj.a){ // 是判断是否存在对象属性呢还是属性为假值

}
//当使用接口约定对象结构时，这种困惑不存在。
 */
const getFullName = ({ firstName, lastName }: { firstName: string, lastName: string }): string => {
  return `${firstName} ${lastName}`
}
console.log(getFullName({ firstName: 'jack', lastName: 'chou' }))

// TS 的接口默认要求以I开头，可在ts 规则中设置
// "interface-name": [true,"never-prefix"]
interface NameInfo {
  firstName: string
  lastName: string
}

// 使用接口对参数进行限制
const getFullName2 = ({ firstName, lastName }: NameInfo): string => {
  return `${firstName} ${lastName}`
}
console.log(
  getFullName2(
    {
      firstName: 'Tom',
      lastName: 'chou',
    })
)

interface Vegetable {
  readonly name: string // 声明只读属性
  color?: string // 使用 ? 指定可选的属性
  [prop: string]: any // 使用索引签名，传递多余属性
}
const getVegetable = ({ color, name }: Vegetable): string => {
  return `A ${color ? (color + ' ') : ''}${name}`
}
console.log(getVegetable({
  name: 'tomato', color: 'red',
}))
console.log(getVegetable({
  name: 'tomato',
}))

console.log(getVegetable({
  name: 'tomato',
  color: 'red',
  // size: 2 // 传递多余属性，会报错
}))

console.log(getVegetable({
  name: 'tomato',
  color: 'red',
  size: 2, // 使用类型断言 传递多余属性
} as Vegetable))
console.log(getVegetable({
  name: 'tomato',
  color: 'yellow',
  size: 2, // 使用索引签名，传递多余属性
}))

// 类型兼容传递多余的属性
// a = b a 中应该用的属性，b 中必须有
const vegetableInfo = {
  name: 'tomato',
  size: 10,
  weight: '3kg',
}
console.log(getVegetable(vegetableInfo))

const vegetableObj: Vegetable = {
  name: 'tomato',
}
// vegetableObj.name = 'onion' // 这里提示只读属性不可修改

// 数组类型的接口
interface ArrInter {
  0: number
  readonly 1: string // 第二个元素只读
}
const testArr2: ArrInter = [10, 'a']
console.log(testArr2)

// 定义函数类型的接口
// 使用场景是啥？
// interface AddFun {
//   (n1: number, n2: number): number// 声明参数和返回值类型 即函数签名
// }
// 保存时自动变成类型别名的形式
type AddFun = (n1: number, n2: number) => number
const add: AddFun = (n1, n2) => n1 + n2
console.log(add(10, 13))

// 接口的索引类型：给属性指定类型
interface PropInter {
  [id: number]: string // 声明一个id属性，类型为数值，值的类型为字符串，只要满足这个约束，可声明任意多的 id 属性
}

const porpInterTest: PropInter = {
  0: 'jack',
  1: 'Tom',
  2: 'Pony',
  123: 'hello',
  // test: 'Roby' // 使用字符串声明属性，报错
}
console.log(porpInterTest[2]) // note 使用数值作为属性，必须使用方括号访问属性

// 接口的继承
// 对象可继承，接口也可使用 extends 关键词实现继承

// 人的接口
interface Person {
  readonly age: number
  readonly name: string
  readonly idNo: string
}
// interface Student {
//   age: number,
//   name: string,
//   idNo: string,
//   stuNo: string// 学号
// }
// interface Teacher {
//   age: number,
//   name: string,
//   idNo: string,
//   employeeNo: string// 员工号
// }
// 学生和教师都包含人的属性，他们可继承人

interface Student extends Person {
  stuNo: string // 学号
}
interface Teacher extends Person {
  employeeNo?: string // 员工号
}

const student: Student = {
  name: 'Jack',
  idNo: '1231314',
  age: 23,
  stuNo: '20180912',
}
const teacher: Teacher = {
  age: 36,
  name: 'Tom',
  idNo: '522424X',
}
console.log(student)
console.log(teacher)

// 混合类型的接口：接口里面声明函数和属性
interface Counter {
  (): void // 声明了一个函数类型的属性
  count: number
}

// 实现 Counter 接口
const getCounter = (): Counter => {
  const c = () => { c.count++ }
  c.count = 0
  return c
}
const counter: Counter = getCounter()
counter()
console.log(counter.count)
counter()
console.log(counter.count)

/*
 * @Description: 应用入口
 * @Date: 2019-12-02 02:12:29
 * @Author: JackChouMine
 * @LastEditTime: 2022-04-26 01:22:36 +0800
 * @LastEditors : JackChou
 */
import './example/basic-type'
// import './example/symbol'
// import './example/ES6-class-1'
// import './example/interface'
// import './example/enumeration'
// import './example/func'
// import './example/class'
// import './example/abstractClass';
// import './example/generic-1';
// import './example/generic-2'
// import './decorators/class-decorator'
// import './decorators/class-method-decorator'
// import './decorators/class-setter-decorator'
import './decorators/use-decorator'

// 难点
import './difficulty/type'
import $ from 'jquery'
$(() => {
  $('body').html(`<div>hello</div>`)
  const init = new $.fn.init()
  console.log(init)
})
interface Teacher {
  firstName: string
  last: string
}
const teacher: Teacher = {
  firstName: 'jack',
  last: 'Chou',
}

function formatName(p: Teacher) {
  return p.firstName + p.last
}
console.log(formatName(teacher))
function formatNameAny(p: any) {
  return p.first + p.last
}
console.log(formatNameAny(teacher))

const el = document.querySelector('#app')
el!.innerHTML = `<div>hello</div>`

class Square {
  constructor(public width: number) {}
}
class Rectangle extends Square {
  // NOTE 不加 public，提示 类型“Rectangle”上不存在属性“height”。
  constructor(public width: number, public height: number) {
    super(width)
  }
}

type Shape = Square | Rectangle
function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    return shape.width * shape.height
  } else {
    return shape.width * shape.width
  }
}
function asNumber(x: number | string): number {
  return x as number
}
function setLightSwitcher(lightSwitcher: boolean) {
  if (lightSwitcher) {
    console.log('turn on the light')
  } else {
    console.log('turn off the light')
  }
}
async function setLight() {
  const res = await fetch('/api/light')
  const lightSwitcher: boolean = await res.json()
  setLightSwitcher(lightSwitcher)
}

// function add(a: number, b: number): number {
//   return a + b
// }
// function add(a: string, b: string): string {
//   return a + b
// }
interface Vector2D {
  x: number
  y: number
}

function calculateLength(v: Vector2D): number {
  return Math.sqrt(v.x * v.x + v.y * v.y)
}

interface Vector3D {
  x: number
  y: number
  z: number
}

const v2: Vector2D = { x: 1, y: 2 } // z: 3 } as Vector2D // ❌ 多出 z 属性，报错
// const v2: Vector2D = { x: 1, y: 2, z: 3 } as Vector2D
calculateLength(v2) // 但是这里不报错
const v3: Vector3D = { x: 1, y: 2, z: 3 }
calculateLength(v3)

function normalize(v: Vector3D) {
  const length = calculateLength(v)
  return {
    x: v.x / length,
    y: v.y / length,
    z: v.z / length,
  }
}

console.log(normalize(v3))
console.log(normalize(v2 as Vector3D)) // ❌ 只能传入 Vector3D 类型

function calculateLength1(v: Vector3D) {
  let length = 0 //
  for (const axis of Object.keys(v)) {
    const value = v[axis as 'x' | 'y' | 'z']
    length += Math.sqrt(value)
  }
}
class C {
  foo: string
  constructor(foo: string) {
    this.foo = foo
  }
}

const c = new C('foo')
const d: C = { foo: 'foo' } // ✅ 使用字面量赋值，不会调用构造函数
// const e: C = { bar: 'bar' } // ❌ 结构不同 不行
interface Author {
  first: string
  last: string
}

function getAuthors(db: PostgresDB): Author[] {
  const authorRows = db.runQuery(`SELECT first,last FROM AUTHOR`)
  return authorRows.map((row) => ({ first: row[0], last: row[1] }))
}

interface PostgresDB {
  runQuery(query: string): string[][]
}

function logMessage(message: string | null) {
  if (message) console.log(message)
}

const bigObject = {
  /** number[] */
  x: [1, 2, 3], // number[]
  /** bar 属性 */
  bar: {
    name: 'tomato',
  },
}

type BarType = typeof bigObject['bar']

function restOfPath(path: string): string {
  return path.split('/').slice(1).join(path)
}
/**
 * 获取 DOM 元素
 * @param elOrId
 * @returns HTMLElement
 */
function getElement(elOrId: string | HTMLElement | null): HTMLElement {
  if (elOrId === null) {
    return document.body
  } else if (typeof elOrId === 'object') {
    return elOrId
  } else {
    return document.getElementById(elOrId)!
  }
}

type Twelve = 12
type AB12 = 'A' | 'B' | Twelve

const a: AB12 = `A`
const c: AB12 = 12 // 不能将类型“"c"”分配给类型“AB12”

interface Person {
  // 描述成员特征
  name: string
  age: number
}

interface PersonSpan extends Person {
  birth: Date
  death?: Date
}

const personSpan: PersonSpan = {
  name: 'tom',
  age: 18,
  birth: new Date(),
}

const person: Person = {
  name: 'tom',
  age: 18,
  birth: new Date(),
} as PersonSpan

const name: Person['name'] = personSpan['name']

function getKey<K extends string>(val: any, key: K) {}
// getQuote 的类型是 Promise<Response>
async function getQuote() {
  const res = await fetch('/api/quote')
  // const quote = await res.json()
  return res
}

// 但是，请求失败时，返回的类型是 Promise<never>

const checkFetch: typeof fetch = async (input, init) => {
  const res = await fetch(input, init)
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return res
}

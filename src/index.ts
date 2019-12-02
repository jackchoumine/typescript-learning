let age: number = 123
console.log(age)
// 元组
let tuple: [number, string, boolean, string] = [3, 'jack', true, 'zhou']
console.log(tuple.join(''))
// any
let nameN: any = 'jack'
console.log(typeof nameN);
// void类型
const consoleText = (text: string): void => {
  console.log(text)
}
consoleText('你好')
let v: void = undefined
console.log(typeof v);

// v = null
console.log(typeof v)
// null undefined 
let un: null = null
let undef: undefined = undefined
// never 不存在的类型 任意类型的子类型
const errorFun = (message: string): never => {
  throw new Error(message)
}
// object 
const consoleObj = (arg: object): void => {
  console.log(arg)
}
consoleObj({ name: 'jack' })
// 类型断言 
// refers to a value but it is being as a value here  typescript
const getLength = (target: string | number): number => {
  if ((<string>target).length || (target as string).length === 0) {
    return (<string>target).length
  } else {
    return target.toString().length
  }
}
console.log(getLength('JACK'))
console.log(getLength(123))
// @ts-nocheck
/*
 * @Description : 类的装饰器
 * @Date        : 2021-10-25 22:17:33 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-04-09 19:32:43 +0800
 * @LastEditors : JackChou
 */

console.log('类的访问器装饰器-----')

/**
 * 访问器装饰器
 * @param prototype 普通方法，target 是类的原型 静态方法，target 是类的构造函数
 * @param methodName 被装饰的方法名称
 * @param descriptor 方法描述对象
 */
function decorator (prototype: any, methodName: string, descriptor: PropertyDescriptor) {
  console.log('decorator')
  console.log(prototype)
  console.log(methodName)
  console.log(descriptor)
}

/**
 * 属性装饰器
 * @param prototype 原型
 * @param propName 属性名称
 */
function log (prototype: any, propName: string): any {
  // NOTE 没有描述对象
  console.log('log')
  console.log(prototype)
  console.log(propName)
  let value = ''
  // prototype[propName]
  // console.log('value')
  // console.log(value)
  // 返回一个描述对象，可限制属性的特性
  const descriptor = {
    // writable: false,
    configurable: true,
    enumerable: true,
    set (newValue: any) {
      console.log('setter', newValue)
      value = newValue
    },
    get () {
      console.log('getter')
      return value
    },
  }
  // console.log(descriptor)
  return descriptor
}

/**
 * 参数装饰器
 * @param prototype 原型
 * @param methodName 方法名称
 * @param nameIndex 参数位置
 */
function paramDecorator (prototype: any, methodName: string, nameIndex: number) {
  console.log('paramDecorator')
  console.log(prototype)
  console.log(methodName)
  console.log(nameIndex)
  // TODO 可左哪些操作呢？
}
class User {
  @log
  public age = 18
  // NOTE 不要取同一个变量，否则爆栈
  constructor (public name: string) {
    console.log('User ')
    this._name = name
  }
  // @decorator NOTE 不能同时在 getter setter 同时使用
  get name () {
    return this._name
  }
  @decorator
  set name (name: string) {
    this._name = name
  }
  getInfo (@paramDecorator name: string, age: number) {
    console.log(name, age)
  }
}
const user = new User('Jack')
console.log(user.name)
user.age = 20
console.log(user.age)
user.name = 'JackChou'
console.log(user.name)

// 总结：
// 方法装饰器
// 1. 类的方法装饰在定义后执行
// 2. 参数：普通方法，target 是类的原型 静态方法，target 是类的构造函数。第二个参数是被装饰的方法名称，第三个参数是方法描述对象
// 3. 装饰内注意 this 的指向

// 属性装饰器
// 1. 属性装饰在定义后执行
// 2. 装饰器参数：第一个为原型，第二个为属性名称
// 3. 返回描述对象可对属性进行配置

// 参数装饰器

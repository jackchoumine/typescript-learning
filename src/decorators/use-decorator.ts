// @ts-nocheck
/*
 * @Description : 使用装饰器
 * @Date        : 2021-10-26 00:15:49 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-04-09 19:31:12 +0800
 * @LastEditors : JackChou
 */
const userInfo = void 0

function catchError (message: string) {
  return function (prototype: any, name: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value
    descriptor.value = function (...args: any[]) {
      try {
        // console.log(this)
        method.apply(this, args)
      } catch (error) {
        console.log(message)
      }
    }
  }
}

class User {
  constructor (name: string, age: number) {
    this.name = name
    this.age = age
  }
  @catchError('age 不存在')
  getAge () {
    return userInfo.age
  }
  getName () {
    try {
      return userInfo.name
    } catch (e) {
      console.log(e)
    }
  }
}
const user = new User('jack', 30)
// console.log(user.getName())
console.log(user.getAge())

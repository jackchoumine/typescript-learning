// @ts-nocheck
/*
 * @Description : 类的装饰器
 * @Date        : 2021-10-25 22:17:33 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-25 23:33:29 +0800
 * @LastEditors : JackChou
 */

console.log('类的方法的装饰器-----')

/**
 * 方法装饰器：可在类的方法定义时对类的方法进行某些操作
 * @param prototype 普通方法，target 是类的原型 静态方法，target 是类的构造函数
 * @param methodName 被装饰的方法名称
 * @param descriptor 方法描述对象
 */
function decorator(prototype: any, methodName: string, descriptor: PropertyDescriptor) {
  console.log('decorator')
  console.log(prototype)
  console.log(methodName)
  console.log(descriptor)
  const originalMethod = descriptor.value
  descriptor.value = function () {
    console.log('decorator')
    // NOTE this 是实例化的对象
    console.log(this)
    return originalMethod.apply(this, arguments)
    // return 'descriptor.value()'
  }
}

// @decorator
class User {
  // @decorator // NOTE 构造函数没装饰器
  constructor(public name: string) {
    console.log('User ')
    this.name = name
  }
  @decorator //('/user')())
  getName() {
    return this.name
  }
}
const user = new User('Jack')
console.log(user.getName())

// 总结：
// 1. 类的方法装饰在定义后执行
// 2. 参数：普通方法，target 是类的原型 静态方法，target 是类的构造函数。第二个参数是被装饰的方法名称，第三个参数是方法描述对象
// 3. 装饰内注意 this 的指向

// @ts-nocheck
/*
 * @Description : 类的装饰器
 * @Date        : 2021-10-25 22:17:33 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-25 23:01:53 +0800
 * @LastEditors : JackChou

console.log('类的装饰器-----')

// 声明装饰器参数类型
type Constructor = new (...args: any[]) => any

function decorator() {
  return function <C extends Constructor>(constructor: C) {
    // 直接修改原型
    // constructor.prototype.getAge = () => {
    //   return 20
    // }
    console.log('decorator')
    return class extends constructor {
      // NOTE 先执行父类的构造函数，再执行子类的构造函数，父类的属性被修改
      name = 'Tom'
      getAge() {
        return 20
      }
    }
  }
}

// 使用工厂函数返回装饰器，可实现传递参数和解决参数提示不存在的问题
function decorator1(flag: boolean) {
  if (flag) {
    // 其他逻辑
    return function (constructor: any) {
      console.log('decorator1')
    }
  } else {
    return function (constructor: any) {}
  }
}

// NOTE 执行顺序：从下到上，从右到左
// @decorator
// @decorator1(true)

class User {
  constructor(public name: string) {
    console.log('User ')
    this.name = name
  }
  getName() {
    return this.name
  }
}

// NOTE 将需要装饰的类传递给装饰器，装饰器返回新的类，解决类型提示问题
const DecoratorUser = decorator()(User)

// const testUser = new User('Jack')
// const testUser1 = new DecoratorUser('Jack')
// console.log(testUser1.getName())
// console.log(testUser1.getAge())

// 总结：
// 1. 装饰器是一个特殊的函数，在引入是执行该函数
// 2. 类的装饰器的参数是构造函数，可在装饰器内部修改类的属性、扩展类等
// 3. 使用工厂函数返回装饰器，然后将需要装饰的类转入，返回一个新的类，解决类型提示问题

// 4. 构造函数的类型：`type Constructor = new (...args: any[]) => any`
*/

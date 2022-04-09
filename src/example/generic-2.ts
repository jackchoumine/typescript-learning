/*
 * @Description: 泛型类和泛型约束
 * @Date: 2020-05-21 01:02:56
 * @Author: JackChouMine
 * @LastEditTime: 2021-10-24 22:41:48 +0800
 * @LastEditors : JackChou
 */
// 泛型可用在接口和函数中，还可以用在类中
// TODO Log<T> 所有声明都必须具有相同的类型参数
// class Log<T> {
//   public run(value: T) {
//     console.log(value);
//     return value;
//   }
//   // static age<T>: 泛型不能用于类的静态成员
// }

// const myLog = new Log<number>(); // 实例化是只读类型
// myLog.run(2);
// const yourLog = new Log(); // 实例化时不指定类型
// yourLog.run({ age: 34 }); // 可传递任意类型

// TODO 泛型约束：约束泛型的类型，比如我们希望参数都有一个 length 属性、某某方法

interface Length {
  length: number
}
function hisLog<T extends { length: number }> (value: T): T {
  console.log(value, value.length)
  return value
}
hisLog('123')
hisLog(['123'])
// hisLog(2); // 参数不具备 length 属性，报错：类型的参数不能赋给类型“Length”的参数。
hisLog({ name: 'jack', length: 23 }) // 传递一个具有 length 属性的对象

// NOTE 总结
/**
 * 1. 函数和类可轻松实现多种类型的支持，提高可扩展性
 * 2. 不必写多条函数重载和冗余的联合类型，代码更可读
 * 3. 明确类型之间的约束，团队更好协作
 * 4. 编辑器代码提示更加友好
 */
class Queue<T> {
  private data: T[] = []
  push (item: T) {
    this.data.push(item)
  }
  pop () {
    return this.data.pop()
  }
}

const queue = new Queue<string>()
queue.push('123')
queue.push('124')
// NOTE 搜索类型声明
// https://www.typescriptlang.org/dt/search?search=

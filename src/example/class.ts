/*
 * @Description:TS类
 * @Date: 2020-05-14 00:38:53
 * @Author: JackChouMine
 * @LastEditTime: 2022-04-09 19:36:55 +0800
 * @LastEditors : JackChou
 */
/**
 * 无论在TS还是JS，类成员的属性都是实例属性，不是原型属性，方法是实例方法
 */

/**
 * 类说明
 */
class Dog {
  public static city = 'ChengDu'
  public name: string
  protected age = 20 // 给属性初始化，可不必在构造函数中初始化
  private id = 'jackChouName'// 可选属性可不初始化
  protected constructor (name: string) {
    this.name = name // 实例属性必须有初始化值或者再构造函数中被初始化
  }
  public run () {
    console.log('我的年纪是', this.age)
  }
  public speak () {
    console.log('我的名字叫', this.name)
    return this.id
  }
}
console.log(Dog.prototype); // 不含 name 属性
console.log(Object.getPrototypeOf(Dog)); // 不含 name 属性
// const dog = new Dog('小白')//创建实例，会调用构造函数，构造函数默认是 public 成员，把构造函数生成成受保存成员，该类不能创建实例，只能做基类
// console.log(dog)// 内部属性只在实例上，不在原型上
// console.log(dog.city)//实例无法访问静态成员
// console.log(Dog.city)// 类访问静态成员
// console.log(dog.age) // 受保护成员，实例不可访问
// console.log(dog.run()) // 实例方法中使用受保护成员
// console.log(dog.speak()) // 共有方法访问私有成员

// console.log(Object.getPrototypeOf(dog))

// tslint:disable-next-line: max-classes-per-file // TS 一个文件只允许声明一个类
class Husky extends Dog {
  // 在构造函数中对参数进行注解，就不用额外声明
  constructor (name: string, public color: string) {
    super(name)// 类继承时，必须先调用父类方法
    this.color = color
  }
}
const husky = new Husky('wangwnag', 'black');
console.log(Husky.city); // 静态成员被继承
console.log(husky);
console.log(husky.color);
console.log(husky.name);
// console.log(husky.id)// 子类实例无法访问父类的私有属性
// console.log(husky.age) // 子类访问不到父类的受保护成员
console.log(Object.getPrototypeOf(husky)); // Dog 类
console.log(Object.getPrototypeOf(Husky)); // Dog 构造函数
console.log(Husky.prototype); // Dog 类
console.log(Object.getPrototypeOf(husky)); // Dog 类

// 成员修饰符
// public 共有成员，默认修饰符，类中可见，可继承，实例可见
// protected 受保护成员，类和子类中可见，实例不可见
// private 私有成员，类中可见，不可继承，实例不可见
// static 静态，类访问，可继承，实例不可访问

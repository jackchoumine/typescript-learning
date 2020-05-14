/*
 * @Description: 类与接口
 * @Date: 2020-05-14 22:39:18
 * @Author: JackChouMine
 * @LastEditTime: 2020-05-14 23:13:06
 * @LastEditors: JackChouMine
 */

// 接口把类成员都抽象了出来，只有类的接口而无实现
interface Human {
  // new(name: string) // 试图约束类的构造函数，在类实现接口时会报错
  name: string
  eat(): void
}

// 使用类实现接口
// 必须实现所有接口的成员，类可添加自己的成员
// 接口只能约束类的公有成员
// 接口不能约束类的构造函数
class Asian implements Human {
  constructor(public name: string) {
    this.name = name;
  }
  public eat() { }
  public sleep() { }
}

// 接口继承
// 接口像类一样，可相互继承，几个接口可继承多个接口
interface Man extends Human {
  run(): void
}
interface Child {
  cry(): void
}
interface Boy extends Child, Man { }

const boy: Boy = {
  name: 'boy',
  eat() { },
  run() { },
  cry() { }
  // sleep() { }
};

// tslint:disable-next-line: max-classes-per-file
class Auto {
  public state = 1;
}

// 接口继承类，会把类的成员抽象出来,公有成员、受保护成员、私有成员
// tslint:disable-next-line: no-empty-interface
interface AutoInterface extends Auto { }

// tslint:disable-next-line: max-classes-per-file
class C implements AutoInterface {
  public state = 2;
}

// Auto 的子类实现 AutoInterface 接口
// tslint:disable-next-line: max-classes-per-file
class Bus extends Auto implements AutoInterface {

}

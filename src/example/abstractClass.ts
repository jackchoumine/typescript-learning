/*
 * @Description: 抽象类
 * @Date: 2020-05-14 01:43:24
 * @Author: JackChouMine
 * @LastEditTime: 2020-12-06 18:34:47 +0800
 * @LastEditors: JackChouMine
 */
/**
 * 抽象类：只能被继承的类，可声明属性和方法，方法可实现，也可在子类中实现
 * 在 class 前面使用 关键词 abstract 声明
 */
abstract class Animal {
  public age: number
  constructor (age: number) {
    this.age = age
  }
  // 在抽象类中实现方法
  public makeLove () {
    console.log('have sex')
  }
  public abstract sleep (): void // 抽象方法需要在子类中实现
}
// tslint:disable-next-line: max-classes-per-file
class Cat extends Animal {
  constructor (age: number, public name: string, public food: string, public legSize: number) {
    super(age)
    this.name = name
    this.food = food
    this.legSize = legSize
  }
  public eat () {
    console.log(`吃${this.food}了`)
  }
  public run () {
    console.log(`我用${this.legSize}只脚运动`)
  }
  public sleep () {
    console.log('cat sleep')
  }
}
const cat = new Cat(2, 'small dog', 'bone', 4)
console.log(cat)
console.log(cat.makeLove())
console.log(cat.sleep())

// tslint:disable-next-line: max-classes-per-file
class Fish extends Animal {
  constructor (public age: number) {
    super(age)
  }
  public sleep () {
    console.log('fish sleep')
  }
}

// 多态:多个类继承同一个抽象类，同一个抽象方法具有不同的实现

const fish = new Fish(2)
const animals = [cat, fish]
animals.forEach((v) => {
  v.sleep()
})

// 方法返回 this ,可实现链式调用
// tslint:disable-next-line: max-classes-per-file
class WorkFlow {
  public up () {
    console.log('up')
    return this
  }
  public eat () {
    console.log('eat')
    return this
  }
  public work () {
    console.log('work')
    return this
  }
}

// tslint:disable-next-line: max-classes-per-file
class MyWorkFlow extends WorkFlow {
  public goHome () {
    console.log('goHome')
    return this
  }
}

const workFlow = new WorkFlow()
workFlow.up().eat().work()
new MyWorkFlow().goHome().eat().goHome() // 父子类之间的链式调用

/*
 * @Description: 枚举类型
 * @Date: 2020-05-11 01:06:32
 * @Author: JackChouMine
 * @LastEditTime: 2022-04-09 19:36:42 +0800
 * @LastEditors : JackChou
 */
/*
枚举：一组有名字的变量的集合。
将硬编码和可能改变的常量抽象成枚举，可提高程序的可读性和可维护性。
*/
// 数字枚举
// 值会根据给出的值递增
// 具有反向映射特性
enum Role {
  // 枚举成员
  Reporter,
  Developer,
  Maintainer,
  Owner,
  Guest,
}
console.log(Role.Reporter)
console.log(Role.Developer)
console.log(Role[2])
// 反向映射：枚举成员可作为key,值可以作为key访问成员
/*
  (function (Role) {
    Role[Role["Reporter"] = 0] = "Reporter";
    Role[Role["Developer"] = 1] = "Developer";
    Role[Role["Maintainer"] = 2] = "Maintainer";
    Role[Role["Owner"] = 3] = "Owner";
    Role[Role["Guest"] = 4] = "Guest";
  })(Role || (Role = {}));
*/
// 字符串枚举
// 使用 = 声明枚举成员的值，没反向映射特性
enum Message {
  Success = '恭喜你，成功了',
  Fail = '抱歉，失败了',
}
// 异构枚举
// NOTE 不推荐使用
enum Answer {
  N,
  Y = 'Yes',
}

// 枚举成员的性质
// Role.Guest = 4//枚举成员只读，不可修改
// 枚举成员分类
enum Char {
  // 常量 const，在编译时计算出结果，以常量的形式出现在运行时
  a,
  b = Char.a,
  c = 1 + 2,
  // 计算类型成员  computed member,非常量表达式，值在运行阶段确定
  d = Math.random(),
  e = '122'.length,
  // f//computed member 之后的枚举成员，必须赋值
}

// 常量枚举：使用 const 声明
// 会在编译时被移除
const enum Month {
  Jan = 1,
  Feb,
  Mar,
}
const months = [Month.Jan, Month.Feb, Month.Mar]

// 以上代码被编译成
// const months = [1 /* Jan */, 2 /* Feb */, 3 /* Mar */]

// 在什么场景下使用常量枚举：我们需要一个不可变对象的成员时使用枚举常量枚举代替。

// 使用枚举类型
enum E {
  a,
  b,
}
enum F {
  a = 1,
  b = 3,
}
// 声明一个枚举类型的值，并赋值，赋的值可超出枚举成员
const e: E = 3
const f: F = 3
// e === f//不同类型的枚举不可进行比较
const e1: E.a = 1 // 枚举成员作为类型
const e2: E.b = 1
let e3: E.a = 3
// e1 === e2 // 不同枚举成员类型不可比较
console.log(e1 === e3) // 相同枚举成员声明的变量，是可比较的

// 使用字符串枚举
enum H {
  a = 'apple',
  b = 'banana',
}
const h1: H = H.a // 字符串枚举变量的值只能是枚举成员
const h2: H.b = H.b

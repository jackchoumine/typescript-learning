/*
 * @Description: 类型检查机制3-类型保护
 * @Date: 2020-05-23 19:58:58
 * @Author: JackChouMine
 * @LastEditTime: 2020-05-24 04:31:00
 * @LastEditors: JackChouMine
 */
enum Type {
  Strong, Weak
}
class SuperJava {
  public x: any = 'jack';
  public z: any;
  // constructor(public x: number) {
  //   this.x = x;
  // }
}
class Java extends SuperJava {
  public static y = 'static';
  public Z: any = 'Z';
  // constructor(public x: number) {
  //   super(x);
  // }
  public helloJava() {
    console.log('hello java');
  }
}
class JavaScript {
  public helloJavaScript() {
    console.log('hello JavaScript');
  }
}
function getLanguage(type: Type, x: string | number) {
  console.log('类型保护');
  const lang = Type.Strong === type ? new Java() : new JavaScript();
  // 检查实例上哪些方法，然后执行
  // 但是实例是联合类型，不能判断是哪种类型，类型断言解决
  // 类型断言的问题：需要在多处都使用类型断言，代码可读性，不易维护
  if ((lang as Java).helloJava) {
    (lang as Java).helloJava();
  } else {
    (lang as JavaScript).helloJavaScript();
  }
  // 类型保护可解决以上类型断言的问题
  // 类型保护：TS 可在特定区块中保证变量属于某种特定类型，可在该区块中放心地使用变量的属性或者方法。
  // 类型保护可让代码更加健壮，还能让IDE给出准确的代码提示。
  // 进行类型保护的方法
  // 1. instanceof 判断变量是否是类的实例
  if (lang instanceof Java) {
    lang.helloJava();
  } else {
    lang.helloJavaScript();
  }
  // 2. in 操作符 -- 判断变量和变量的原型上的某个属性的值是否为真值。
  // 和判断属性在性有区别，当存在属性，但是值为假值时，会得到错误结果
  // TODO 类中的值是否初始化为影响判断结果？如何影响的呢？
  if ('helloJava' in lang) {
    console.log('in 可检测父类的属性x吗', 'x' in lang ? '可以' : '不可以');
    console.log('属性x来自哪儿', 'x' in lang && lang.hasOwnProperty('x') ? '实例' : '父类');

    console.log('in 可检测父类的属性z吗', 'z' in lang ? '可以' : '不可以');
    console.log('属性z来自哪儿', 'z' in lang && lang.hasOwnProperty('z') ? '实例' : '父类');

    console.log('in 可检测父类的属性Z吗', 'Z' in lang ? '可以' : '不可以');
    console.log('属性Z来自哪儿', 'Z' in lang && lang.hasOwnProperty('Z') ? '实例' : '父类');

    console.log('x', lang.x);
    console.log('z', lang.z);
    console.log('可以检测静态成员吗？', 'y' in lang);
    lang.helloJava();
  } else {
    lang.helloJavaScript();
  }
  // 3. typeof 判断基本类型 string boolean number undefined Symbol function
  if (typeof x === 'number') {
    x.toFixed();
  } else {
    console.log(x.length);
  }
  // 4. 类型保护函数
  if (isJava(lang)) {
    lang.helloJava();
  } else {
    lang.helloJavaScript();
  }
  return lang;
}
function isJava(lang: Java | JavaScript): lang is Java {
  return !!(lang as Java).helloJava;
}
getLanguage(Type.Strong, 'hello');
// 总结
// 总结了四种类型保护机制，可使代码更加健壮和 IDE 提示友好，应该多利用。
console.log('************************************************************************************');
let testUndefined;
console.log(typeof 34); // number
// tslint:disable-next-line: no-construct
console.log(typeof (new Number(34))); // object
console.log(typeof (Number(34))); // object
console.log(typeof '34'); // string
console.log(typeof true); // boolean
console.log(typeof null); // object
// console.log(null instanceof Object); // false
console.log(typeof undefined); // undefined
console.log(typeof testUndefined); // undefined
console.log(typeof Symbol()); // symbol
console.log(typeof getLanguage); // function
console.log(getLanguage instanceof Object); // true
console.log(typeof void 0); // undefined
// tslint:disable-next-line: no-unused-expression
console.log(typeof void '0'); // undefined

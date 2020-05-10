# 函数

在强类型语言中，当一个对象从调用函数传递到被调用函数时，对象的类型必须和被调用函数声明的**类型兼容**。 ---Liskov, Zilles 1974

强类型语言：不允许改变变量的类型，除非强制转换。
强类型语言不允许类型的不同的变量相互赋值，可以避免很多低级错误。而弱类型语言则没有这样的限制，容易不小心犯错。
静态类型语言：在编译阶段确定所有变量类型；
动态类型语言：在执行阶段确定所有变量类型。
静态类型语言：对类型极度严格；立即发现错误；运行时性能好；自文档化。
动态类型语言：对类型约束要求低；不容易发现错误；运行时性能差；可读性差。
动态类型语言更加灵活，但是静态类型语言性能和可维护性更胜一筹。

## 函数类型

为函数约定参数和返回值，别人看到你的函数时，能清楚函数的功能，利用代码维护和协作。
### 为函数定义接口
使用变量定义函数的接口

```js
// 声明一个函数类型
let compute: (x: number, y: number) => number
// 使用一个函数初始化变量
compute = (a, b) => a + b
console.log(compute(12, 12))
```
### 完整的函数类型

### 接口定义函数类型
```js
interface Compute {
  (x: number, y: number) => number
}
```
### 类型别名定义函数类型
```js
type Compute = (x: number, y: number) => number
let compute1: Compute = (n, m) => n + m //不必声明参数
compute1(12, 40)
```
### 带属性的函数接口
```js
interface Lib {
  (): void;
  version: string;
  doSomething(): void
}
const getLib = () => {
  const lib: Lib = (() => { }) as Lib
  lib.version = '1.1.0'
  lib.doSomething = () => { }
  return lib
}
const lib = getLib()
console.log(lib())
console.log(lib.doSomething())
```
## 函数参数

### 可选参数

### 默认参数

### 剩余参数

## 重载
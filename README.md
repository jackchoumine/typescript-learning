# typescript 完全解读学习记录

## 环境搭建

```bash
npm i -g tsc typescript
tsc --init # 生成 ts 配置文件
```

## 模块

任何含有**未被嵌套**的 `export` 或者 `import` 的 TS 或者 JS 文件，就是模块。模块有自己的作用域，仅对模块内可见，即使该标识符被导出。
导出的变量和其他变量冲突，可使用 `as` 重命名或者把整个导出对象重命名。

```ts
export {} // 导出一个空对象，使得该文件成为一个模块
for (let i = 0; i < 10; i++) {
	setTime(() => {
		console.log(i)
	}, 10)
}
```

## 数据类型

JS 中的数据类型：
基础类型：string、number、boolean、symbol、undefined、null
引用类型：object

ts 对这些数据类型进行了扩展，具有枚举、void、any 等类型。

### 基本类型

1. js 中基本类型在 ts 中的声明
   类型注解：相当于强类型语言中的类型声明。
   注解方式 `variableName:type`

```ts
let age: number = 20
let name: string = 'jack'
let city: string = `chengdu` // 模板字符串
let go: boolean = true
```

> `new Boolean(false) `返回一个对象，Boolean(1) 是一个布尔类型，其他基本的构造函数类型也是如此。

null 和 undefined：

```js
let n: null = null
let u: undefined = undefined
```

null 类型的值 只有 `null`，undefined 类型的值只有 `undefined`。
`null`和`undefined`是所有类型的子类型，即可将两者的值赋给其他类型。

> 可配置 tsconfig 规则避免这种情况。

```js
"strictNullChecks": false
```

空值 void，用来表示无返回值的函数，void 变量只能赋值 `undefined` 和 `null`，不能被赋值给其他类型。void 是一个操作符，获取 undefined。

> void 的真正作用是指定函数的返回值。

```js
let test: void = undefined
// 报错
let test2: void = null
const fun = (): void => {
	console.log('这是一个没有返回值的函数')
}
```

任意类型或动态类型 **any**，任意类型的变量，可被赋任类型的值，和其他类型相互兼容，恢复 JS 动态语言的特性。不推荐使用任意值，否则使用到处 TS 的目的就丧失了。未声明类型，会被识别成任意类型。

> TS 引入 any 的原因是为可和 JS 交互，因为我们需要和 JS 编写的库交互，而类型未知。将变量声明为 any 类型，编辑器可能失去代码提示。

```js
let name: any = 23,
	name = 'jack'
```

**unknown** 类型，可被赋值任意类型的值，但是不能赋值给除了`unknown` 或者 `any` 意外类型的变量，只能将 unknown 类型的变量赋值给 any 和 unknown。

> any 和 unknown 的最大区别是，unknown 是 top type (任何类型都是它的 subtype) , 而 any 即是 top type, 又是 bottom type (它是任何类型的 subtype ) , 这导致 any 基本上就是放弃了任何类型检查。unknown 比 any 更加安全。它迫使我们执行额外的类型检查来对变量执行操作。

**never** 类型，不存在值的类型，比如一个函数内部抛出错误，一个函数有死循环。
never 类型的值，只能被赋值 never 类型的值，将一个可能报错的函数赋值给它。

```js
// 这样是错误的
// let hello: never = never

let fun = (): never => {
	throw new Error('报错')
}
// 不会优雅的返回的函数 往往作为 never 类型的值。
let neverVar: never = (() => {
	throw new Error('报错')
})()
```

### 复杂类型

基本类型声明都比较直观，需要注意的是其他类型的声明。

1. 数组类型

声明数组是，可以声明数组元素的类型。
① `type []` 往往用来声明单类型数组

```js
let array: number[] = [1, 2, 3, 4]
// 混合数组,元素类型有多种
let arr1: (number | string)[] = [1, 'string']
```

② `Array<type>` 多类型数组

```js
let test: Array<string> = ['jack']
let test2: Array<string | number | object> = [
	'jack',
	2,
	'string',
	{ name: 'hello' },
]
// 类型中没有 undefined,元素有 undefined，报错
let test3: Array<string | number | object> = [
	'jack',
	2,
	'string',
	{ name: 'hello' },
	undefined,
]
```

③ 元组---特殊的数组
长度固定、每个元素都指定类型的数组，元组的目的不是想数组一样使用，而是用于描述**格式固定**的数组。

```ts
const tuple: [string, number] = ['jack', 23]
const tuple2: [string, number][] = [['jack', 23]]
```

④ 对象数组

```js
let objectArr: { age: number, name: string }[] = [
	{ age: 23, name: 'jack' },
	{ age: 18, name: 'Tom' },
]
```

2. 对象

```js
let testObj2: object = { name: 'jack' }
let testObj3: { name: string } = { name: 'jack' }
```

3. 枚举
   ts 中的枚举和定义对象类似, 使用`enum`声明，是常量的集合。

```js
enum CardSuit {
  car,
  club = 10,
  heart,
  diamonds = 1
}
console.log(CardSuit.car) // 0
console.log(CardSuit.club)// 10
console.log(CardSuit.heart)// 11
console.log(CardSuit[1]) // diamonds 反向访问
```

不显示赋值，第一个枚举成员被赋值为 0，依次增加，可以是值获取成员，即枚举成员值为数值的枚举具有反向访问性质。

字符串枚举

```js
enum CardSuit {
  car = 'card',
  club = 10,
  heart,
  diamonds = 1
}
console.log(CardSuit['card']) // 报错，但是运行不报错
console.log(CardSuit.car) // card
console.log(CardSuit.club)// 10
console.log(CardSuit.heart)// 11
console.log(CardSuit[1]) // diamonds
```

> 函数参数如何指定为枚举类型？

```js
type enumCard = typeof CardSuit // type 自定义一个类型
function testFun(key: number, enumValue: enumCard): any {
	return enumValue[key]
}
console.log(testFun(11, CardSuit))
//TODO 将 key 声明成 string，报错
// 如何返回两种类型的值
```

第二种，不太方便集中维护枚举值。

```js
function testFun(enumValue: 'jack' | 'tom'): any {
	return enumValue
}
console.log(testFun('tom'))
```

4. 联合类型
   有时候，一个变量，可能是数值类型，可能是字符串，此时可用联合类型来声明。

```js
let test: string | number
test = 14
test = '24'
```

> 只能访问联合类型的共有属性和方法。

```js
function getString(something: string | number): string {
	return something.toString()
}
```

### 类型推导

变量在没有声明类型就被赋值，编译器会**根据值来推测类型**，后面将其他类型的值赋值给该变量，会报错。

```js
let test = 'jack' // test 类型为 string
test = 23 //报错
```

> 声明时没被赋值，会被推导成 `any`。

```js
let test
test = 23
test = '23'
```

### 类型断言

手动指定变量类型，叫作类型断言。比如为联合类型的指定具体的类型。

```js
function getLength(something: string | number): number {
	return something.length // 参数为数值时，报错
}
```

使用类型断言：`<type>` 或者 `variable as type`

```js
const getLength: (target: string | number) => number = (target: string | number): number => {
  if ((<string>target).length || (target as string).length) {
    return (<string>target).length
  } else {
    return target.toString().length
  }
}
```

> 注意 TS 中 `=>` 和箭头函数`=>`的区别，TS 的`=>`的左边为类型输入，右边为类型输出。

> 类型断言不是类型转化。在 TS 中没有类型转换，以为类型转换是发生在运行时的，而 TS 只能获得编译时的支持。为了补救，提出类型断言。
> 不能进行类型不兼容的断言，类型断言不改变运行时的类型。
> 那些类型是兼容的呢？

> TS 如何进行类型转换？调用相关的类型转换函数。
> 类型断言在和 Web API 交互时，会带来极大便利。

### 函数类型

使用 `typeof` 检测函数，会得到`function`字符串，但是 JS 没有函数类型，实际上，函数的类型 object。但是 TS 可定义一个变量为函数类型。
声明一个函数类型，指定参数类型和返回值类型即可。
比如：

```ts
const addTwo: (a: number, b: number) => number = (a, b) => {
	return a + b
}
```

> 声明了函数类型，函数定义中可不用声明参数类型。当函数的参数是一个函数时，就要使用函数类型指定参数的输入和输出类型。在回调函数指定类型，IDE 会提示参数的类型，给编码带来极大便利。

类型别名，可将函数类型定义成类型别名，然后就可以像类型一样使用了。

```ts
type twoSum = (a: number, b: number) => number
const addTwo: twoSum = (a: number, b): number => {
	return a + b
}
```

函数类型兼容条件：

- 实参函数和形参函数的返回值类型兼容；
- 实参函数的参数数据不少于形参函数的参数数量；
- 实参函数和形参函数的对应位置的参数类型兼容。

## 在函数中声明类型

JS 的函数的参数是可有可无的--有参数可不传递参数，无参数可传递，而 TS 改变了这一局面。

① 普通函数声明

```js
// 函数声明
function fun(age: number): string {
	return age.toString()
}
// 函数表达式 fun1的类型可根据左侧的表达式推导出来
const fun1 = (age: number): string => {
	return age.toString()
}
// 给函数添加类型
const funAge: (age: number) => string = (age: number): string => {
	return age.toString()
}
```

② 可选参数

```js
//可选参数 可选参数必须在必需参数的后面
function buildName(firstName: string, lastName?: string) {
	if (lastName) {
		return firstName + ' ' + lastName
	} else {
		return firstName
	}
}
let tomcat = buildName('Tom', 'Cat')
let tom = buildName('Tom')
```

③ 默认参数

默认参数可以在必需参数前面，但是使用默认参数时，必须显示得传递 undefined。**有默认值的参数放在必需参数后面才是最佳实践**。

```js
// 默认参数可以在必需参数前面，但是使用默认参数时，必须显示得传递 undefined
function buildName(firstName: string = 'Cat', lastName: string) {
	return firstName + ' ' + lastName
}
let tomcat = buildName('Tom', 'Cat')
let tom = buildName(undefinded, 'Tom')
```

④ 剩余参数

明确声明的参数以外参数组成一个数组，**剩余参数放在最后**。

```js
function sum(first: number = 0, ...rest: number[]): number {
	return rest.reduce((total, current) => total + current) + first
}
sum(1, 2, 3, 4, 5, 6) //21
sum(undefined, 2, 3, 4, 5, 6) //20
```

> 可选参数、剩余参数、默认参数同时出现在参数中，顺序是怎样的？

剩余参数最后，必需参数第一个，默认参数和可选参数居中，它们的顺序任意。实际上，默认参数是可选参数一种。最佳实践：

> 必需参数、默认参数、可选参数、剩余参数。

⑤ 参数为对象或者数组

```js
function printInfo(person: {
	name: string,
	age: number,
	scores: number[],
}): { name: string, age: number, total: number } {
	const total = person.scores.reduce((total, current) => total + current)
	const { name, age } = person
	return { name, age, total }
}
```

⑥ 函数作为参数

⑦ 函数作为返回值

⑧ Promise 作为参数

⑨ Promise 作为返回值

## symbol 类型

### symbol 的使用

symbol 表示唯一的值，可传入字符串、数值、undefined 作为标识。

```js
const s1 = Symbol()
const s2 = Symbol('jack')
const s3 = Symbol('jack')
// s2 和 s3 是两个不同的变量
```

严格模式下，对象不能包含同名属性，否则前面的属性被后面的属性覆盖。

```js
{name:'jack',name:'小明'}
```

将 symbol 变量作为属性名，可解决此问题。

```js
const name = Symbol('name')
test obj = {[name]:'jack',name:'小明'}//变量作为属性名，必须使用 []
```

### symbol 属性遍历

1. symbol 属性在 for-in 中遍历不到

```js
for (const key in obj) {
	console.log(key) // name
}
```

2. Object.keys 拿不到 symbol 属性
3. Object.getOwnPropertyNames 获取不到 symbol 属性
4. Reflect.ownKeys 可获取到 symbol 属性
5. JSON.stringify 不能转化 symbol 属性

### Symbol 的方法

`Symbol.for` 创建 symbol 变量时，会去寻找该标识符的 symbol 是否已存在，存在则使用存在的，否则新建。

`Symbol.keyFor`，获取 Symbol.for 创建的 symbol 的标识符。

```js
const s8 = Symbol('jack')
const s9 = Symbol.for('jack')
const s10 = Symbol.for('jack')
console.log(s8 === s9) //false
console.log(s10 === s9) //true
console.log(Symbol.keyFor(s10)) //jack
console.log(Symbol.keyFor(s8)) //undefined
```

### symbol 的属性

1. Symbol.hasInstance
   一个对象拥有 `Symbol.hasInstance` 函数，使用 `instanceof `判断类型时，会调用该函数。

```js
const inObj = {
  [Symbol.hasInstance](obj: object) {
    console.log('Symbol.hasInstance')
    console.log(obj)
  }
}
const jack = { name: 'jack' }
console.log(jack instanceof <any>inObj)
```

2. iterator 遍历器

可给一个数组增加遍历器，数组就具有遍历器方法。

```js
const testArry = [1, 2, 3]
// 返回一个遍历器
const iterator = testArry[Symbol.iterator]()
console.log(iterator)
console.log(iterator.next())
```

3. Symbol.isConcatSpreadable

`Symbol.isConcatSpreadable` 设置为 false，数组调用 `concat` 方法连接两个数组时，对具有`Symbol.isConcatSpreadable` 值为 false 的数组不进行扁平化。

## 类

### ES5 基于原型的类

```js
// ES5 的类
function Point(x, y) {
	this.x = x
	this.y = y
}
// 原型方法
Point.prototype.getPosition = function () {
	return `(${this.x},${this.y})`
}
let p1 = new Point(1, 2)
console.log(p1)
console.log(p1.getPosition())
```

重写原型实现继承。

### ES6 的类

```js
class Point {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
	getPosition() {
		return `(${this.x},${this.y})`
	}
}
let p1 = new Point(2, 3)
console.log(p1)
console.log(p1.getPosition())
console.log(p1 instanceof Point)
console.log(p1.hasOwnProperty('x'))
console.log(p1.hasOwnProperty('getPosition'))
console.log(p1.__proto__.hasOwnProperty('getPosition'))
```

class 关键字定义的类，不通过 new 调用，会报错。

```js
let info = {
	_age: 18,
	// 存值函数
	set age(age) {
		if (age > 18) console.log('怎么老了')
		else console.log('我还年轻')
	},
	// 取值函数
	get age() {
		console.log('获取年纪')
		return this._age
	},
}
console.log(info._age)
console.log(info.age)
info.age = 20
info.age = 17
```

静态方法，类直接调用的方法，实例不可调用，因为实例不继承静态方法。在类中使用关键字 `static` 声明的方法为静态方法。
静态属性，ES6 目前不支持静态属性，有办法写静态属性，但是不推荐。

`mew.target` 检查函数或者构造函数是否通过`new`运算符调用的，`new.target`指向一个构造方法和函数的引用。通过 class 关键字定义的类，不通过 new 调用，会报错。

### ES6 的继承

ES6 中使用 关键字 `extends` 实现继承，在子类中调用`super`传递父类的参数。

```js
class Parent {
	constructor(name) {
		this.name = name
	}
	static hello() {
		console.log('Hello World')
	}
	getName() {
		return this.name
	}
}
class Child extends Parent {
	constructor(name, age) {
		super(name) //必须先调用 super 传递父类的参数
		this.age = age
	}
}
const jack = new Child('jack', 23)
console.log(jack.getName())
// 报错
//console.log(jack.hello())//子类实例不能调用父类静态方法
console.log(Child.hello()) //子类可调用父类静态方法
console.log(jack instanceof Child) //true
console.log(jack instanceof Parent) //true
```

super 函数，该函数指向父类的构造函数。
super 作为对象

1. 在普通方法中，指向父类的原型
2. 在静态方法，指向父类

### 类的继承

## 接口

# 高效的 TS ---- 第二章笔记

TS 的类型系统非常强大，能够表达你可能不期望类型系统能表达的东西。深入理解类型系统是高效使用 TS 和读懂高级代码的关键。

## 用好编辑器类询问和探索类型系统

安装 ts，会得到两个可执行文件：

- tsc，即 ts 编译器；
- tsserver，ts 独立的服务器。

tsserver 提供了语言服务：自动补全、检查、定义导航和重构等，充分使用好这些服务，是提高编码效率的关键。

把鼠标移动到某个变量上，即可看到其类型。

> 理解条件分支的类型变化

```ts
function logMessage(message: string | null) {
  if (message) console.log(message)
}
```

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h1m9553oxqj217y064gmw.jpg)

> 理解大对象中的属性的类型

```ts
const bigObject = {
  x: [1, 2, 3], // number[]
  bar: {
    name: 'tomato',
  },
}

type BarType = typeof bigObject['bar'] // 获取 bar 属性的类型
```

`x`的类型是`number[]`，如何希望是`[number,number,number]`，就需要显示声明。

> 查看链式调用里的类型

```ts
function restOfPath(path: string): string {
  return path.split('/').slice(1).join(path)
}
```

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h1m9du6mstj21xa0jyaed.jpg)

`split`返回一个字符串数组，然后`slice`接着操作这个数组。

这些信息在阅读和调试时极为有用。

> 从类型错误提示中学习

```ts
function getElement(elOrId: string | HTMLElement | null): HTMLElement {
  // 不能将类型“HTMLElement | null”分配给类型“HTMLElement”。
  //  不能将类型“null”分配给类型“HTMLElement”。
  if (typeof elOrId === 'object') return elOrId // elOrId 可能为null, 和返回值类型不兼容
  else if (elOrId === null) {
    return document.body
  } else {
    // 不能将类型“HTMLElement | null”分配给类型“HTMLElement”。
    //  不能将类型“null”分配给类型“HTMLElement”。
    return document.getElementById(elOrId) // 可能为 null, 和返回值类型不兼容
  }
}
```

修改：首先排除`null`、最后的条件语句做非空断言。

```ts
function getElement(elOrId: string | HTMLElement | null): HTMLElement {
  if (elOrId === null) {
    return document.body
  } else if (typeof elOrId === 'object') {
    return elOrId
  } else {
    return document.getElementById(elOrId)!
  }
}
```

> 定义跳转：按住 `option` + 点击。

> 优雅地使用注释

使用

`/** */` 注释属性、`doc` 注释函数等，能得到编辑器友好的提示。

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h1m9tp2o4tj20zm0gsmz1.jpg)

除了以上功能，还有其他功能：

> 自动完成必需属性输入

……

## 将类型视为值的集合

> 将`类型`视为**一组**`可能的值`的`集合`，这个集合称为类型的域。

最小的集合是空集，不包含任何值，对应 `never` 类型。因为它的域是空的，即集合里没有成员，那么没有值可赋值给 never 类型的变
量。

次小的集合是包含单个值的集合，对应字面量类型，也称为单位类型。

```ts
type A = `A` // 字符串字面量
type B = `B`
type Twelve = 12
type AB12 = 'A' | 'B' | Twelve // 集合 {'A', 'B',12}
```

> 多个值的类型，联合单位类型 --- 集合的并集

```ts
type AB12 = 'A' | 'B' | Twelve
```

> 理解可赋值和集合的关系

```ts
const a: AB12 = `A`
const c: AB12 = `c` // 不能将类型“"c"”分配给类型“AB12”
```

`可复制`、`可分配` 在集合的上下文中，想要赋的值，要么是集合的成员，要么是集合的子集，否则提示不可赋值。

```ts
const twelve: AB12 = 12 // 正确，12 是 {'A', 'B',12} 的成员
```

> 几乎的所有的类型检查，都在检查一个集合是否为另一个集合的子集。

有限集很很好判断范围，实际开发中，常常是无限集，无限集的类型推断就很困难。

总结两种构造类型的方式，可应对大部分无限集。

```ts
type Int = 1 | 2 | 3 | 4 | 5 //|..... 举例成员
interface Person {
  // 描述成员特征
  name: string
  age: number
}
```

接口、别名是集合中成员特征的描述。

> 理解交叉类型是属性的并集

```ts
interface LifeSpan {
  birth: Date
  death?: Date
}
type PersonSpan = Person & LifeSpan

const personSpan: PersonSpan = {
  name: 'tom',
  age: 18,
  birth: new Date(),
}
```

> extends 可理解为`...的子集`

```ts
interface PersonSpan extends Person {
  birth: Date
  death?: Date
}

// PersonSpan 是 Person 的子集
interface PersonSpan extends Person {
  birth: Date
  death?: Date
}

const personSpan: PersonSpan = {
  name: 'tom',
  age: 18,
  birth: new Date(),
}

const person: Person = {
  name: 'tom',
  age: 18,
  birth: new Date(),
} as PersonSpan
// 把这个字面量推断为 PersonSpan 的成员，而 PersonSpan 是Person的子集
// 没有这个推断，报错
```

> 子类型等同于子集

```ts
// PersonSpan 是 Person 的子类型
interface PersonSpan extends Person {
  birth: Date
  death?: Date
}
```

再看一个例子

```ts
interface Vector {
  x: number
}

// Vector2D 是 Vector 的子类型 Vector2D is subtype of Vector
// Vector2D 是 Vector 的子集 即 Vector2D  ⊆  Vector
interface Vector2D extends Vector {
  y: number
}

interface Vector3D extends Vector2D {
  z: number
}
```

类型关系的层次结构和集合关系：

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h1mb94jvtrj221y0u0gvy.jpg)

把以上接口改成不带 `extends`的接口声明，集合关系和层次关系不会改变，集合关系不变很好理解，为何层级结构也不变呢？ts 的类
型只关注值的结构，`不关注值的来源`。

```ts
interface Vector {
  x: number
}

interface Vector2D {
  x: number
  y: number
}

interface Vector3D {
  x: number
  y: number
  z: number
}
```

使用集合理解对象类型，是非常容理解的，当使用集合理解字面量类型、联合类型和泛型约束时，会更加直观。

extends 可作为约束条件在泛型中出现。

```ts
function getKey<K extends string>(val: any, key: K) {}
```

如何理解`K extends string`?

K 是`string`的子集：字符串类型、字符串字面量类型、字符串字面量类型的联合类型。

```ts
getKey({}, 'name') // 'name'
getKey({}, Math.random() > 0.5 ? 'name' : 'age') // 'name' | 'age'
getKey({}, document.title) // title 是 string 类型
getKey({}, 3) // ❌ 类型“number”的参数不能赋给类型“string”的参数
```

> 使用集合理解元祖和数组

```ts
const list = [1, 2] // number[]
const tuple: [number, number] = list //❌ 目标仅允许 2 个元素，但源中的元素可能不够，可能超出
```

实际上，ts 将元祖建模为`{0:number,1:number,length:2}`，不能将数组赋值给元祖也就容易理解了。

总结：从集合看类型，那么**具有相同的值的集合的类型是相同的**。

| ts                                 | 集合       | 例子                              |
| ---------------------------------- | ---------- | --------------------------------- |
| never                              | 空集       |                                   |
| 字面量类型                         | 单元素集合 | `type A='A'`                      |
| a 可赋给 T 类型的变量              | a ∈ T      | `const a:number=1`                |
| A 类型的值 a 可赋值给 B 类型变量 b | A ⊆ B      | `const a:A= valueA;const b:B = a` |
| A extends B                        | A ⊆ B      | `k extends string`                |
| A\|B                               | A⋃B        | `type AB = 'A'\|'B'`              |
| A&B                                | A⋂B        |                                   |
| unknown                            | 全集       | 任何值都可赋值给`unknown`的变量   |

易错点：

对象类型，`A&B`的值具有 A 和 B 的属性。

## 如何区分类型空间和值空间

TS 中一个`符号`，要么属于类型空间，要么属于值空间。

属于类型空间的情况：

```bash
type a
interface b
const a:type = 1 # : 类型声明符号后的符号
as type # type 是类型空间
```

`=` 后面的符合属于值空间。 `class` 和 `enum`同时引入了类型间和值空间。

相同的符合在类型和值的上下文中，具有不同的含义。

类型中，`typeof`接收一个值，返回值的类型。值上下文中，返回类型的字符串
：`string`、`number`、`boolean`、`undefined`、`object`、`function`、`symbol`和`bigint`。

```ts
const v = typeof Math.sin // function
type f = typeof Math.sin // 类型
```

`[]`和`.`在值空间等价的，在类型空间中却不是。

```ts
interface Person {
  // 描述成员特征
  name: string
  age: number
}

const person: Person = {
  name: 'tom',
  age: 18,
}

// Person['name'] 是类型
const name: Person['name'] = person['name'] // person['name'] 是值
```

> 如果 ts 无法理解你的代码，可能是值空间和类型空间弄反了。

其他结构在两种空间中具有不同的含义：

- in 值空间：属性循环，类型空间：映射类型。
- const `as const` 属性类型空间。
- `|`、`&`，值空间：位上的`OR`、`AND`，类型空间是并集和交集。
- this，值空间，当前对象，类型空间：对多 this。

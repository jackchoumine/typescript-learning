# 高效使用 ts

## 了解 类型

### ts 和 js 的关系

ts 的是 js 的超集或者加了类型的 js。

ts 的类型指导原型：对 js **运行时的行为**进行建模，然后给开发人员提示可能的错误。

### ts 转译独立于类型

tsc 做了两件事：

1. 检查类型

2. 转译新的 js 语法到旧的语法，清除类型声明

这两种行为是独立的，**即类型错误，不影响生成 js**

使用 webpack 等打包工具，可配置`ts-loader`的选项，只转译不进行类型检查。

```js
{
  test: /\.tsx?$/,
  use: {
    loader: 'ts-loader',
    options: {
      transpileOnly: true,
      // compilerOptions: {
      //   noEmit: true,
      //   noEmitOnError: true,
      // },
    },
  },
  exclude: /node_modules/
}
```

[更多配置选项](https://github.com/TypeStrong/ts-loader)

> 转译时类型被清除，运行时类型不可用

```ts
interface Square {
  width: number
}
interface Rectangle extends Square {
  height: number
}

type Shape = Square | Rectangle
function calculateArea(shape: Shape) {
  // 'Rectangle' only refers to a type, but is being used as a value here.
  // “Rectangle”仅表示类型，但在此处却作为值使用
  if (shape instanceof Rectangle) {
    // 类型“Shape”上不存在属性“height”。
    // 类型“Square”上不存在属性“height”。
    return shape.width * shape.height
  } else {
    return shape.width * shape.width
  }
}
```

尽管存在错误，转译仍然通过，类型语法被擦除。

```js
function calculateArea(shape) {
  if (shape instanceof Rectangle) {
    return shape.width * shape.height
  } else {
    return shape.width * shape.width
  }
}
```

运行时报错：`Uncaught ReferenceError: Rectangle is not defined`。

类型和值混淆时新手常犯的错误，如何重建运行时的类型检查呢？

1. 属性检查：`in`

```ts
interface Square {
  width: number
}
interface Rectangle extends Square {
  height: number
}

type Shape = Square | Rectangle
function calculateArea(shape: Shape) {
  // NOTE 这是js 语法，转译时不被清除
  // ❌ . 语法不行
  if ('height' in shape) {
    return shape.width * shape.height
  } else {
    return shape.width * shape.width
  }
}
```

2. 引入标签，显示保留到运行时

```ts
interface Square {
  kind: 'square'
  width: number
}
interface Rectangle {
  kind: 'rectangle'
  height: number
  width: number
}

type Shape = Square | Rectangle
function calculateArea(shape: Shape) {
  if (shape.kind === 'rectangle') {
    return shape.width * shape.height
  } else {
    return shape.width * shape.width
  }
}
```

转译后：

```JS
function calculateArea(shape) {
    if (shape.kind === 'rectangle') {
        return shape.width * shape.height;
    }
    else {
        return shape.width * shape.width;
    }
}
```

标签联合在 ts 使用广泛，需深刻理解。

3. 使用类

```ts
class Square {
  constructor(public width: number) {}
}
class Rectangle extends Square {
  // NOTE 不加 public，提示 类型“Rectangle”上不存在属性“height”。
  constructor(public width: number, public height: number) {
    super(width)
  }
}

type Shape = Square | Rectangle
function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    return shape.width * shape.height
  } else {
    return shape.width * shape.width
  }
}
```

转译后：

```JS
var Square = /** @class */ (function () {
    function Square(width) {
        this.width = width;
    }
    return Square;
}());
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(width, height) {
        var _this = _super.call(this, width) || this;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    return Rectangle;
}(Square));

function calculateArea(shape) {
  // NOTE Rectangle 是变量，是值
    if (shape instanceof Rectangle) {
        return shape.width * shape.height;
    }
    else {
        return shape.width * shape.width;
    }
}
```

**interface 只引入类型，class 引入类型，还引入值。**

希望在运行是保留类型检查，引入标签联合或者 js 的类型检查语法。

> 类型操作不影响运行

```ts
function asNumber(x: number | string): number {
  return x as number // as number 是类型操作
}
```

转译后

```js
function asNumber(x) {
  return x
}
```

> 运行时的类型和声明类型不同

```ts
function setLightSwitcher(lightSwitcher: boolean) {
  if (lightSwitcher) {
    console.log('turn on the light')
  } else {
    console.log('turn off the light')
  }
}
```

转译后可以使用真值执行 true 分支：

```js
function setLightSwitcher(lightSwitcher) {
  if (lightSwitcher) {
    console.log('turn on the light')
  } else {
    console.log('turn off the light')
  }
}
```

更常见的情况，值来自网络请求，无法保证类型一致。

```ts
async function setLight() {
  const res = await fetch('/api/light')
  const lightSwitcher: boolean = await res.json()
  setLightSwitcher(lightSwitcher) // NOTE api 发生变化，可能时字符串
}
```

运行时类型和声明类型不一致，会导致难以理解，难以确定是不是有意为之，要尽量避免。

> 无法基于类型实现函数重载

```ts
// ❌ 重复实现，语法错误
// function add(a: number, b: number): number {
//   return a + b
// }
// function add(a: string, b: string): string {
//   return a + b
// }

// 函数声明
function add(a: number, b: number): number
function add(a: string, b: string): string
// 函数实现
function add(a, b) {
  return a + b
}
```

> 类型对运行无开销，转换后的语法可能有开销

### 编译选项使用原则有哪些？

ts 支持对齐类型进行配置，不同的配置会导致 ts 带来的作用天差地远。

规则配置越严格，对拒绝类型的程序员来说，是障碍，会降低开发体验和效率，对有些程序员则相反。

``

> 启用配置的最佳实践

1. 使用配置文件，`tsc --init` 生成配置。

2. 新项目启用严格模式

```js
{
"strict": true，// 严格的类型检查
"noImplicitAny":true,// 避免隐式 any
"strictNullChecks": true // 对 null 和 undefined 可能引发的错误进行检查
}
```

```ts
// strictNullChecks 为 true 时，下面的语句报错
const xxx: number = null
const yyy: number = undefined
// strictNullChecks 为 false 不报错
```

> 如何消除错误？

```ts
// 明确类型
const xxx: number | null = null
const yyy: number | undefined = undefined
```

下面提示 el 可能为`null`

```ts
const el = document.querySelector('#app')
// 编辑器提示 el 可能为 null
el.innerHTML = `<div>hello</div>`
```

> 如何消除错误？

1. 保险做法：判断是否存在

```ts
// 对其 el 进行检查
el && (el.innerHTML = `<div>hello</div>`)
```

2. 不保险做法：告诉编译器不是 null

```ts
el!.innerHTML = `<div>hello</div>` // 运行时可能报错 Uncaught TypeError: Cannot set properties of null
```

新项目启用严格模式，一开始就编写类型，否则后续随着项目变大变得复杂，添加严格检查变得非常困难。

3. 迁移 js 到 ts，关闭`strictNullChecks`和`strict`，开启`noImplicitAny`

这能有些类型提示，也能保证不大面积提示错误。

### 无法确保运行时类型正确

### 应该限制使用 any

TS 的类型系统是渐近和可选的：渐进：可将类型一项一项得的加入代码中，可选：可随时禁用类型检查器。

这些功能的关键是`any`类型。

```js
let age: number
age = 13
// age = '13' // 报错 Type 'string' is not assignable to type 'number'.
age = '13' as any // 消除报错
```

any 的优点：不理解类型错误、认为编译器推断错误、**不想写类型声明**时，any 类型和 `as any` 非常好用。

但是它消除了 ts 的诸多有点，还可能导致运行时的 bug，应尽量避免使用它。

1. 类型不安全，引入 any，会通过类型检查，但是运行时导致 bug

```ts
function plus10(amount: number) {
  return amount + 10
}
plus10(10) //计算正确
// 重构引入 any
function plus10(amount: any) {
  return amount + 10
}
plus10('10') // 传入字符串，计算错误
```

> 重构时引入 any，打破了原来的契约，导致 bug。

2. any 无法提供语言服务

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h13zyzi27vj213s0gmq4z.jpg)

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h140au147zj20yk0oywi5.jpg)

ts 的语言服务提高了生产力，是其核心功能，使用 any 将丢失这部分功能。

3. any 隐蔽了类型设计，给阅读和交流带来不变。

这很好理解，js 正因为无类型提示，面对多人合作、代码量大时，会难以阅读，不容易推断代码逻辑，在代码审查时不变。

> 如何避免使用 any？

配置`noImplicitAny`为 true**禁用隐式 any**，再结合 eslint 规则禁用**显示 any**，比
如`@typescript-eslint/no-explicit-any:1`

tslint：`"no-any": true,`

[tslint 配置](https://palantir.github.io/tslint/rules/no-any/)

[eslint 配置](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-explicit-any.md)

### 理解结构类型（Structural Typing）

js 的类型是鸭子类型：只关心值的结构，而不关心其来源，允许超出类型声明之外的属性存在。

```ts
interface Vector2D {
  x: number
  y: number
}

function calculateLength(v: Vector2D): number {
  return Math.sqrt(v.x * v.x + v.y * v.y)
}

interface Vector3D {
  x: number
  y: number
  z: number
}

const v2: Vector2D = { x: 1, y: 2, z: 3 } // ❌ 多出 z 属性，报错
// const v2: Vector2D = { x: 1, y: 2, z: 3 } as Vector2D // ✅ 这样可修复
calculateLength(v2) // ✅ 但是这里不报错
const v3: Vector3D = { x: 1, y: 2, z: 3 }
calculateLength(v3) // ✅ 不报错
```

> ts 的类型系统会对 js 的运行时行为进行建模，符合 js 的类型，就不报错。

```ts
function calculateLength(v: Vector2D): number {
  return Math.sqrt(v.x * v.x + v.y * v.y)
}

interface Vector3D {
  x: number
  y: number
  z: number
}

const v2: Vector2D = { x: 1, y: 2 } // z: 3 } as Vector2D // ❌ 多出 z 属性，报错
// const v2: Vector2D = { x: 1, y: 2, z: 3 } as Vector2D
calculateLength(v2) // 但是这里不报错
const v3: Vector3D = { x: 1, y: 2, z: 3 }
calculateLength(v3)
```

属性多的值可传递给属性少的函数参数，反过来不行。

```ts
function normalize(v: Vector3D) {
  const length = calculateLength(v)
  return {
    x: v.x / length,
    y: v.y / length,
    z: v.z / length,
  }
}

console.log(normalize(v3))
console.log(normalize(v2)) // ❌ 只能传入 Vector3D 类型 提示缺少 z
```

**如何消除？**

```ts
normalize(v2 as Vector3D) //但是导致 bug {z:NaN}
```

> 编写函数时，希望传入的参数的属性和声明一致即有且仅有声明的属性，这叫精确的类型。ts 类型无法做到精确，而是开放的。

这种开放的类型，也会导致一些意外

```ts
function calculateLength1(v: Vector3D) {
  let length = 0 //
  for (const axis of Object.keys(v)) {
    const value = v[axis] // axis 是 string 类型，扩大了类型，
    //导致 value 为 any
    length += Math.sqrt(value)
  }
}
```

报错：

```bash
元素隐式具有 "any" 类型，因为类型为 "string" 的表达式不能用于索引类型 "Vector3D"。
在类型 "Vector3D" 上找不到具有类型为 "string" 的参数的索引签名
```

原因：`axis` 被推断成 string, 因为对象的 key 都是 string，而实际上，应该是`'x'|'y'|'z'` 的联合类型才对。 类型扩大后，导
致 value 被推断成 any。

修复：

```ts
function calculateLength1(v: Vector3D) {
  let length = 0 //
  for (const axis of Object.keys(v)) {
    const value = v[axis as 'x' | 'y' | 'z']
    length += Math.sqrt(value)
  }
}
```

class 的意外：

```ts
class C {
  foo: string
  constructor(foo: string) {
    this.foo = foo
  }
}

const c = new C('foo')
const d: C = { foo: 'foo' } // ✅ 使用字面量赋值，不会调用构造函数
const e: C = { bar: 'bar' } // ❌ 结构不同 不行
// 不能将类型“{ bar: string; }”分配给类型“C”。
// 对象文字可以只指定已知属性，并且“bar”不在类型“C”中。
```

> 结构类型的好处：简化逻辑测试

```ts
interface Author {
  first: string
  last: string
}

function getAuthors(db: PostgresDB): Author[] {
  const authorRows = db.runQuery(`SELECT first,last FROM AUTHOR`)
  return authorRows.map((row) => ({ first: row[0], last: row[1] }))
}
```

你可能使用引入 PostgresDB 的真正实现进行测试，但是有更好的办法：定义一个具有`runQuery`属性的瘦接口定义类型，简单对象代替
实现。

```ts
interface PostgresDB {
  runQuery(query: string): string[][]
}

test('getAuthors', () => {
  const db = {
    runQuery(query: string): string[][] {
      return [['foo', 'bar']]
    },
  }
  expect(getAuthors(db)).toEqual([{ first: 'foo', last: 'bar' }])
})
```

> 结构类型的另一个优点：干净的切断了库之前的类型依赖。

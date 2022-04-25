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

## 将类型视为值的集合

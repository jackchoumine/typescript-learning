const bar: any = 10
// bar.substr(1) // OK - any 会忽略所有类型检查

// @ts-ignore
const foo: unknown = 'string' //
// foo.substr(1) // Error: 语法检查不通过报错
;(foo as string).substr(1) // OK
// if (typeof foo === 'string') { foo.substr(1) } // OK

type Man_ = {
  handsome: 'handsome'
  type: 'man'
}

type Woman = {
  beautiful: 'beautiful'
  type: 'woman'
}

function Human(arg: Man_ | Woman) {
  if (arg.type === 'man') {
    console.log(arg.handsome)
    // console.log(arg.beautiful) // error
  } else {
    // 这一块中一定是 Woman
    console.log(arg.beautiful)
  }
}

// 双重断言
function handler(event: Event) {
  const element = (Event as any) as HTMLElement
  // Error: 'Event' 和 'HTMLElement'
  // 中的任何一个都不能赋值给另外一个
}

const bar: any = 10
// bar.substr(1) // OK - any 会忽略所有类型检查

// @ts-ignore
const foo: unknown = 'string' //
// foo.substr(1) // Error: 语法检查不通过报错
;(foo as string).substr(1) // OK
// if (typeof foo === 'string') { foo.substr(1) } // OK

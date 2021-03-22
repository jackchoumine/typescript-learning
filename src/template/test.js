/*
 * @Description: 生成器测试
 * @Date: 2020-05-16 23:41:42
 * @Author: JackChouMine
 * @LastEditTime: 2020-05-17 00:05:25
 * @LastEditors: JackChouMine
 */
// function* foo (n) {
//   try {
//     var x = yield 3 + n;
//     console.log("x: " + x); // may never get here!
//   }
//   catch (err) {
//     console.log("Error: " + err);
//   }
// }
// const it = foo(10)
// console.log(it.next())
// // it.return(1)
// it.throw('hello')//
// console.log(it.next('hello'))
// 委托生成器

function* foo() {
  yield 3
  yield 4
  return 'foo'
}
function* bar() {
  yield 1
  yield 2
  const f = yield* foo() // 让位给另一个生成器
  console.log(f)
  yield* [5, 6]
}
for (const it of bar()) {
  console.log(it)
}

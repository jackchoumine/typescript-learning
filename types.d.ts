/*
 * @Description : 类型定义文件
 * @Date        : 2021-10-24 23:21:20 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-24 23:35:36 +0800
 * @LastEditors : JackChou
 */
interface JqueryObj {
  html: (text: string) => JqueryObj
}
// 函数重载
declare function $(param: () => void): void
declare function $(param: string): JqueryObj
// 定义对象，命名空间
declare namespace $ {
  namespace fn {
    class init {}
  }
}

// 使用接口实现函数重载
// interface JQuery {
//   (ready: () => void): void
//   (selector: string): JqueryObj
// }
// declare var $: JQuery

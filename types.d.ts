/*
 * @Description : 类型定义文件
 * @Date        : 2021-10-24 23:21:20 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-24 23:41:15 +0800
 * @LastEditors : JackChou
 */
declare module 'jquery' {
  interface JqueryObj {
    html: (text: string) => JqueryObj
  }
  // 函数重载
  function $(param: () => void): void
  function $(param: string): JqueryObj
  // 定义对象，命名空间
  namespace $ {
    namespace fn {
      class init {}
    }
  }
  export = $
  // 使用接口实现函数重载
  // interface JQuery {
  //   (ready: () => void): void
  //   (selector: string): JqueryObj
  // }
  // declare var $: JQuery
}

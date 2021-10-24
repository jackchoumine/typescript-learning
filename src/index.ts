/*
 * @Description: 应用入口
 * @Date: 2019-12-02 02:12:29
 * @Author: JackChouMine
 * @LastEditTime: 2021-10-24 23:39:46 +0800
 * @LastEditors : JackChou
 */
import './example/basic-type'
// import './example/symbol'
// import './example/ES6-class-1'
// import './example/interface'
// import './example/enumeration'
// import './example/func'
// import './example/class'
// import './example/abstractClass';
// import './example/generic-1';
// import './example/generic-2'

// 难点
import './difficulty/type'
import $ from 'jquery'
$(() => {
  $('body').html(`<div>hello</div>`)
  new $.fn.init()
})

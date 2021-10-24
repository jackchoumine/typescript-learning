/*
 * @Description : keyof
 * @Date        : 2021-10-24 23:47:26 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-24 23:54:42 +0800
 * @LastEditors : JackChou
 */
// TODO 约束对象属性值的获取
interface IPerson {
  name: string
  age: number
}
class Teacher implements IPerson {
  constructor(private info: IPerson) {}
  getInfo<K extends keyof IPerson>(key: K): IPerson[K] {
    return this.info[key]
  }
}
const t = new Teacher({ name: 'Jack', age: 18 })
t.getInfo('name')
t.getInfo('age')

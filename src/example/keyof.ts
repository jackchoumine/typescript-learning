/*
 * @Description : keyof
 * @Date        : 2021-10-24 23:47:26 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-25 00:02:04 +0800
 * @LastEditors : JackChou
 */
// TODO 约束对象属性值的获取
interface IPerson {
  name: string
  age: number
}
class Teacher {
  constructor(private info: IPerson) {}
  getInfo<K extends keyof IPerson>(key: K): IPerson[K] {
    return this.info[key]
  }
}
const t = new Teacher({ name: 'Jack', age: 18 })
t.getInfo('name')
t.getInfo('age')

type MovieStringKey = Record<
  'poster' | 'title' | 'region' | 'duration' | 'director' | 'actors' | 'category' | 'enough' | 'showed',
  string
>
type MovieNumberKey = Record<'release' | 'star' | 'votecount' | 'subject' | 'score', number>

export type Movie = MovieStringKey & MovieNumberKey

const movie: Movie = {
  poster: 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2687443734.jpg',
  title: '沙丘',
  score: 7.9,
  star: 40,
  release: 2021,
  duration: '156分钟',
  region: '美国',
  director: '丹尼斯·维伦纽瓦',
  actors: '蒂莫西·柴勒梅德 / 丽贝卡·弗格森 / 奥斯卡·伊萨克',
  category: 'nowplaying',
  enough: 'True',
  showed: 'True',
  votecount: 148364,
  subject: 3001114,
}

function getMovieInfo<K extends keyof Movie>(key: K): Movie[K] {
  return movie[key]
}

import indexes from './indexes.json'
import type { Article } from '~/types'

(indexes as Article[]).sort((a, b) => {
  const createDateSorted = +new Date(b.createDate) - +new Date(a.createDate)
  return createDateSorted === 0 ? +new Date(b.updateDate) - +new Date(a.updateDate) : createDateSorted
})

const pageSize = 10
export const pagination = reactive({
  current: 1,
  pageSize,
  pageTotal: Math.ceil(indexes.length / pageSize),
})

export const findArticleInfoById = (id: string) => indexes.find(article => article.id === id)

export const articles = computed<Article[]>(() => {
  const start = (pagination.current - 1) * pagination.pageSize
  const end = start + pagination.pageSize
  return indexes.slice(start, end)
})

export const gotoPage = (page: number) => {
  if (page < 1)
    page = 1
  else if (page > pagination.pageTotal)
    page = pagination.pageTotal

  pagination.current = page
}

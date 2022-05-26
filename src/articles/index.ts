import indexes from './indexes.json'
import type { Article } from '~/types'

(indexes as Article[]).sort((a, b) => +new Date(b.updateDate) - +new Date(a.updateDate))

const pageSize = 1
export const pagination = reactive({
  current: 1,
  pageSize,
  pageTotal: Math.round(indexes.length / pageSize),
})

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

import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface Project {
  url: string
  name: string
  desc: string
  icon: string
}

export interface Article {
  id: string
  title: string
  updateDate: string
  createDate: string
  [key: string]: any
}

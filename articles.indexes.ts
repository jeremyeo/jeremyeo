import { dirname, join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { readFileSync, readdirSync, renameSync, statSync, writeFileSync } from 'fs'
import { argv, cwd } from 'process'
import YAML from 'yaml'
import colors from 'picocolors'
import { createLogger } from 'vite'
import { paramCase } from 'change-case'

interface Formatter {
  [key: string]: any
  id: string
  updateDate: Date
  createDate: Date
}

let MODE = 'production'
const BLOG_DIR = join(cwd(), 'src/pages/blog')
const ARTICLES_DIR = join(cwd(), 'src/articles')
const markdownReg = new RegExp(`${pathToFileURL(BLOG_DIR).href}.*\.md$`)

function isArticleMD(file: string) {
  return markdownReg.test(pathToFileURL(file).href)
}

// 构建文章索引
export function generateIndex() {
  const postFiles = readdirSync(BLOG_DIR)
    .filter((fileName: string) => isArticleMD(`${BLOG_DIR}/${fileName}`))

  const articleIndexes: Formatter[] = []
  postFiles.forEach((fileName: string) => {
    const path = join(BLOG_DIR, fileName)
    const stat = statSync(path)
    if (!stat.isFile())
      return
    const md = readFileSync(path, 'utf-8')
    const yaml = (md.match(/---([\s\S]*)---/) || [])[1]
    if (!yaml)
      return

    try {
      const formatter = YAML.parse(yaml)
      formatter.id = paramCase(fileName.replace('.md', ''))

      if (!fileName.includes(formatter.id) && MODE === 'production')
        renameSync(path, join(BLOG_DIR, `${formatter.id}.md`))

      if (!formatter.updateDate)
        formatter.updateDate = stat.mtime
      if (!formatter.createDate)
        formatter.createDate = stat.ctime
      articleIndexes.push(formatter)
    }
    catch (e) {}
  })

  return articleIndexes
}

const log = createLogger('info')
const prefix = colors.cyan(colors.bold('[artg]'))
const format = (message: string) => {
  return `${prefix} ${message}`
}

const createIndexesFile = () => {
  const indexes = generateIndex()
  const indexesFileName = join(ARTICLES_DIR, 'indexes.json')
  writeFileSync(indexesFileName, `${JSON.stringify(indexes)}`)
  log.info(format(`articles indexes has been created in ${indexesFileName}`))
}

if (argv.includes('--fix'))
  createIndexesFile()

export default function ArticleIndexes() {
  MODE = 'development'
  return {
    name: 'article-indexes-generator',
    apply: 'serve',
    buildStart() {
      setTimeout(() => {
        createIndexesFile()
      })
    },
    handleHotUpdate({ file }: { file: string }) {
      if (isArticleMD(file))
        createIndexesFile()
    },
  }
}

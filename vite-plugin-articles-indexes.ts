import { dirname, join } from 'path'
import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import YAML from 'yaml'
import { paramCase } from 'change-case'
import { createLogger } from 'vite'
import colors from 'picocolors'

interface Formatter {
  [key: string]: any
  id: string
  updateDate: Date
  createDate: Date
}

const BLOG_DIR = join(dirname(fileURLToPath(import.meta.url)), 'src/pages/blog')
const ARTICLES_DIR = join(dirname(fileURLToPath(import.meta.url)), 'src/articles')
const markdownReg = new RegExp(`${pathToFileURL(BLOG_DIR).href}.*\.md$`)

function isPostsMD(file: string) {
  return markdownReg.test(pathToFileURL(file).href)
}

// 构建文章索引
function generateIndex() {
  const postFiles = readdirSync(BLOG_DIR)
    .filter((fileName: string) => isPostsMD(`${BLOG_DIR}/${fileName}`))

  const postsIndex: Formatter[] = []
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
      formatter.updateDate = stat.mtime
      formatter.createDate = stat.ctime
      postsIndex.push(formatter)
    }
    catch (e) {}
  })

  const indexesFileName = join(ARTICLES_DIR, 'indexes.json')
  writeFileSync(indexesFileName, `${JSON.stringify(postsIndex)}`)
  return indexesFileName
}

const log = createLogger('info')
const prefix = colors.cyan(colors.bold('[artg]'))
const format = (message: string) => {
  return `${colors.dim(new Date().toLocaleTimeString())} ${prefix} ${message}`
}
export default function PostsIndexes() {
  return {
    name: 'article-indexes-generator',
    buildStart() {
      setTimeout(() => {
        log.info(format(`articles indexes has been created in ${generateIndex()}`))
      })
    },
    handleHotUpdate({ file }: { file: string }) {
      if (isPostsMD(file))
        log.info(format(`articles indexes has been created in ${generateIndex()}`))
    },
  }
}

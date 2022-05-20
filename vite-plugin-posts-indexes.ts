import { dirname, join } from 'path'
import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import YAML from 'yaml'
import { paramCase } from 'change-case'

interface Formatter {
  [key: string]: any
  id: string
  updateDate: Date
  createDate: Date
}

const POSTS_DIR = join(dirname(fileURLToPath(import.meta.url)), 'src/posts/articles')
const markdownReg = new RegExp(`${pathToFileURL(POSTS_DIR).href}.*\.md$`)

function isPostsMD(file: string) {
  return markdownReg.test(pathToFileURL(file).href)
}

// 构建文章索引
function generateIndex() {
  const postFiles = readdirSync(POSTS_DIR)
    .filter((fileName: string) => isPostsMD(`${POSTS_DIR}/${fileName}`))

  const postsIndex: Formatter[] = []
  postFiles.forEach((fileName: string) => {
    const path = `${POSTS_DIR}/${fileName}`
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
  writeFileSync(`${POSTS_DIR}/indexes.json`, `${JSON.stringify(postsIndex)}`)
}

export default function PostsIndexes() {
  return {
    name: 'posts-indexes',
    buildStart() {
      generateIndex()
    },
    handleHotUpdate({ file }: { file: string }) {
      if (isPostsMD(file))
        generateIndex()
    },
  }
}

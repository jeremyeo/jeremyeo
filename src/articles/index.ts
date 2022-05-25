import { paramCase } from 'change-case'

const syncModules = import.meta.glob('./articles/*.md')
const formated = Object.entries(syncModules).map(([id, sync]) => {
  return [paramCase(id.replace('./articles/', '').replace('.md', '')), sync]
})

export default Object.fromEntries(formated)

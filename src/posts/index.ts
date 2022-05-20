import { paramCase } from 'change-case'
const syncModules = import.meta.glob('./*.md')

const formated = Object.entries(syncModules).map(([id, sync]) => [paramCase(id.replace('.md', '')), sync])
export default Object.fromEntries(formated)

import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const readFile = filepath => {
  const ext = path.extname(filepath).toLowerCase()
  const content = fs.readFileSync(filepath, 'utf-8')

  switch (ext) {
    case '.json':
      return JSON.parse(content)
    case '.yml':
    case '.yaml':
      return yaml.load(content)
    default:
      throw new Error(`Неизвестное расширение: ${ext}`)
  }
}

export default readFile

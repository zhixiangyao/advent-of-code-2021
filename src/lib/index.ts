import fs from 'fs'
import path from 'path'

export function readFileSync(dirname: string, fileName: string) {
  const filePath = path.resolve(dirname, fileName)
  const lines = fs.readFileSync(filePath, 'utf8').split('\n')

  return lines
}

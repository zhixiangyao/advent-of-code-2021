import fs from 'fs'
import path from 'path'

export { Vec2 } from './vec2.class'

export const readFileSync = (dirname: string, fileName: 'data.txt' | 'example.txt', split = '\n') => {
  const filePath = path.resolve(dirname, fileName)
  const lines = fs.readFileSync(filePath, 'utf8').split(split)

  return lines
}

/**
 * Greatest common divisor
 */
export const gcd = (x = 0, y = 0): number => {
  x = Math.abs(x)
  y = Math.abs(y)

  while (y) {
    const t = y
    y = x % y
    x = t
  }
  return x
}

export const NUM = /(\+|-)?[0-9]+/gi

/**
 * Median
 */
export const median = (arr: number[]) => {
  const len = arr.length

  if (len % 2 === 0) {
    return (arr[len / 2 - 1] + arr[len / 2]) / 2
  } else {
    return arr[Math.floor(len / 2)]
  }
}

import { readFileSync } from '../lib/index'

const lines = readFileSync(__dirname, 'data.txt', '\n')

interface Number {
  a: boolean
  b: boolean
  c: boolean
  d: boolean
  e: boolean
  f: boolean
  g: boolean
}

type Key = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

const NumberMap = new Map<Key, Number>()

NumberMap.set(0, { a: true, b: true, c: true, d: false, e: true, f: true, g: true })
NumberMap.set(1, { a: false, b: false, c: true, d: false, e: false, f: true, g: false })
NumberMap.set(2, { a: true, b: false, c: true, d: true, e: true, f: false, g: true })
NumberMap.set(3, { a: true, b: false, c: true, d: true, e: false, f: true, g: true })
NumberMap.set(4, { a: false, b: true, c: true, d: true, e: false, f: true, g: false })
NumberMap.set(5, { a: true, b: true, c: false, d: true, e: false, f: true, g: true })
NumberMap.set(6, { a: true, b: true, c: false, d: true, e: true, f: true, g: true })
NumberMap.set(7, { a: true, b: false, c: true, d: true, e: false, f: true, g: false })
NumberMap.set(8, { a: true, b: true, c: true, d: true, e: true, f: true, g: true })
NumberMap.set(9, { a: true, b: true, c: true, d: true, e: false, f: true, g: true })

/**
 * part one
 */
function partOne() {}

/**
 * part two
 */
function partTwo() {}

console.time('Time:')
console.log('day-8-part-1:', partOne())
console.log('day-8-part-2:', partTwo())
console.timeEnd('Time:')

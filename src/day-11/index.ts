import { readFileSync, median } from '../lib/index'

const lines = readFileSync(__dirname, 'data.txt', '\n')

/**
 * part one
 */
function partOne(lines: string[]) {}

/**
 * part two
 */
function partTwo(lines: string[]) {}

console.time('Time:')
console.log('day-11-part-1:', partOne(lines))
console.log('day-11-part-2:', partTwo(lines))
console.timeEnd('Time:')

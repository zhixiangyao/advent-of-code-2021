import { readFileSync, median } from '../lib/index'

const lines = readFileSync(__dirname, 'data.txt', ',')

/**
 * part one
 */
function partOne(lines: string[]) {
  const _lines = lines.map(line => Number(line)).sort((l, f) => l - f)
  const medianNumber = median(_lines)

  return _lines.reduce((acc, cur) => {
    if (cur > medianNumber) {
      acc += cur - medianNumber
    } else if (cur < medianNumber) {
      acc += medianNumber - cur
    }
    return acc
  }, 0)
}

/**
 * part two
 */
function partTwo(lines: string[]) {}

console.time('Time:')
console.log('day-7-part-1:', partOne(lines))
console.log('day-7-part-2:', partTwo(lines))
console.timeEnd('Time:')

import { readFileSync } from '../lib/index'

const lines = readFileSync(__dirname, 'data.txt', '\n')

/**
 * part one
 */
function partOne(lines: string[]) {
  const _lines = lines.map(line => {
    const _line = [...line].map(num => Number(num))
    _line.push(Infinity)
    _line.unshift(Infinity)
    return _line
  })
  const len = _lines[0].length

  let count = 0

  _lines.push(Array(_lines[0].length).fill(Infinity))
  _lines.unshift(Array(_lines[0].length).fill(Infinity))

  for (let i = 1; i < _lines.length - 1; i += 1) {
    const line = _lines[i]

    for (let j = 1; j < line.length - 1; j += 1) {
      const top = _lines[i - 1][j]
      const right = line[j + 1]
      const bottom = _lines[i + 1][j]
      const left = line[j - 1]
      const mid = line[j]

      if (left > mid && right > mid && top > mid && bottom > mid) {
        count += mid + 1
      }
    }
  }

  return count
}

/**
 * part two
 */
function partTwo() {}

console.time('Time:')
console.log('day-9-part-1:', partOne(lines))
console.log('day-9-part-2:', partTwo())
console.timeEnd('Time:')

import { readFileSync } from '../lib/index'

const lines = readFileSync(__dirname, 'data.txt', '\n')

function partOne(lines: string[]) {
  const _lines = lines.map(line => Number(line))
  let count = 0

  for (let i = 1; i < _lines.length; i += 1) {
    if (_lines[i] > _lines[i - 1]) {
      count += 1
    }
  }

  return count
}

function partTwo(lines: string[]) {
  const _lines = lines.map(line => Number(line))
  let count = 0
  let before = _lines[0] + _lines[1] + _lines[2]

  for (let i = 1; i < _lines.length - 2; i += 1) {
    const current = _lines[i] + _lines[i + 1] + _lines[i + 2]

    if (current > before) {
      count += 1
    }

    before = current
  }

  return count
}

console.time('Time:')
console.log('day-1-part-1:', partOne(lines))
console.log('day-1-part-2:', partTwo(lines))
console.timeEnd('Time:')

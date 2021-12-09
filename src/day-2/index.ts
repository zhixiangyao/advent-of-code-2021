import { readFileSync } from '../lib/index'

const lines = readFileSync(__dirname, 'data.txt', '\n')

function partOne(lines: string[]) {
  const data = lines.map(item => {
    const [str, num] = item.split(' ')
    return [str, Number(num)] as [string, number]
  })

  let step = 0
  let depth = 0

  data.forEach(operation => {
    switch (operation[0]) {
      case 'forward':
        step += operation[1]
        break
      case 'down':
        depth += operation[1]
        break
      case 'up':
        depth -= operation[1]
        break
    }
  })

  return step * depth
}

function partTwo(lines: string[]) {
  const data = lines.map(item => {
    const [str, num] = item.split(' ')
    return [str, Number(num)] as [string, number]
  })

  let target = 0
  let depth = 0
  let step = 0
  let count = 0

  data.forEach(operation => {
    switch (operation[0]) {
      case 'forward':
        step += operation[1]
        if (depth > 0) {
          target += operation[1]
          count += target * depth
          target = 0
        }
        break
      case 'down':
        depth += operation[1]
        break
      case 'up':
        depth -= operation[1]
        break
    }
  })

  return step * count
}

console.time('Time:')
console.log('day-2-part-1:', partOne(lines))
console.log('day-2-part-2:', partTwo(lines))
console.timeEnd('Time:')

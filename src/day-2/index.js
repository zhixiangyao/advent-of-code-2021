const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, 'data.txt')

const list = fs
  .readFileSync(filePath, 'utf8')
  .split('\n')
  .map(item => {
    const [str, num] = item.split(' ')
    return [str, Number(num)]
  })

/**
 * part one
 * @param {[string, number][]} list
 * @returns {number}
 */
function partOne(list) {
  let step = 0
  let depth = 0

  list.forEach(operation => {
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

/**
 * part one
 * @param {[string, number][]} list
 * @returns {number}
 */
function partTwo(list) {
  let target = 0
  let depth = 0
  let step = 0
  let count = 0

  list.forEach(operation => {
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

console.log('day-2-part-1:', partOne(list))
console.log('day-2-part-2:', partTwo(list))

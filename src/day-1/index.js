const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, 'data.txt')
const list = fs
  .readFileSync(filePath, 'utf8')
  .split('\n')
  .map(num => Number(num))

function partOne(list) {
  let count = 0

  for (let i = 1; i < list.length; i += 1) {
    if (list[i] > list[i - 1]) {
      count += 1
    }
  }

  return count
}

function partTwo(list) {
  let count = 0
  let before = list[0] + list[1] + list[2]

  for (let i = 1; i < list.length - 2; i += 1) {
    const current = list[i] + list[i + 1] + list[i + 2]

    if (current > before) {
      count += 1
    }

    before = current
  }

  return count
}

console.log('day-1-part-1:', partOne(list))
console.log('day-1-part-2:', partTwo(list))

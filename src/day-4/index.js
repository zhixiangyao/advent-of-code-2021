const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, 'data.txt')

const lines = fs.readFileSync(filePath, 'utf8').split('\n')

/**
 * @param {string[]} lines
 * @returns {[number[], number[][][]]}
 */
function gen(lines) {
  const _lines = [...lines]

  const grids = [[]]
  const selectedList = _lines
    .shift(/* Selected list is first line */)
    .split(',')
    .map(num => Number(num))

  _lines.shift() // remove empty line

  let i = 0
  _lines.forEach(line => {
    if (line !== '') {
      grids[i].push(
        line
          .split(' ')
          .filter(num => !!num)
          .map(num => Number(num))
      )
    } else {
      grids.push([])
      i += 1
    }
  })

  return [selectedList, grids]
}

const [selectedList, grids] = gen(lines)

/**
 * part one
 * @param {number[]} selectedList
 * @param {number[][][]} grids
 * @returns {number}
 */
function partOne(selectedList, grids) {
  /**
   * @param {{num: number, validate: boolean}[]} line
   * @returns {boolean}
   */
  const hasWinners = line => {
    return line.every(obj => obj.validate === true)
  }

  // init
  const _grids = grids.map(grid => grid.map(line => line.map(num => ({ num, validate: false }))))
  let lastCalledNumber = selectedList[0]
  let sumOfAllUnmarkedNumbers = 0

  selected: for (let i = 0; i < selectedList.length; i++) {
    const selected = selectedList[i]

    for (let g = 0; g < _grids.length; g++) {
      const grid = _grids[g]

      for (let l = 0; l < grid.length; l++) {
        const line = grid[l]

        for (let n = 0; n < line.length; n++) {
          const num = line[n]

          if (num.num === selected) _grids[g][l][n].validate = true
        }

        if (hasWinners(line)) {
          lastCalledNumber = selected
          sumOfAllUnmarkedNumbers = grid.reduce((acc_grid, line) => {
            acc_grid += line.reduce((acc_line, obj) => {
              if (obj.validate === false) acc_line += obj.num
              return acc_line
            }, 0)
            return acc_grid
          }, 0)
          break selected
        }
      }
    }
  }

  return lastCalledNumber * sumOfAllUnmarkedNumbers
}

/**
 * part two
 * @param {number[]} selectedList
 * @param {number[][][]} grids
 * @returns {number}
 */
function partTwo(selectedList, grids) {
  /**
   * @param {{num: number, validate: boolean}[]} line
   * @returns {boolean}
   */
  const hasWinners = line => {
    return line.every(obj => obj.validate === true)
  }

  // init
  const _grids = grids.map(grid => grid.map(line => line.map(num => ({ num, validate: false }))))
  let lastCalledNumber = selectedList[0]
  let sumOfAllUnmarkedNumbers = 0

  selected: for (let i = 0; i < selectedList.length; i++) {
    const selected = selectedList[i]

    for (let g = 0; g < _grids.length; g++) {
      const grid = _grids[g]

      for (let l = 0; l < grid.length; l++) {
        const line = grid[l]

        for (let n = 0; n < line.length; n++) {
          const num = line[n]

          if (num.num === selected) _grids[g][l][n].validate = true

          const col = grid.reduce((acc, line) => {
            acc.push(line[n])
            return acc
          }, [])

          if (hasWinners(col)) {
            lastCalledNumber = selected
            sumOfAllUnmarkedNumbers = grid.reduce((acc_grid, line) => {
              acc_grid += line.reduce((acc_line, obj) => {
                if (obj.validate === false) acc_line += obj.num
                return acc_line
              }, 0)
              return acc_grid
            }, 0)
            break selected
          }
        }
      }
    }
  }

  return lastCalledNumber * sumOfAllUnmarkedNumbers
}

console.log('day-4-part-1:', partOne(selectedList, grids))
console.log('day-4-part-2:', partTwo(selectedList, grids))

import { readFileSync } from '../lib/index'

const lines = readFileSync(__dirname, 'data.txt')

type Clouds = [[number, number], [number, number]][]
type GenReturn = [number, number, Clouds]

function gen(lines: string[]): GenReturn {
  let width = 0
  let height = 0

  const clouds =
    lines.map(
      line =>
        line.split(' -> ').map(str => {
          const [x, y] = str.split(',').map(num => Number(num))
          width = Math.max(width, x)
          height = Math.max(height, y)
          return [x, y]
        }) as [[number, number], [number, number]]
    ) ?? []

  return [width, height, clouds]
}

const [width, height, clouds] = gen(lines)

/**
 * part one
 */
function partOne(width: number, height: number, clouds: Clouds): number {
  const grid: number[][] = Array(height + 1)
    .fill(0)
    .map(() => Array(width + 1).fill(0))

  for (let i = 0; i < clouds.length; i++) {
    const [point1, point2] = clouds[i]

    if (point1[0] === point2[0]) {
      // x1 === x2 x
      const x = point1[0]
      const min = Math.min(point1[1], point2[1])
      const max = Math.max(point1[1], point2[1])
      for (let y = min; y <= max; y++) {
        grid[y][x] += 1
      }
    }

    if (point1[1] === point2[1]) {
      // y1 === y2 y
      const y = point1[1]
      const min = Math.min(point1[0], point2[0])
      const max = Math.max(point1[0], point2[0])
      for (let x = min; x <= max; x++) {
        grid[y][x] += 1
      }
    }
  }

  return grid.reduce((acc, cur) => {
    acc += cur.reduce((acc, cur) => {
      if (cur >= 2) acc += 1
      return acc
    }, 0)
    return acc
  }, 0)
}

/**
 * part two
 */
function partTwo(width: number, height: number, clouds: Clouds): number {
  const grid: number[][] = Array(height + 1)
    .fill(0)
    .map(() => Array(width + 1).fill(0))

  for (let i = 0; i < clouds.length; i++) {
    const [point1, point2] = clouds[i]

    if (point1[0] === point2[0]) {
      // x1 === x2 x
      const x = point1[0]
      const min = Math.min(point1[1], point2[1])
      const max = Math.max(point1[1], point2[1])
      for (let y = min; y <= max; y++) {
        grid[y][x] += 1
      }
    }

    if (point1[1] === point2[1]) {
      // y1 === y2 y
      const y = point1[1]
      const min = Math.min(point1[0], point2[0])
      const max = Math.max(point1[0], point2[0])
      for (let x = min; x <= max; x++) {
        grid[y][x] += 1
      }
    }

    if (point1[0] < point2[0] && point1[1] < point2[1]) {
      //    "\" x++ y++

      let x = point1[0]
      const min = point1[1]
      const max = point2[1]
      for (let y = min; y <= max; y++, x++) {
        grid[y][x] += 1
      }
    }

    if (point1[0] > point2[0] && point1[1] > point2[1]) {
      //    "\" x-- y--

      let x = point2[0]
      const min = point2[1]
      const max = point1[1]
      for (let y = max; y > min; y--, x--) {
        grid[y][x] += 1
      }
    }

    if (point1[0] < point2[0] && point1[1] > point2[1]) {
      //    "/" x++ y--

      let x = point1[0]
      const min = point2[1]
      const max = point1[1]
      for (let y = max; y > min; y--, x++) {
        grid[y][x] += 1
      }
    }

    if (point1[0] > point2[0] && point1[1] < point2[1]) {
      //    "/" x-- y++

      let x = point2[0]
      const min = point1[1]
      const max = point2[1]
      for (let y = min; y <= max; y++, x--) {
        grid[y][x] += 1
      }
    }
  }

  return grid.reduce((acc, cur) => {
    acc += cur.reduce((acc, cur) => {
      if (cur >= 2) acc += 1
      return acc
    }, 0)
    return acc
  }, 0)
}
console.time('Time:')
console.log('day-5-part-1:', partOne(width, height, clouds))
console.log('day-5-part-2:', partTwo(width, height, clouds))
console.timeEnd('Time:')

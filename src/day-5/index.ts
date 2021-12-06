import { readFileSync, Vec2 } from '../lib/index'

const lines = readFileSync(__dirname, 'example.txt')

type Point = [number, number]
type Clouds = [Point, Point][]
type GenReturn = [number, number, Clouds]
type Grid = number[][]

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

function count(grid: Grid): number {
  return grid.reduce((acc, cur) => {
    acc += cur.reduce((acc, cur) => {
      if (cur >= 2) acc += 1
      return acc
    }, 0)
    return acc
  }, 0)
}

const [width, height, clouds] = gen(lines)

/**
 * part one
 */
function partOne(width: number, height: number, clouds: Clouds): number {
  const grid: Grid = Array(height + 1)
    .fill(0)
    .map(() => Array(width + 1).fill(0))

  for (let i = 0; i < clouds.length; i++) {
    const [point1, point2] = clouds[i]

    if (point1[0] === point2[0]) {
      // - y++ or y--
      const x = point1[0]
      const min = Math.min(point1[1], point2[1])
      const max = Math.max(point1[1], point2[1])
      for (let y = min; y <= max; y++) {
        grid[y][x] += 1
      }
    }

    if (point1[1] === point2[1]) {
      // | x++ or x--
      const y = point1[1]
      const min = Math.min(point1[0], point2[0])
      const max = Math.max(point1[0], point2[0])
      for (let x = min; x <= max; x++) {
        grid[y][x] += 1
      }
    }
  }

  return count(grid)
}

/**
 * part two
 */
function partTwo(width: number, height: number, clouds: Clouds): number {
  const grid: Grid = Array(height + 1)
    .fill(0)
    .map(() => Array(width + 1).fill(0))

  for (let i = 0; i < clouds.length; i++) {
    const [point1, point2] = clouds[i]

    if (point1[0] === point2[0]) {
      // y++
      const x = point1[0]
      const min = Math.min(point1[1], point2[1])
      const max = Math.max(point1[1], point2[1])
      for (let y = min; y <= max; y++) {
        grid[y][x] += 1
      }
    }

    if (point1[1] === point2[1]) {
      // x++
      const y = point1[1]
      const min = Math.min(point1[0], point2[0])
      const max = Math.max(point1[0], point2[0])
      for (let x = min; x <= max; x++) {
        grid[y][x] += 1
      }
    }

    if (point1[0] < point2[0] && point1[1] < point2[1]) {
      /**
       *  x++ y++
       *  p1
       *    \
       *     \
       *      \
       *       p2
       */

      const xMin = point1[0]
      const xMax = point2[0]
      const yMin = point1[1]
      const yMax = point2[1]

      for (let y = yMin, x = xMin; y <= yMax && y <= xMax; y++, x++) {
        grid[y][x] += 1
      }
    }

    if (point1[0] > point2[0] && point1[1] > point2[1]) {
      /**
       *  x-- y--
       *  p2
       *    \
       *     \
       *      \
       *       p1
       */

      const xMin = point2[0]
      const xMax = point1[0]
      const yMin = point2[1]
      const yMax = point1[1]

      for (let y = yMax, x = xMax; y >= yMin && x >= xMin; y--, x--) {
        grid[y][x] += 1
      }
    }

    if (point1[0] < point2[0] && point1[1] > point2[1]) {
      /**
       *  x++ y--
       *       p2
       *      /
       *     /
       *    /
       *  p1
       */

      const xMin = point1[0]
      const xMax = point2[0]
      const yMin = point2[1]
      const yMax = point1[1]

      for (let y = yMax, x = xMin; y >= yMin && x <= xMax; y--, x++) {
        grid[y][x] += 1
      }
    }

    if (point1[0] > point2[0] && point1[1] < point2[1]) {
      /**
       *  x-- y++
       *       p1
       *      /
       *     /
       *    /
       *  p2
       */

      const xMin = point2[0]
      const xMax = point1[0]
      const yMin = point1[1]
      const yMax = point2[1]

      for (let y = yMin, x = xMax; y <= yMax && x >= xMin; y++, x--) {
        grid[y][x] += 1
      }
    }
  }

  console.log(grid)

  return count(grid)
}

console.time('Time:')
console.log('day-5-part-1:', partOne(width, height, clouds))
console.log('day-5-part-2:', partTwo(width, height, clouds))
console.timeEnd('Time:')

const parseLine = (line: string): { start: Vec2; end: Vec2 } => {
  const [start, end] = line.split(' -> ').map(coordinate => new Vec2(coordinate))
  return { start, end }
}

const runner = (lines: string[]) => {
  const _lines = lines.map(parseLine)
  const seabed = new Map<string, number>()
  for (const { start, end } of _lines) {
    for (const element of start.reach(end, true, true)) {
      const estr = element.toString()
      const existing = seabed.get(estr) ?? 0
      seabed.set(estr, existing + 1)
    }
  }
  return [...seabed.values()].reduce((acc, cur) => {
    if (cur >= 2) acc += 1
    return acc
  }, 0)
}

console.log(runner(lines))

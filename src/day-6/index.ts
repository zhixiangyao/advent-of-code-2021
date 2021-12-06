import { readFileSync, Vec2 } from '../lib/index'

const lines = readFileSync(__dirname, 'data.txt', ',')

/**
 * part one
 */
function partOne(lines: string[]): number {
  class LanternFish {
    constructor(public timer = 8) {}
    next() {
      if (this.timer === 0) {
        this.timer = 6
        return new LanternFish()
      } else {
        this.timer--
        return undefined
      }
    }
  }

  const maxDay = 80
  const fishes = lines.map(time => new LanternFish(Number(time)))

  let day = 0
  while (day < maxDay) {
    const next: LanternFish[] = fishes
      .map(fish => fish.next())
      .filter((next): next is LanternFish => next !== undefined)

    fishes.push(...next)
    day += 1
  }

  return fishes.length
}

/**
 * part two
 */
function partTwo() {}

console.time('Time:')
console.log('day-6-part-1:', partOne(lines))
console.log('day-6-part-2:', partTwo())
console.timeEnd('Time:')

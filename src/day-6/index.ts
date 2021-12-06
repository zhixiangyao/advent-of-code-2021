import { readFileSync, Vec2 } from '../lib/index'

const lines = readFileSync(__dirname, 'data.txt', ',')

/**
 * part one
 */
function partOne(lines: string[], maxDay = 80): number {
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
function partTwo(lines: string[], maxDay = 256): number {
  const fishList = lines.map(num => Number(num))

  /**
   * Map(5) {
   *  3 => 32,
   *  2 => 33,
   *  1 => 175,
   *  4 => 28,
   *  5 => 32
   * }
   */
  const HashFish = new Map<number, number>()

  // fish 0 - 7
  for (const fish of fishList) {
    const existing = HashFish.get(fish)
    if (existing) {
      HashFish.set(fish, existing + 1)
    } else {
      HashFish.set(fish, 1)
    }
  }

  let day = 0
  while (day < maxDay) {
    console.log(day % 9)
    const previous = HashFish.get(day % 9) ?? 0

    const key = (day + 7) % 9
    const existing = HashFish.get(key)
    if (existing) {
      HashFish.set(key, existing + previous)
    } else {
      HashFish.set(key, previous)
    }
    day++
  }

  return [...HashFish.values()].reduce((acc, cur) => {
    acc += cur
    return acc
  }, 0)
}

console.time('Time:')
console.log('day-6-part-1:', partOne(lines))
console.log('day-6-part-2:', partTwo(lines))
console.timeEnd('Time:')

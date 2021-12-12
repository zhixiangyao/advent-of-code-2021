import { readFileSync } from '../lib/index'
import { type ClosingTag, type OpeningTag, isOpeningTag, closingTagMap } from './utils'

const lines = readFileSync(__dirname, 'data.txt', '\n')

/**
 * part one
 */
function partOne(lines: string[]) {
  const scoreMap: Record<ClosingTag, number> = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  }

  function handleCurrentLine(line: string): ClosingTag | undefined {
    const operators = [...line] as (OpeningTag | ClosingTag)[]
    const openStack: OpeningTag[] = []

    for (const operator of operators) {
      if (isOpeningTag(operator)) {
        openStack.push(operator)
      } else {
        const lastOpeningTag = openStack.pop()

        if (lastOpeningTag && operator !== closingTagMap[lastOpeningTag]) {
          return operator
        }
      }
    }

    return undefined
  }

  return lines
    .map(handleCurrentLine)
    .filter(v => v !== undefined)
    .map(v => v && scoreMap[v])
    .reduce((acc, cur) => {
      acc! += cur!
      return acc
    }, 0)
}

/**
 * part two
 */
function partTwo() {}

console.time('Time:')
console.log('day-10-part-1:', partOne(lines))
console.log('day-10-part-2:', partTwo())
console.timeEnd('Time:')

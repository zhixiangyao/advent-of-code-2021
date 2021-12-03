const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, 'data.txt')

const list = fs.readFileSync(filePath, 'utf8').split('\n')

/**
 * demo
 *
 * 00100
 * 11110
 * 10110
 * 10111
 * 10101
 * 01111
 * 00111
 * 11100
 * 10000
 * 11001
 * 00010
 * 01010
 */

/**
 * part one
 * @param {string[]} list
 * @returns {number}
 */
function partOne(list) {
  const listLen = list.length
  const bitCount = list[0].length
  const gammaTemp = Array(bitCount).fill(null) // count the number of bits that are 1
  const gammaRateArr = Array(bitCount).fill(null) // most common bit
  const epsilonRateArr = Array(bitCount).fill(null) // least common bit

  for (let i = 0; i < list.length; i += 1) {
    const line = list[i]

    for (let j = 0; j < line.length; j += 1) {
      gammaTemp[j] += Number(line[j])
    }
  }

  const mid = Math.floor(listLen / 2)

  for (let i = 0; i < gammaTemp.length; i += 1) {
    if (gammaTemp[i] > mid) {
      gammaRateArr[i] = 1
      epsilonRateArr[i] = 0
    } else {
      gammaRateArr[i] = 0
      epsilonRateArr[i] = 1
    }
  }

  let gammaRate = Number(gammaRateArr.join(''))
  let epsilonRate = Number(epsilonRateArr.join(''))

  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
}

/**
 * demo
 *
 * oxygen generator rating (The last requirement is 1):
 * zero     1st       2nd       3rd       4th       5th
 * 00100    11110     10110     10110     10110     10111  =  23
 * 11110    10110     10111     10111     10111
 * 10110    10111     10101     10101
 * 10111    10101     10000
 * 10101    11100
 * 01111    10000
 * 00111    11001
 * 11100
 * 10000
 * 11001
 * 00010
 * 01010
 *
 * CO2 scrubber rating (The last requirement is 0):
 * zero     1st       2nd       3rd
 * 00100    00100     01111     01010  =  10
 * 11110    01111     01010
 * 10110    00111
 * 10111    00010
 * 10101    01010
 * 01111
 * 00111
 * 11100
 * 10000
 * 11001
 * 00010
 * 01010
 *
 * life support rating = oxygen generator rating (23) * CO2 scrubber rating (10)
 *                     = 230
 */

/**
 * part two
 * @param {string[]} list
 * @returns {number}
 */
function partTwo(list) {
  const bitCount = list[0].length

  let oxygens = list
  for (let i = 0; i < bitCount && oxygens.length > 1; i++) {
    const bit = getMostCommonBit(oxygens, i)

    oxygens = oxygens.filter(line => line[i] === bit)
  }

  let CO2s = list
  for (let i = 0; i < bitCount && CO2s.length > 1; i++) {
    const bit = getMostCommonBit(CO2s, i)

    CO2s = CO2s.filter(line => line[i] !== bit)
  }

  const oxygen = oxygens[0]
  const CO2 = CO2s[0]

  return parseInt(oxygen, 2) * parseInt(CO2, 2)
}

/**
 *
 * @param {string[]} list
 * @param {number} index
 * @returns {'1' | '0'}
 */
const getMostCommonBit = (list, index) => {
  let c0 = 0
  let c1 = 0

  list.forEach(line => {
    if (line[index] === '1') {
      c1 += 1
    } else {
      c0 += 1
    }
  })

  return c1 >= c0 ? '1' : '0'
}

console.log('day-3-part-1:', partOne(list))
console.log('day-3-part-2:', partTwo(list))

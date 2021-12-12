import {
  differenceInYears,
  differenceInMonths,
  differenceInWeeks,
  differenceInDays
} from 'date-fns'

/**
 * How many times is the interval contained between
 * the given dates (without remainder).
 * It doesn't support complex intervals involving several different units (years, months, weeks, days).
 */
export default function divideInterval (startDate: Date, endDate: Date, interval: SimpleDuration): number {
  const intervalTypes = Object.keys(interval)
  console.assert(intervalTypes.length === 1)
  const intervalType = intervalTypes[0]
  // @ts-ignore
  const intervalLength: number = interval[intervalType]

  if (intervalLength <= 0) {
    throw new Error('Enter a positive interval')
  }

  let diff: number
  if (intervalType === 'years') {
    diff = differenceInYears(endDate, startDate)
  } else if (intervalType === 'months') {
    diff = differenceInMonths(endDate, startDate)
  } else if (intervalType === 'weeks') {
    diff = differenceInWeeks(endDate, startDate)
  } else if (intervalType === 'days') {
    diff = differenceInDays(endDate, startDate)
  } else {
    throw new Error('Interval type is incorrect')
  }

  if (diff < 0) return 0
  return Math.trunc(diff / intervalLength)
}

import {
  add as addDate,
  isAfter, isBefore, isEqual
} from 'date-fns'

export type InvestmentOptions = { period: SimpleDuration, interestRate: Percent, startDate: RelativeDate }

/**
 * Investment which returns a certain percent of income periodically.
 *
 * It assumes compound interest and that ALL the previous cash flow
 * is invested continuously not only on start date.
 *
 * It is NOT recommended to create several such modules per cash flow
 * because it would make no sense: that would mean that the same cash is
 * invested in two different assets at the same time.
 *
 * If there is some income which happens during given periods, it is counted
 * as if it was invested in the end of the period.
 */
const Investment: PlanStep<InvestmentOptions> =
  function (prevCashFlow, { period, interestRate, startDate }, context) {
    // In order to consider incoming investions not only on start,
    // we need to solve a discrete integral ∫ prevCash(t) * interest^t dt
    // Here we apply dynamic programming

    const absStartDate = addDate(context.startDate, startDate)
    // cache is sorted starting from earliest date to latest
    const initCapital = prevCashFlow.calc(absStartDate)
    const cache: Array<{ date: Date, investedCash: Cash, cashWithInterest: Cash }> = [
      { date: absStartDate, investedCash: initCapital, cashWithInterest: initCapital }
    ]
    return {
      // TODO: OPTIMIZE
      calc (calcDate) {
        if (isAfter(calcDate, cache[0].date)) {
          // Calculate & cache until we reach calcDate
          let lastCalculated = 0
          while (isAfter(calcDate, cache[lastCalculated].date)) {
            const prevDate = cache[lastCalculated].date
            const newDate = addDate(prevDate, period)

            const investedCash = prevCashFlow.calc(newDate)
            const prevInvestedCash = cache[lastCalculated].investedCash
            const newInvestmentsDuringPeriod = investedCash - prevInvestedCash

            cache.push({
              date: newDate,
              investedCash,
              cashWithInterest: cache[lastCalculated].cashWithInterest * (1 + interestRate / 100) + newInvestmentsDuringPeriod
            })
            lastCalculated++
          }

          if (isEqual(calcDate, cache[lastCalculated].date)) {
            return cache[lastCalculated].cashWithInterest
          } else {
            const endOfPeriod = cache[lastCalculated - 1]
            return endOfPeriod.cashWithInterest + prevCashFlow.calc(calcDate) - endOfPeriod.investedCash
          }
        } else {
          // Bisection method
          let left = 0
          let right = cache.length - 1
          let middle: number
          while ((right - left) > 1) {
            middle = Math.floor(left + (right - left) / 2)
            if (!isBefore(middle, calcDate)) right = middle
            if (!isAfter(middle, calcDate)) left = middle
          }

          if (left === right) {
            return cache[left].cashWithInterest
          } else {
            return cache[left].cashWithInterest + prevCashFlow.calc(calcDate) - cache[left].investedCash
          }
        }
      }
    }
  }

export default Investment
export const defaultOptions: InvestmentOptions = {
  period: { years: 1 },
  interestRate: 6,
  startDate: { days: 0 }
}

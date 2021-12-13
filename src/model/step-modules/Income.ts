import {
  add as addDate,
  isBefore
} from 'date-fns'

import divideInterval from '@/model/helpers/divideInterval'

type IncomeOptions = { amount: Cash, incomeStartDate: RelativeDate, period: SimpleDuration }

/**
 * Fixed income; contribution of a certain amount which happens regularly, for example, salary
 */
const Income: PlanStep<IncomeOptions> =
  function (prevCashFlow, { amount, incomeStartDate, period }, context) {
    return {
      calc (calcDate) {
        const absIncomeStartDate = addDate(context.startDate, incomeStartDate)
        if (!isBefore(calcDate, absIncomeStartDate)) {
          const howManyTimes = divideInterval(absIncomeStartDate, calcDate, period)
          return prevCashFlow.calc(calcDate) + (howManyTimes + 1) * amount
        } else {
          return prevCashFlow.calc(calcDate)
        }
      }
    }
  }

export default Income
export const defaultOptions: IncomeOptions = {
  amount: 1000,
  period: { months: 1 },
  incomeStartDate: { days: 0 }
}

import {
  add as addDate,
  isBefore
} from 'date-fns'

import divideInterval from '@/model/helpers/divideInterval'

/**
 * Fixed income; contribution of a certain amount which happens regularly, for example, salary
 */
const Income: PlanStep<{ amount: Cash, incomeStartDate: RelativeDate, period: SimpleDuration }> =
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

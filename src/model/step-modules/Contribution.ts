import {
  add as addDate,
  isBefore
} from 'date-fns'

/**
 * A one-time contribution of a fixed amount to the cash flow
 */
const Contribution: PlanStep<{ amount: Cash, contributionDate: RelativeDate }> =
  function (prevCashFlow, { amount, contributionDate }, context) {
    return {
      calc (calcDate) {
        const absContributionDate = addDate(context.startDate, contributionDate)
        if (!isBefore(calcDate, absContributionDate)) {
          return prevCashFlow.calc(calcDate) + amount
        } else {
          return prevCashFlow.calc(calcDate)
        }
      }
    }
  }

export default Contribution

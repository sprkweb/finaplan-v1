import {
  add as addDate,
  isBefore
} from 'date-fns'

type ContributionOptions = { amount: Cash, contributionDate: RelativeDate }

/**
 * A one-time contribution of a fixed amount to the cash flow
 */
const Contribution: PlanStep<ContributionOptions> =
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
export const defaultOptions: ContributionOptions = {
  amount: 1000,
  contributionDate: { days: 0 }
}

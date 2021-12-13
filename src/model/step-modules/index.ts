import { defaultOptions as defaultContributionOptions } from './Contribution'
import { defaultOptions as defaultIncomeOptions } from './Income'

export { default as Initialize } from './Initialize'
export { default as Contribution } from './Contribution'
export { default as Income } from './Income'

export const index: PlanStepTypeInfo[] = [
  {
    name: 'contribution',
    module: 'Contribution',
    defaultOptions: defaultContributionOptions
  },
  {
    name: 'income',
    module: 'Income',
    defaultOptions: defaultIncomeOptions
  }
]

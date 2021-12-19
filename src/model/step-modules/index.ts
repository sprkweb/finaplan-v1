import { defaultOptions as defaultContributionOptions } from './Contribution'
import { defaultOptions as defaultIncomeOptions } from './Income'
import { defaultOptions as defaultNotesOptions } from './Notes'

export { default as Initialize } from './Initialize'
export { default as Contribution } from './Contribution'
export { default as Income } from './Income'

export const index: Record<string, PlanStepTypeInfo> = {
  contribution: {
    name: 'contribution',
    module: 'Contribution',
    component: 'ContributionStep',
    defaultOptions: defaultContributionOptions
  },
  income: {
    name: 'income',
    module: 'Income',
    component: 'IncomeStep',
    defaultOptions: defaultIncomeOptions
  },
  notes: {
    name: 'notes',
    component: 'NotesStep',
    defaultOptions: defaultNotesOptions
  }
}

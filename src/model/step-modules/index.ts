import { defaultOptions as defaultContributionOptions } from './Contribution'
import { defaultOptions as defaultIncomeOptions } from './Income'
import { defaultOptions as defaultNotesOptions } from './Notes'
import { defaultOptions as defaultChartOptions } from './Chart'

export { default as Initialize } from './Initialize'
export { default as Contribution } from './Contribution'
export { default as Income } from './Income'

export const index: Record<string, PlanStepTypeInfo> = {
  contribution: {
    name: 'contribution',
    model: 'Contribution',
    component: 'ContributionStep',
    defaultOptions: defaultContributionOptions
  },
  income: {
    name: 'income',
    model: 'Income',
    component: 'IncomeStep',
    defaultOptions: defaultIncomeOptions
  },
  notes: {
    name: 'notes',
    component: 'NotesStep',
    defaultOptions: defaultNotesOptions
  },
  chart: {
    name: 'chart',
    component: 'ChartStep',
    defaultOptions: defaultChartOptions
  }
}

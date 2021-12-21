const defaultSteps: Record<StepID, PlanStepInfo> = {
  1: {
    id: 1,
    stepType: 'contribution',
    options: {
      amount: 5000,
      contributionDate: { days: 0 }
    }
  },
  2: {
    id: 2,
    stepType: 'income',
    options: {
      amount: 1000,
      period: { months: 1 },
      incomeStartDate: { months: 1 }
    }
  },
  3: {
    id: 3,
    stepType: 'notes',
    options: {
      text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
    }
  },
  4: {
    id: 4,
    stepType: 'notes',
    options: {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    }
  }
}

const defaultFlows: Array<CashFlowInfo> = [
  {
    name: 'Flow 1',
    steps: [1, 2, 3],
    context: {
      startDate: new Date(2000, 1, 1)
    }
  },
  {
    name: 'Flow 2',
    steps: [4],
    context: {
      startDate: new Date(2000, 1, 1)
    }
  }
]

export const defaultState = {
  steps: defaultSteps,
  lastStepID: 4,
  flows: defaultFlows
}

export type StateType = typeof defaultState;

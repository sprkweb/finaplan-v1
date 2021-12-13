const defaultSteps: Record<StepID, PlanStepInfo> = {
  1: {
    id: 1,
    stepType: 'notes',
    options: {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    }
  },
  2: {
    id: 2,
    stepType: 'notes',
    options: {
      text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
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
    steps: [1, 2, 3]
  },
  {
    name: 'Flow 2',
    steps: [4]
  }
]

export const defaultState = {
  steps: defaultSteps,
  lastStepID: 4,
  flows: defaultFlows
}

export type StateType = typeof defaultState;

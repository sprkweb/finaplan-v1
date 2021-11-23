
const defaultFlows: Array<CashFlowInfo> = [
  {
    name: 'Flow 1',
    steps: [
      {
        stepType: 'notes',
        options: {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        }
      },
      {
        stepType: 'notes',
        options: {
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
        }
      },
      {
        stepType: 'notes',
        options: {
          text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
        }
      }
    ]
  },
  {
    name: 'Flow 2',
    steps: [
      {
        stepType: 'notes',
        options: {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        }
      }
    ]
  }
]

export const defaultState = {
  flows: defaultFlows
}

export type StateType = typeof defaultState;

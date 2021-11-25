
const defaultFlows: Array<CashFlowInfo> = [
  {
    name: 'Flow 1',
    steps: [
      {
        id: 1,
        stepType: 'notes',
        options: {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        }
      },
      {
        id: 2,
        stepType: 'notes',
        options: {
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
        }
      },
      {
        id: 3,
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
        id: 4,
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

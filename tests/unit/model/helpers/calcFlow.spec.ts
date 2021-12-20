import calcFlow from '@/model/helpers/calcFlow'

describe('calcFlow', () => {
  const context: CashFlowContext = { startDate: new Date(2000, 1, 1) }

  it('calculates a flow based on information about it', () => {
    const info: PlanStepInfo[] = [
      {
        id: 1,
        stepType: 'contribution',
        options: { amount: 100, contributionDate: { days: 0 } }
      },
      {
        id: 2,
        stepType: 'income',
        options: { amount: 5, incomeStartDate: { days: 1 }, period: { days: 1 } }
      },
      {
        id: 3,
        stepType: 'contribution',
        options: { amount: 50, contributionDate: { days: 3 } }
      }
    ]
    const flow = calcFlow(info, context)
    expect(flow.calc(new Date(2000, 1, 1))).toEqual(100)
    expect(flow.calc(new Date(2000, 1, 2))).toEqual(105)
    expect(flow.calc(new Date(2000, 1, 5))).toEqual(170)
  })

  it('skips steps without a model', () => {
    const info: PlanStepInfo[] = [
      {
        id: 1,
        stepType: 'notes',
        options: { text: 'foo' }
      },
      {
        id: 2,
        stepType: 'contribution',
        options: { amount: 50, contributionDate: { days: 3 } }
      },
      {
        id: 3,
        stepType: 'notes',
        options: { text: 'bar' }
      }
    ]
    const flow = calcFlow(info, context)
    expect(flow.calc(new Date(2000, 1, 1))).toEqual(0)
    expect(flow.calc(new Date(2000, 1, 5))).toEqual(50)
  })

  it('ends the flow on the given step ID', () => {
    const info: PlanStepInfo[] = [
      {
        id: 1,
        stepType: 'contribution',
        options: { amount: 100, contributionDate: { days: 0 } }
      },
      {
        id: 2,
        stepType: 'income',
        options: { amount: 5, incomeStartDate: { days: 1 }, period: { days: 1 } }
      },
      {
        id: 3,
        stepType: 'contribution',
        options: { amount: 50, contributionDate: { days: 3 } }
      }
    ]
    const flow = calcFlow(info, context, 2)
    expect(flow.calc(new Date(2000, 1, 1))).toEqual(100)
    expect(flow.calc(new Date(2000, 1, 2))).toEqual(105)
    expect(flow.calc(new Date(2000, 1, 5))).toEqual(120)
  })

  it('calculates according to the order of the array, not IDs', () => {
    const info: PlanStepInfo[] = [
      {
        id: 1,
        stepType: 'contribution',
        options: { amount: 100, contributionDate: { days: 0 } }
      },
      {
        id: 3,
        stepType: 'income',
        options: { amount: 5, incomeStartDate: { days: 1 }, period: { days: 1 } }
      },
      {
        id: 2,
        stepType: 'contribution',
        options: { amount: 50, contributionDate: { days: 3 } }
      }
    ]
    const flow = calcFlow(info, context, 3)
    expect(flow.calc(new Date(2000, 1, 1))).toEqual(100)
    expect(flow.calc(new Date(2000, 1, 2))).toEqual(105)
    expect(flow.calc(new Date(2000, 1, 5))).toEqual(120)
  })

  it('returns empty flow if no steps with models are given', () => {
    const info: PlanStepInfo[] = [
      {
        id: 1,
        stepType: 'notes',
        options: { text: 'foo' }
      }
    ]
    const flow = calcFlow(info, context)
    expect(flow.calc(new Date(2000, 1, 1))).toEqual(0)
    expect(flow.calc(new Date(2000, 1, 5))).toEqual(0)
  })
})

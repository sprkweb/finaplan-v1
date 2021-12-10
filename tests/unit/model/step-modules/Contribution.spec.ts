import { Contribution, Initialize } from '@/model/step-modules'

describe('Contribution', () => {
  const context: CashFlowContext = { startDate: new Date(2000, 1, 1) }

  it('adds a specific sum to the cash flow once', () => {
    const flow = Contribution(Initialize(), { amount: 100, contributionDate: { days: 0 } }, context)
    expect(flow.calc(new Date(2000, 1, 1))).toEqual(100)
    expect(flow.calc(new Date(2000, 1, 2))).toEqual(100)
    expect(flow.calc(new Date(2020, 12, 12))).toEqual(100)
  })

  it('accepts a date of contribution', () => {
    const flow = Contribution(Initialize(), { amount: 1, contributionDate: { months: 1, weeks: 1 } }, context)
    expect(flow.calc(new Date(2000, 1, 1))).toEqual(0)
    expect(flow.calc(new Date(2000, 2, 2))).toEqual(0)
    expect(flow.calc(new Date(2020, 2, 3))).toEqual(1)
    expect(flow.calc(new Date(2030, 12, 12))).toEqual(1)
  })

  it('is additive', () => {
    let flow = Contribution(Initialize(), { amount: 100, contributionDate: { years: 0 } }, context)
    flow = Contribution(flow, { amount: 200, contributionDate: { years: 0 } }, context)
    flow = Contribution(flow, { amount: 400, contributionDate: { years: 5 } }, context)
    expect(flow.calc(new Date(2000, 1, 1))).toEqual(300)
    expect(flow.calc(new Date(2005, 1, 1))).toEqual(700)
  })

  it('doesn\'t change the previous amount', () => {
    const flow1 = Contribution(Initialize(), { amount: 100, contributionDate: { years: 0 } }, context)
    const flow2 = Contribution(flow1, { amount: 200, contributionDate: { years: 0 } }, context)
    const flow3 = Contribution(flow2, { amount: 400, contributionDate: { years: 5 } }, context)
    expect(flow1.calc(new Date(2006, 1, 1))).toEqual(100)
    expect(flow2.calc(new Date(2006, 1, 1))).toEqual(300)
    expect(flow3.calc(new Date(2006, 1, 1))).toEqual(700)
  })
})

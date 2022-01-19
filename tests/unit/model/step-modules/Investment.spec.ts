import { Initialize, Investment, Contribution } from '@/model/step-modules'

describe('Investment', () => {
  const context: CashFlowContext = { startDate: new Date(2000, 1, 1) }

  it('multiplies by a specific interest to the cash flow periodically', () => {
    let flow = Contribution(Initialize(), { amount: 100, contributionDate: { days: 0 } }, context)
    flow = Investment(flow, { interestRate: 10, period: { days: 1 }, startDate: { days: 4 } }, context)
    expect(flow.calc(new Date(2000, 1, 4))).toEqual(100)
    expect(flow.calc(new Date(2000, 1, 5))).toEqual(100)
    expect(flow.calc(new Date(2000, 1, 6))).toBeCloseTo(110, 5)
    expect(flow.calc(new Date(2000, 1, 7))).toBeCloseTo(121, 5)
    expect(flow.calc(new Date(2000, 1, 8))).toBeCloseTo(133.1, 5)
  })

  it('does not do anything without an initial capital', () => {
    const flow = Investment(Initialize(), { interestRate: 10, period: { days: 1 }, startDate: { days: 5 } }, context)
    expect(flow.calc(new Date(2000, 1, 1))).toEqual(0)
    expect(flow.calc(new Date(2000, 1, 4))).toEqual(0)
    expect(flow.calc(new Date(2000, 1, 8))).toEqual(0)
  })

  it('does not change the previous amount', () => {
    const flow1 = Contribution(Initialize(), { amount: 100, contributionDate: { days: 0 } }, context)
    const flow2 = Investment(flow1, { interestRate: 10, period: { days: 1 }, startDate: { days: 4 } }, context)
    expect(flow1.calc(new Date(2000, 1, 8))).toEqual(100)
    expect(flow2.calc(new Date(2000, 1, 8))).toBeCloseTo(133.1, 5)
  })

  it('considers new investments after the start date', () => {
    let flow = Contribution(Initialize(), { amount: 1000, contributionDate: { days: 0 } }, context)
    flow = Contribution(flow, { amount: 100, contributionDate: { months: 1 } }, context)
    flow = Investment(flow, { interestRate: 100, period: { months: 1 }, startDate: { days: 0 } }, context)
    expect(flow.calc(new Date(2000, 1, 1))).toEqual(1000)
    expect(flow.calc(new Date(2000, 2, 1))).toEqual(2100)
    expect(flow.calc(new Date(2000, 3, 1))).toEqual(4200)
  })

  it('considers new investments as if they were invested at the end of the period', () => {
    let flow = Contribution(Initialize(), { amount: 1000, contributionDate: { days: 0 } }, context)
    flow = Contribution(flow, { amount: 100, contributionDate: { weeks: 2 } }, context)
    flow = Investment(flow, { interestRate: 100, period: { months: 1 }, startDate: { days: 0 } }, context)
    expect(flow.calc(new Date(2000, 1, 1))).toEqual(1000)
    expect(flow.calc(new Date(2000, 1, 16))).toEqual(1100)
    expect(flow.calc(new Date(2000, 2, 1))).toEqual(2100)
    expect(flow.calc(new Date(2000, 2, 16))).toEqual(2100)
    expect(flow.calc(new Date(2000, 3, 1))).toEqual(4200)
  })

  it('works correctly even when the dates are not requested in a sorted order', () => {
    let flow = Contribution(Initialize(), { amount: 1000, contributionDate: { days: 0 } }, context)
    flow = Investment(flow, { interestRate: 100, period: { months: 1 }, startDate: { days: 0 } }, context)
    expect(flow.calc(new Date(2000, 1, 1))).toEqual(1000)
    expect(flow.calc(new Date(2000, 4, 1))).toEqual(8000)
    expect(flow.calc(new Date(2000, 2, 1))).toEqual(2000)
    expect(flow.calc(new Date(2000, 6, 1))).toEqual(32000)
    expect(flow.calc(new Date(2000, 5, 1))).toEqual(16000)
  })
})

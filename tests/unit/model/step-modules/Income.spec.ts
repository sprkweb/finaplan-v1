import { Initialize } from '@/model/step-modules'
import Income from '@/model/step-modules/Income'

describe('Income', () => {
  const context: CashFlowContext = { startDate: new Date(2000, 1, 1) }

  it('adds a specific sum to the cash flow periodically', () => {
    const flow = Income(Initialize(), { amount: 100, period: { days: 1 }, incomeStartDate: { days: 0 } }, context)
    expect(flow.calc(new Date(2000, 1, 1))).toEqual(100)
    expect(flow.calc(new Date(2000, 1, 2))).toEqual(200)
    expect(flow.calc(new Date(2000, 1, 3))).toEqual(300)
    expect(flow.calc(new Date(2000, 1, 4))).toEqual(400)
  })

  it('accepts a date when income starts', () => {
    const flow = Income(Initialize(), { amount: 123, period: { months: 1 }, incomeStartDate: { weeks: 3, days: 5 } }, context)
    expect(flow.calc(new Date(2000, 1, 26))).toEqual(0)
    expect(flow.calc(new Date(2000, 1, 27))).toEqual(123)
    expect(flow.calc(new Date(2000, 2, 26))).toEqual(123)
    expect(flow.calc(new Date(2000, 2, 27))).toEqual(246)
    expect(flow.calc(new Date(2000, 3, 27))).toEqual(369)
  })

  it('is additive', () => {
    let flow = Income(Initialize(), { amount: 1, period: { weeks: 1 }, incomeStartDate: { months: 1 } }, context)
    flow = Income(flow, { amount: 10, period: { weeks: 1 }, incomeStartDate: { months: 1 } }, context)
    flow = Income(flow, { amount: 100, period: { weeks: 3 }, incomeStartDate: { days: 0 } }, context)
    expect(flow.calc(new Date(2000, 1, 1))).toEqual(100)
    expect(flow.calc(new Date(2000, 2, 1))).toEqual(211)
    expect(flow.calc(new Date(2000, 2, 8))).toEqual(222)
    expect(flow.calc(new Date(2000, 2, 15))).toEqual(333)
  })

  it('doesn\'t change the previous amount', () => {
    const flow1 = Income(Initialize(), { amount: 1, period: { weeks: 1 }, incomeStartDate: { months: 1 } }, context)
    const flow2 = Income(flow1, { amount: 10, period: { weeks: 1 }, incomeStartDate: { months: 1 } }, context)
    const flow3 = Income(flow2, { amount: 100, period: { weeks: 3 }, incomeStartDate: { days: 0 } }, context)
    expect(flow1.calc(new Date(2000, 2, 15))).toEqual(3)
    expect(flow2.calc(new Date(2000, 2, 15))).toEqual(33)
    expect(flow3.calc(new Date(2000, 2, 15))).toEqual(333)
  })
})

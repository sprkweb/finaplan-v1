interface CashFlow {
  readonly calc: (calculationDate: Date) => Cash
}

interface CashFlowContext {
  startDate: Date
}

type PlanStep<OptionsT = unknown> =
  (cashFlow: CashFlow, options: OptionsT, context: CashFlowContext) => CashFlow

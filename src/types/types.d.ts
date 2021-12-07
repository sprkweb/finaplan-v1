interface PlanStepInfo<StepType extends string, OptionsT> {
  id: number
  stepType: StepType
  options: OptionsT
}

declare interface CashFlowInfo {
  name: string,
  steps: Array<PlanStepInfo<string, unknown>>
}

declare type SimpleDuration =
  { years: number } |
  { months: number } |
  { weeks: number } |
  { days: number }

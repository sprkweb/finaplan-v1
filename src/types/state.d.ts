declare type StepID = number
declare type StepType = string

declare interface PlanStepInfo<OptionsT = unknown> {
  id: StepID
  stepType: StepType
  options: OptionsT
}

declare interface CashFlowInfo {
  name: string,
  steps: Array<StepID>,
  context: CashFlowContext
}

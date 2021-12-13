interface PlanStepInfo<StepType extends string, OptionsT> {
  id: number
  stepType: StepType
  options: OptionsT
}

declare interface CashFlowInfo {
  name: string,
  steps: Array<PlanStepInfo<string, unknown>>
}

declare interface PlanStepTypeInfo<OptionsT = unknown> {
  name: string,
  module: string,
  defaultOptions: OptionsT
}

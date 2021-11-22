interface PlanStep<StepType extends string, OptionsT> {
  stepType: StepType;
  options: OptionsT
}

declare interface CashFlowInfo {
  name: string,
  steps: Array<PlanStep<string, unknown>>
}

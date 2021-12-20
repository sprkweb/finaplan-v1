import * as stepModules from '@/model/step-modules'

export default function calcFlow (steps: PlanStepInfo[], context: CashFlowContext, untilStep?: StepID): CashFlow {
  let step: PlanStepInfo
  let stepType: PlanStepTypeInfo
  let model: PlanStep
  let flow: CashFlow = stepModules.Initialize()

  for (step of steps) {
    stepType = stepModules.index[step.stepType]
    if (stepType.model) {
      // @ts-ignore
      model = stepModules[stepType.model]
      flow = model(flow, step.options, context)
    }
    if (untilStep && step.id === untilStep) break
  }
  return flow
}

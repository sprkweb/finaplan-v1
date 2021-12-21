import i18n from '@/i18n'
import calcFlow from '@/model/helpers/calcFlow'
import { startOfDay } from 'date-fns'
import Vue from 'vue'
import Vuex, { GetterTree, MutationTree } from 'vuex'
import { defaultState, StateType } from './defaultState'

Vue.use(Vuex)

const mutations: MutationTree<StateType> = {
  updateStepsOrder (state, { flowID, order }) {
    state.flows[flowID].steps = order
  },
  updateStep (state, { stepID, options }: { stepID: StepID, options: unknown }) {
    state.steps[stepID].options = options
  },
  addStep (state, { flowID, stepTypeInfo }: { flowID: number, stepTypeInfo: PlanStepTypeInfo }) {
    state.lastStepID += 1
    const newStep: PlanStepInfo = {
      id: state.lastStepID,
      stepType: stepTypeInfo.name,
      options: stepTypeInfo.defaultOptions
    }
    state.steps[newStep.id] = newStep
    state.flows[flowID].steps.push(newStep.id)
  },
  addFlow (state) {
    const number = state.flows.length + 1
    const newFlow: CashFlowInfo = {
      name: i18n.t('flow.initialName', { number }) as string,
      steps: [],
      context: {
        startDate: startOfDay(new Date())
      }
    }
    Vue.set(state.flows, number - 1, newFlow)
  },
  updateFlowContext (state, { flowID, newValue }) {
    state.flows[flowID].context = newValue
  }
}

const getFlow = (state: StateType) => (flowID: number) => {
  return state.flows[flowID]
}

const getSteps = (state: StateType) => (flowID: number) => {
  return getFlow(state)(flowID)
    .steps
    .map((id: StepID) => state.steps[id])
}

const getContext = (state: StateType) => (flowID: number) => {
  return getFlow(state)(flowID)
    .context
}

const getters: GetterTree<StateType, StateType> = {
  getStep: (state) => (stepID: StepID) => {
    return state.steps[stepID]
  },
  getSteps,
  getContext,
  calcFlow: (state) => (flowID: number, untilStep?: StepID) => {
    const steps = getSteps(state)(flowID)
    const context = state.flows[flowID].context
    return calcFlow(steps, context, untilStep)
  }
}

export default new Vuex.Store({
  state: defaultState,
  getters,
  mutations,
  actions: {},
  modules: {}
})

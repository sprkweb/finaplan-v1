import Vue from 'vue'
import Vuex, { GetterTree, MutationTree } from 'vuex'
import { defaultState, StateType } from './defaultState'

Vue.use(Vuex)

const mutations: MutationTree<StateType> = {
  updateStepsOrder (state, { flowID, order }) {
    state.flows[flowID].steps = order
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
      name: `Flow ${number}`,
      steps: []
    }
    Vue.set(state.flows, number - 1, newFlow)
  }
}

const getters: GetterTree<StateType, StateType> = {
  getSteps: (state) => (flowID: number) => {
    return state
      .flows[flowID]
      .steps
      .map((id: StepID) => state.steps[id])
  }
}

export default new Vuex.Store({
  state: defaultState,
  getters,
  mutations,
  actions: {},
  modules: {}
})

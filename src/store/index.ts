import Vue from 'vue'
import Vuex, { GetterTree, MutationTree } from 'vuex'
import { defaultState, StateType } from './defaultState'

Vue.use(Vuex)

const mutations: MutationTree<StateType> = {
  updateSteps (state, { flowID, value }) {
    state.flows[flowID].steps = value
  },
  addStep (state, { flowID, stepTypeInfo }: { flowID: number, stepTypeInfo: PlanStepTypeInfo }) {
    state.flows[flowID].steps.push({
      id: state.lastStepID + 1,
      stepType: stepTypeInfo.name,
      options: stepTypeInfo.defaultOptions
    })
    state.lastStepID += 1
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
    return state.flows[flowID].steps
  }
}

export default new Vuex.Store({
  state: defaultState,
  getters,
  mutations,
  actions: {},
  modules: {}
})

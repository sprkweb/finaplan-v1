import Vue from 'vue'
import Vuex, { MutationTree } from 'vuex'

Vue.use(Vuex)

type PlanStep = number; // TODO
interface CashFlowInfo {
  name: string,
  steps: Array<PlanStep>
}

const defaultFlows: Array<CashFlowInfo> = [
  {
    name: 'Flow 1',
    steps: [
      1,
      3,
      2
    ]
  },
  {
    name: 'Flow 2',
    steps: [
      1
    ]
  }
]

const state = {
  flows: defaultFlows
}

const mutations: MutationTree<typeof state> = {
  addFlow (state) {
    const number = state.flows.length + 1
    const newFlow: CashFlowInfo = {
      name: `Flow ${number}`,
      steps: []
    }
    Vue.set(state.flows, number - 1, newFlow)
  }
}

export default new Vuex.Store({
  state,
  getters: {},
  mutations,
  actions: {},
  modules: {}
})

export type State = typeof state;

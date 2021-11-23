import Vue from 'vue'
import Vuex, { MutationTree } from 'vuex'
import { defaultState, StateType } from './defaultState'

Vue.use(Vuex)

const mutations: MutationTree<StateType> = {
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
  state: defaultState,
  getters: {},
  mutations,
  actions: {},
  modules: {}
})

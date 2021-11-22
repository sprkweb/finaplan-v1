import Vue from 'vue'
import Vuex, { MutationTree } from 'vuex'

Vue.use(Vuex)

const defaultFlows: Array<CashFlowInfo> = [
  {
    name: 'Flow 1',
    steps: [
      {
        stepType: 'notes',
        options: {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        }
      },
      {
        stepType: 'notes',
        options: {
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
        }
      },
      {
        stepType: 'notes',
        options: {
          text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
        }
      }
    ]
  },
  {
    name: 'Flow 2',
    steps: [
      {
        stepType: 'notes',
        options: {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        }
      }
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

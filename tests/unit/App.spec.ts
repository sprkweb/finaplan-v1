import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import Vuetify from 'vuetify'
import { defaultState } from '@/store/defaultState'
import App from '@/App.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('App.vue', () => {
  let store: Store<unknown>
  let vuetify: Vuetify

  beforeEach(() => {
    store = new Vuex.Store({ state: defaultState })
    vuetify = new Vuetify()
  })

  it('shows app name', () => {
    const wrapper = shallowMount(App, { store, localVue, vuetify })
    const appName = wrapper.findComponent({ ref: 'appName' })
    expect(appName).not.toBeUndefined()
    expect(appName.isVisible()).toBe(true)
    expect(appName.text()).toMatch('FinaPlan')
  })
})

import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import VueI18n from 'vue-i18n'
import i18n from '../i18n'

Vue.use(Vuetify)
Vue.use(VueI18n)

export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params) as string
  }
})

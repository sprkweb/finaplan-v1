import Vue from 'vue'
import Vuetify, { VExpansionPanels } from 'vuetify/lib'

import VueI18n from 'vue-i18n'
import i18n from '../i18n'

import '../styles/styles.scss'

Vue.use(Vuetify, {
  components: {
    VExpansionPanels
  }
})
Vue.use(VueI18n)

export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params) as string
  },
  theme: {
    themes: {
      light: {
        primary: '#3B707D',
        secondary: '#FFB85D',
        accent: '#FF5412'
      }
    }
  },
  icons: {
    iconfont: 'mdiSvg'
  }
})

import Vue from 'vue'
import Vuetify, { VExpansionPanels } from 'vuetify/lib'

import '../styles/styles.scss'

Vue.use(Vuetify, {
  components: {
    VExpansionPanels
  }
})

export default new Vuetify({
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

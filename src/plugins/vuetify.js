import 'vuetify/dist/vuetify.min.css'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'

import Vue from 'vue'
import Vuetify from 'vuetify'

import i18n from '@/i18n'
import theme from './theme'

Vue.use(Vuetify);


export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
  },
  icons: {
    iconfont: 'md'
  }
})
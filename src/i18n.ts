import Vue from 'vue'
import VueI18n from 'vue-i18n'

import tr from 'vuetify/lib/locale/tr'
import en from 'vuetify/lib/locale/en'


let trJSON = require('../locales/tr.json');
let enJSON = require('../locales/en.json');

Vue.use(VueI18n)

const messages = {
  en: {
    ...enJSON,
    $vuetify: en,
  },
  tr: {
    ...trJSON,
    $vuetify: tr,
  },
}
console.log(process.env.VUE_APP_I18N_LOCALE);
console.log(process.env.VUE_APP_I18N_FALLBACK_LOCALE);
export default new VueI18n({
  locale: 'tr',
  fallbackLocale: 'tr',
  messages,
})

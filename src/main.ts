import Vue from 'vue';
import Vuelidate from 'vuelidate';
import AxiosPlugin from 'vue-axios-cors';

import 'jinqu-array-extensions';

import { sync } from 'vuex-router-sync';

import './components';
import '@babel/polyfill';

import App from '@/App.vue';
import store from '@/store';
import router from '@/router';
import vuetify from '@/plugins/vuetify';
// import i18n from '@/i18n';

// import { AuthHelper } from './components/common/auth/auth-helper';

Vue.use(AxiosPlugin);
Vue.use(Vuelidate);

// Sync store with router
sync(store, router);

Vue.config.productionTip = false;

new Vue({
  router,
  // i18n,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

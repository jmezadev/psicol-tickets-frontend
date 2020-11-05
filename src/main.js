import Vue from 'vue'
import App from './App.vue'
import router from './routes.js';

import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false

Vue.use(BootstrapVue);
window.axios = require('axios');

import VueSweetalert2 from 'vue-sweetalert2';
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

export var ROUTE = 'http://psicoltickets.test/images/';
export var API_ROUTE = 'http://psicoltickets.test/api';

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

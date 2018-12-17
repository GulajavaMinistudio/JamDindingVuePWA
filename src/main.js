// import data library pihak ketiga
// untuk mode produksi, gunakan mode CDN
import 'bootstrap/dist/css/bootstrap.min.css';
import jQuery from 'jquery/dist/jquery.slim.min';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min';
import 'animate.css/animate.min.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './storeservices';
import './registerServiceWorker';

window.jQuery = jQuery;
window.$ = jQuery;
Vue.config.productionTip = false;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

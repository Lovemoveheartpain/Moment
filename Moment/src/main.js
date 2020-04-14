import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from './vant/index';
import plugins from './util/plugins'
Vue.use(vant);
Vue.prototype.$pub = plugins;
import 'amfe-flexible/index'
import 'vant/lib/index.css';

import * as filters from './util/filter';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

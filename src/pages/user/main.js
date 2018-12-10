import Vue from 'vue'
import index from './index.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

Vue.config.productionTip = false

new Vue({
  render: h => h(index)
}).$mount('#app')

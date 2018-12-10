import Vue from 'vue'
import index from './index.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// import { API_BASE_HOST } from '../../config/config'
Vue.use(iView);
// console.log(process.env.NODE_ENV);
// console.log(API_BASE_HOST);
Vue.config.productionTip = false

new Vue({
  render: h => h(index)
}).$mount('#app')

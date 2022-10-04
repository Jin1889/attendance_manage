import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from './plugins/element'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios";
import * as echarts from 'echarts'
//配置请求的根路径
axios.defaults.baseURL = "http://127.0.0.1:8081/"
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

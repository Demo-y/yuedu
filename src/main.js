import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
Vue.config.productionTip = false
axios.interceptors.request.use(
  config => {
    if (localStorage.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = "Bearer " + localStorage.token
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//给事件总线赋值一个vue实例 使其可以使用
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

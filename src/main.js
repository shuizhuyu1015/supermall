import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyload from 'vue-lazyload';

import toast from './components/common/toast'

Vue.config.productionTip = false

// Vue实例可以充当事件总线
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)
// 懒加载插件
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

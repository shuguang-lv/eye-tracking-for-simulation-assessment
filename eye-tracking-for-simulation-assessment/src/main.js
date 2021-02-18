import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueElectron from 'vue-electron'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import './assets/tailwind.css'

Vue.config.productionTip = false
Vue.use(VueElectron)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')

// event bus
export const bus = new Vue()
Vue.prototype.eventBus = bus

///////////////////////////////////////////////////////////////

// leancloud sdk
// const AV = require('leancloud-storage')
// AV.init({
//   appId: 'cnzf7bIFLuObfxzx3r0ByDQU-gzGzoHsz',
//   appKey: 'h6HGnV1AHXsy45JIX7M42PKi',
//   serverURL: 'https://cnzf7bif.lc-cn-n1-shared.com',
// })
// AV.debug.enable() // 启用
// Vue.prototype.cloud = AV

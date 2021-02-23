import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueElectron from 'vue-electron'
import Cloudbase from '@cloudbase/vue-provider'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import './assets/tailwind.css'

Vue.config.productionTip = false
Vue.use(VueElectron)
Vue.use(Cloudbase, {
  env: 'grp2020-4glv8fo5cd87cf9a'
  // appSign: 'com.unnc.grp',
  // appSecret: {
  //   appAccessKeyId: 1,
  //   appAccessKey: '9c8723d84299331cde9af9613157f89b'
  // }
})

// event bus
export const bus = new Vue()
Vue.prototype.eventBus = bus

// leancloud sdk
const AV = require('leancloud-storage')
AV.init({
  appId: 'cnzf7bIFLuObfxzx3r0ByDQU-gzGzoHsz',
  appKey: 'h6HGnV1AHXsy45JIX7M42PKi',
  serverURLs: {
    push: 'https://shuguang.tech',
    stats: 'https://shuguang.tech',
    engine: 'https://shuguang.tech',
    api: 'https://shuguang.tech',
  },
})
AV.debug.enable() // 启用
Vue.prototype.leanCloud = AV

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')

///////////////////////////////////////////////////////////////

// import cloudbase from '@cloudbase/js-sdk'

// const app = cloudbase.init({
//   env: 'grp2020-4glv8fo5cd87cf9a',
// })

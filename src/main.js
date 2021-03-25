import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueElectron from 'vue-electron'
import Cloudbase from '@cloudbase/vue-provider'
// import vuescroll from 'vuescroll'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import './assets/tailwind.css'

Vue.config.productionTip = false

Vue.use(VueElectron)

// Vue.use(Cloudbase, {
//   env: 'grp2020-4glv8fo5cd87cf9a',
// })

// You can set global config here.
// Vue.use(vuescroll, {
//   ops: {
//     vuescroll: {
//       sizeStrategy: 'number',
//       wheelScrollDuration: 500,
//     },
//     scrollPanel: {
//       scrollingX: false,
//       easing: 'easeInOutQuad',
//     },
//     rail: {
//       specifyBorderRadius: '0px',
//       gutterOfEnds: '50px',
//       gutterOfSide: '13px',
//     },
//     bar: {
//       background: '#1eb980',
//       opacity: 0.5,
//       hoverStyle: true,
//       specifyBorderRadius: false,
//       minSize: 0,
//       size: '8px',
//     }
//   },
//   name: 'scrollbar', // customize component name, default -> vueScroll
// })

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
Vue.prototype.user = AV.User
Vue.prototype.currentUser = AV.User.current()

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  render: (h) => h(App),
})

/********************************************************/

// import cloudbase from '@cloudbase/js-sdk'

// const app = cloudbase.init({
//   env: 'grp2020-4glv8fo5cd87cf9a',
// })

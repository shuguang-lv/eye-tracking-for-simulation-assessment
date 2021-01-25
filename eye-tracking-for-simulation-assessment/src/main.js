import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// import VueElectron from 'vue-electron'
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import "./assets/tailwind.css";

Vue.config.productionTip = false;
// Vue.use(VueElectron)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

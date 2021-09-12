import Vue from 'vue'
import App from './App.vue'
import io from "socket.io-client";
import router from "@/router/index.js"
import {store} from "@/store/index.js"
import { appAxios } from "@/utils/appAxios";

Vue.prototype.$socket=io("http://localhost:3001");
Vue.prototype.$appAxios=appAxios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Fragment from "vue-fragment";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


Vue.use(Fragment.Plugin);
Vue.prototype.$liff = window.liff
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false

library.add(faUserSecret);

Vue.component("font-awesome-icon", FontAwesomeIcon);

window.$ = require("jquery");
window._ = require("lodash");
window.axios = Axios;
// window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// window.axios.defaults.baseURL = `https://yamcha.herokuapp.com/`;
window.axios.defaults.baseURL = `https://cacb6166.ngrok.io`;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

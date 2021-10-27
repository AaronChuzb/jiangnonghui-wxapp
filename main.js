import App from './App'
import uView from "uview-ui";
import store from "./store/index.js"
import Vue from 'vue'

import { toast } from "./utils/index.js"

Vue.use(uView);
Vue.prototype.$store=store;
Vue.config.productionTip = false
Vue.prototype.$imgUrl = 'http://www.jnhmarket.cn'
Vue.prototype.$toast = toast 
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()




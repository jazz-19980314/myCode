import Vue from 'vue'
import App from './App'
import api from '@/util/api.js'
import uView from "uview-ui";
Vue.use(uView);
Vue.prototype.$http = api
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

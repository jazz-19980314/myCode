import Vue from 'vue'
import App from './App'
// import TabBarView from './tabbar/TabBarView.js'
import cuCustom from './colorui/components/cu-custom.vue'
// 跳转传参
import * as navTo from '@/util/navTo.js'  
import api from '@/util/api.js'
Vue.prototype.$navTo = navTo
Vue.prototype.$http = api
Vue.component('cu-custom',cuCustom)
import LbPicker from './components/lb-picker'
Vue.component('lb-picker', LbPicker)
Vue.config.productionTip = false
// Vue.prototype.$tabBarView = new TabBarView()
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

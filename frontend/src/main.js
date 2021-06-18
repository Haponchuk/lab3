import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

Vue.use(VueAxios, axios)

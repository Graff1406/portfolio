import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import vuetify from './plugins/vuetify'
import text from "./assets/text.json"

Vue.config.productionTip = false

Vue.prototype.$t = text

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './assets/styles.css'

Vue.config.productionTip = false

new Vue({
  store, // Attach Vuex store to the Vue instance
  render: (h) => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from 'firebase'
import { VueSpinners } from '@saeris/vue-spinners'
import Chart from 'chart.js'
import Chartick from 'vue-chartkick'
import './plugins/BootstrapVue'
import './plugins/fontAwesome'
import './firebase/services/Init'

Vue.use(VueSpinners)
Vue.use(Chartick.use(Chart))

Vue.config.productionTip = false

let app = null

auth().onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

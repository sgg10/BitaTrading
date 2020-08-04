import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from 'firebase'
import { VueSpinners } from '@saeris/vue-spinners'
import './plugins/BootstrapVue'
import './firebase/services/Init'

Vue.use(VueSpinners)

Vue.config.productionTip = false

let app = null

auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

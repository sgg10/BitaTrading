import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import bitacoras from './modules/bitacoras'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    bitacoras
  }
})

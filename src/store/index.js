import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import bitacoras from './modules/bitacoras'
import loading from './modules/loading'
import error from './modules/error'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    bitacoras,
    loading,
    error
  }
})

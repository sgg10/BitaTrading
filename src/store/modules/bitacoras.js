import DBController from '../../firebase/controllers/DBController'
import store from '..'

const db = new DBController()

export default {
  namespaced: true,
  state: {
    bitacoras: [],
    bitacora: []
  },
  mutations: {
    SET_STATE (state, { payload, item }) {
      state[item] = payload
    }
  },
  actions: {
    getBitacoras ({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          const list = []
          const { uid } = store.state.auth.user
          db.get('Bitacoras').where('userID', '==', uid).get().then(result => {
            if (!result.empty) {
              result.forEach(bitacora => list.push({ ...bitacora.data(), id: bitacora.id }))
            }
            commit('SET_STATE', { payload: list, item: 'bitacoras' })
            resolve()
          })
        } catch (error) {
          reject(new Error(error))
        }
      })
    }
  },
  getters: {
    bitacora: state => state.bitacora,
    bitacoras: state => state.bitacoras
  }
}

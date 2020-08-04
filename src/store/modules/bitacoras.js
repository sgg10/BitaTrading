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
    async getBitacoras ({ commit }, form = null) {
      const list = []
      const { uid } = store.state.auth.user
      const result = await db.get('Bitacoras').where('userID', '==', uid).get()
      if (!result.empty) {
        result.forEach(bitacora => list.push({ ...bitacora.data(), id: bitacora.id }))
      }
      commit('SET_STATE', { payload: list, item: 'bitacoras' })
      // eslint-disable-next-line no-unused-expressions
      form ? form.isLoading = false : null
    }
  },
  getters: {
    bitacora: state => state.bitacora,
    bitacoras: state => state.bitacoras
  }
}

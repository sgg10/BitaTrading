import AuthController from '../../firebase/controllers/AuthController'
const auth = new AuthController()

export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    SET_USER (state) {
      state.user = auth.getUser() || null
    }
  },
  getters: {
    user: state => state.user
  }
}

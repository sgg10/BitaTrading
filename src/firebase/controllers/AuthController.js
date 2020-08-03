import Auth from '../services/Auth'

class AuthController {
  constructor () {
    this.auth = new Auth()
  }

    register = (name, email, pass, router) => this.auth.register(name, email, pass, router)
    authEmail = (email, pass) => this.auth.authEmail(email, pass)
    authGoogle = () => this.auth.authGoogle()
    signOut = () => this.auth.signOut()
    reAuth = (email, pass) => this.auth.reAuth(email, pass)
    changePass = (email) => this.auth.changePass(email)
    getUser = () => this.auth.getUser()
}

export default AuthController

import { auth } from 'firebase'

class Auth {
  async register (name, email, pass, router) {
    const result = await auth().createUserWithEmailAndPassword(email, pass)
    result.user.updateProfile({ displayName: name })
    router.push({ path: '/' })
  }

  authEmail (email, pass) {
    return auth().signInWithEmailAndPassword(email, pass)
  }

  authGoogle () {
    const provider = new auth.GoogleAuthProvider()
    auth().useDeviceLanguage()
    return auth().signInWithPopup(provider)
  }

  signOut () {
    return auth().signOut()
  }

  reAuth (email, pass) {
    const credentials = auth.EmailAuthProvider.credential(email, pass)
    return this.getUser().reauthenticateWithCredential(credentials)
  }

  changePass (email) {
    return auth().sendPasswordResetEmail(email)
  }

  getUser () {
    return auth().currentUser
  }
}

export default Auth

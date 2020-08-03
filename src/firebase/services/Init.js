import firebase from 'firebase'
const firebaseConfig = {
  apiKey: 'AIzaSyAgXxi4tb2ZXxAjB2qymb2sArlfNFirvhU',
  authDomain: 'bitatrading-503dd.firebaseapp.com',
  databaseURL: 'https://bitatrading-503dd.firebaseio.com',
  projectId: 'bitatrading-503dd',
  storageBucket: 'bitatrading-503dd.appspot.com',
  messagingSenderId: '465030559854',
  appId: '1:465030559854:web:ac500afb6adcc77bfa0e7f',
  measurementId: 'G-TVZ1Q8Y63S'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
// firebaseApp.analytics()

export default firebaseApp

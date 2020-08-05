# BitaTrading

## Project setup
```
npm install
```
##### Add src/firebase/services/Init.js File with your Firebase SDK snippet configuration to initialice the project with Firebase
```
import firebase from 'firebase'
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: ''
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
firebaseApp.analytics()

export default firebaseApp

```
Example for Init.js
You can get your Firebase SDK snippet in Project configuration.


### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

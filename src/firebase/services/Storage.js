import { storage } from 'firebase'

class Storage {
  uploadImage (file, path, name = null) {
    return new Promise((resolve, reject) => {
      const task = storage().ref(`imgs/${path}/${name || file.name}`).put(file)
      task.on('state_changed', snapShot => {
        const percent = snapShot.bytesTransferred / snapShot.totalBytes * 100
        console.log(`Percent => ${percent}`)
      },
      error => { reject(error) },
      () => {
        task.snapshot.ref.getDownloadURL().then(url => resolve(url))
      }
      )
    })
  }
}

export default Storage

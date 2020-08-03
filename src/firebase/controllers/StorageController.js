import Storage from '../services/Storage'

class StorageController {
  constructor () {
    this.storage = new Storage()
  }

    uploadImage = (file, path, name = null) => this.storage.uploadImage(file, path, name)
}

export default StorageController

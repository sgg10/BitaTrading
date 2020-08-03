import Firestore from '../services/Firestore'

class DBController {
  constructor () {
    this.DB = new Firestore()
  }

    crearBitacora = (name, valorInicial, userID) => this.DB.crearBitacora(name, valorInicial, userID)
    crearEntrada = (trades, notas, imagenes, bitacoraID) => this.DB.crearEntrada(trades, notas, imagenes, bitacoraID)
    update = (collection, id, data) => this.DB.update(collection, id, data)
    delete = (collection, ID) => this.DB.delete(collection, ID)
    get = collection => this.DB.get(collection)
}

export default DBController
